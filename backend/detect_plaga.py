import sys
import cv2
import numpy as np
from tensorflow.keras.models import load_model

# Cargar el modelo previamente entrenado
model = load_model("my_model.h5")

# Función para procesar imágenes y realizar predicciones
def predict_infection(image_path, model):
    frame = cv2.imread(image_path)  # Leer la imagen desde el disco
    img = cv2.resize(frame, (150, 150))
    img = img / 255.0  # Normalizar la imagen
    img = np.expand_dims(img, axis=0)  # Añadir una dimensión para batch
    
    # Realizar la predicción
    prediction = model.predict(img)
    return prediction

# Obtener la ruta de la imagen desde los argumentos de línea de comando
image_path = sys.argv[1]

# Realizar la predicción
prediction = predict_infection(image_path, model)

# Obtener el porcentaje de infección
porcentaje_infeccion = prediction[0][1] * 100

# Mostrar el resultado
print(f'{{"detected": {porcentaje_infeccion}}}')
