import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar a la base de datos MongoDB
mongoose.connect("mongodb://localhost:27017/BD_Cultivos", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conexión exitosa a la base de datos"))
    .catch(err => console.error(err));

// Esquema de usuario
const userSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    birthDate: Date,
    curp: String,
    email: { type: String, unique: true },
    password: String,
});

const User = mongoose.model('User', userSchema);

// Rutas
app.post('/register', async (req, res) => {
    const { name, lastName, birthDate, curp, email, password } = req.body;

    // Validaciones adicionales (ej. CURP, edad)
    const birthDateObj = new Date(birthDate);
    const age = new Date().getFullYear() - birthDateObj.getFullYear();
    if (age < 18) return res.status(400).json({ msg: 'Debes ser mayor de edad para registrarte.' });

    const curpPattern = /^[A-Z]{4}\d{6}[HM]{1}\d{2}[A-Z]{3}$/; // Ejemplo simplificado para CURP
    if (!curpPattern.test(curp)) return res.status(400).json({ msg: 'CURP no válido o no pertenece a una mujer.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, lastName, birthDate, curp, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json({ msg: 'Registro exitoso' });
    } catch (error) {
        res.status(400).json({ msg: 'Error al registrar el usuario. Puede que el correo ya esté en uso.' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user._id }, 'tu_clave_secreta', { expiresIn: '1h' });
    res.json({ msg: 'Inicio de sesión exitoso', token });
});

app.post('/recover-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    // Aquí implementamos la lógica para enviar un correo de recuperación
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Utiliza el servicio que prefieras
        auth: {
            user: 'cceettqq@gmail.com', // Tu correo
            pass: 'cceettqq@gmail.com' // Tu contraseña
        }
    });

    const mailOptions = {
        from: 'tu_email@gmail.com',
        to: email,
        subject: 'Recuperación de contraseña',
        text: 'Por favor, sigue el enlace para recuperar tu contraseña: [enlace]'
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ msg: 'Se ha enviado un correo para recuperar tu contraseña.' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al enviar el correo', error });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
