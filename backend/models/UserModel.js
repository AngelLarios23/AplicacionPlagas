import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    curp: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Middleware para encriptar la contraseña antes de guardar el usuario
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para verificar la contraseña
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

export const UserModel = model("User", UserSchema);
