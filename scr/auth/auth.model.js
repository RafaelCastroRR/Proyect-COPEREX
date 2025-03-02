import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Definimos el esquema para el administrador
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Encriptamos la contraseña antes de guardarla en la base de datos
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comparar la contraseña ingresada con la almacenada
adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Creamos el modelo de Admin
const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
