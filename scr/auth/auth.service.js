import jwt from 'jsonwebtoken';
import Admin from './auth.model.js';

// Función para generar el token JWT
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

// Función para autenticar al administrador sin verificar la contraseña
export const authenticateAdmin = async (username) => {
    // Compara el nombre de usuario con el del archivo .env
    if (username === process.env.ADMIN_USERNAME) {
        // Si coinciden, devuelve un objeto de administrador ficticio
        return { username: process.env.ADMIN_USERNAME };
    } else {
        throw new Error('Credenciales inválidas');
    }
};
