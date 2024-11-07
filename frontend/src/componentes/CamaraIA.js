import React, { useRef, useState } from 'react';
import axios from 'axios';
import '../estilos/CamaraIA.css';

const CamaraIA = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const videoRef = useRef(null);

  // Función para iniciar la cámara
  const startCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => {
          console.error("Error al acceder a la cámara: ", err);
          alert("No se pudo acceder a la cámara. Asegúrate de que los permisos estén habilitados.");
        });
    } else {
      alert("El navegador no soporta la cámara.");
    }
  };
  

  // Función para tomar una foto de la cámara
  const captureImage = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    setImage(dataUrl);
  };

  // Función para enviar la imagen al backend y obtener el resultado
  const sendImageToBackend = async () => {
    if (image) {
      const formData = new FormData();
      formData.append('image', dataURLtoFile(image, 'image.jpg'));

      try {
        const response = await axios.post('http://localhost:4000/detectPlaga', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setResult(response.data.result);
      } catch (error) {
        console.error("Error al enviar la imagen", error);
      }
    }
  };

  // Función para convertir dataURL a archivo
  const dataURLtoFile = (dataUrl, fileName) => {
    const arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], fileName, { type: mime });
  };

  return (
    <div className="camara-ia">
      <h1>Detección de Plagas con Cámara IA</h1>
      <video ref={videoRef} width="640" height="480" autoPlay></video>
      <button onClick={startCamera}>Iniciar Cámara</button>
      <button onClick={captureImage}>Capturar Imagen</button>
      {image && <img src={image} alt="Imagen capturada" />}
      <button onClick={sendImageToBackend}>Enviar Imagen</button>
      {result && <div>Resultado: {JSON.stringify(result)}</div>}
    </div>
  );
};

export default CamaraIA;
