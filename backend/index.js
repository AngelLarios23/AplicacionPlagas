import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import { exec } from 'child_process';  // Para ejecutar el script de Python
import path from 'path';

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar a la base de datos MongoDB
mongoose.connect("mongodb://localhost:27017/BD_Cultivos", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conexión exitosa a la base de datos"))
    .catch(err => console.error(err));

// Configurar Multer para la carga de imágenes
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Ruta para detectar plagas
app.post('/detectPlaga', upload.single('image'), (req, res) => {
    try {
        // Guardar la imagen cargada temporalmente
        const imagePath = path.join(__dirname, 'uploads', 'image.jpg');
        require('fs').writeFileSync(imagePath, req.file.buffer);

        // Ejecutar el script de Python
        exec(`python detect_plaga.py ${imagePath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al ejecutar el script de Python: ${stderr}`);
                return res.status(500).json({ msg: 'Error en la detección de plagas' });
            }

            // El script de Python devuelve el resultado
            const result = JSON.parse(stdout);
            res.json({ msg: 'Detección completada', result });
        });
    } catch (error) {
        console.error("Error en la detección de plagas:", error);
        res.status(500).json({ msg: 'Error en la detección de plagas' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
