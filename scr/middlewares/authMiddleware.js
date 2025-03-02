import jwt from 'jsonwebtoken';
import Admin from '../auth/auth.model.js';

// Middleware para proteger las rutas que requieren autenticación
export const protect = async (req, res, next) => {
    let token;

    // Verifica si el token está en los encabezados
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtiene el token del encabezado
            token = req.headers.authorization.split(' ')[1];

            // Verifica el token usando JWT
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Busca al administrador basado en el ID decodificado
            req.admin = await Admin.findById(decoded.id).select('-password');
            
            next();
        } catch (error) {
            res.status(401).json({ message: 'No autorizado, token fallido' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No autorizado, no hay token' });
    }
};
