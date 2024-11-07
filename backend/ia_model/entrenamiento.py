import os 
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras import layers, models
from tensorflow.keras.callbacks import ModelCheckpoint

# Definir parámetros
img_width, img_height = 150, 150  # Tamaño de las imágenes
batch_size = 32  # Tamaño del lote (batch size)

# Preprocesamiento de imágenes: normalizar y aumentar los datos
train_datagen = ImageDataGenerator(
    rescale=1.0/255,               # Normalizar las imágenes
    rotation_range=40,            # Rotaciones aleatorias
    width_shift_range=0.2,        # Desplazamiento aleatorio en el ancho
    height_shift_range=0.2,       # Desplazamiento aleatorio en la altura
    shear_range=0.2,              # Cortes aleatorios
    zoom_range=0.2,               # Zoom aleatorio
    horizontal_flip=True,         # Volteo horizontal aleatorio
    fill_mode='nearest'           # Rellenar los pixeles vacíos
)

# Cargar imágenes de entrenamiento
# Cambia la ruta con la ubicación de tus imágenes de entrenamiento
train_generator = train_datagen.flow_from_directory(
    './dataset/test',  # Reemplaza con la ruta de tus imágenes de entrenamiento
    target_size=(img_width, img_height),  # Ajustar las imágenes al tamaño especificado
    batch_size=batch_size,  # Número de imágenes por lote
    class_mode='categorical'  # Para clasificación múltiple de clases
)

# Mostrar algunas clases encontradas
print(f'Clases encontradas: {train_generator.class_indices}')

# Definir el modelo
model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(150, 150, 3)),  # Capa de convolución
    layers.MaxPooling2D((2, 2)),  # Capa de max pooling
    layers.Conv2D(64, (3, 3), activation='relu'),  # Otra capa de convolución
    layers.MaxPooling2D((2, 2)),  # Otra capa de max pooling
    layers.Conv2D(128, (3, 3), activation='relu'),  # Otra capa de convolución
    layers.MaxPooling2D((2, 2)),  # Otra capa de max pooling
    layers.Flatten(),  # Aplanar los datos para la capa densa
    layers.Dense(128, activation='relu'),  # Capa densa
    layers.Dense(train_generator.num_classes, activation='softmax')  # Capa de salida, con softmax para clasificación
])

# Compilar el modelo
model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Guardar el mejor modelo durante el entrenamiento
checkpoint = ModelCheckpoint('mejor_modelo.h5', monitor='accuracy', save_best_only=True, mode='max')

# Entrenar el modelo
history = model.fit(
    train_generator,
    epochs=10,
    callbacks=[checkpoint]  # Guardar el mejor modelo basado en la precisión
)

# Guardar el modelo final
model.save('modelo_entrenado.h5')

print("Entrenamiento completado y modelo guardado.")
