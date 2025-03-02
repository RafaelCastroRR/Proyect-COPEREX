import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConnection } from '../configs/mongo.js';
import { protect } from '../scr/middlewares/authMiddleware.js';
import { errorHandler } from '../scr/middlewares/errorHandler.js';
import authRoutes from '../scr/auth/auth.routes.js';
import companyRoutes from '../scr/company/company.routes.js';
import Admin from '../scr/auth/auth.model.js'; // Importa el modelo de Admin
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();

// Función para crear el administrador si no existe
const createAdminIfNotExists = async () => {
    try {
        const adminExists = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
        
        if (!adminExists) {
            // Crear el administrador
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
            const newAdmin = new Admin({
                username: process.env.ADMIN_USERNAME,
                password: hashedPassword,
            });
            
            await newAdmin.save();
            console.log('Administrador creado exitosamente');
        } else {
            console.log('El administrador ya existe');
        }
    } catch (error) {
        console.error('Error al crear el administrador:', error);
    }
};

// Conectar a la base de datos
const startServer = async () => {
    try {
        await dbConnection();
        console.log('Conexión a la base de datos establecida.');

        // Crear el administrador si no existe
        await createAdminIfNotExists();

        // Middleware para permitir peticiones de diferentes dominios
        app.use(cors());

        // Middleware para parsear el cuerpo de las solicitudes (JSON)
        app.use(express.json());

        // Rutas de autenticación
        app.use('/api/auth', authRoutes);

        // Rutas de gestión de empresas (protegidas por autenticación)
        app.use('/api/companies', protect, companyRoutes);

        // Middleware de manejo de errores globales
        app.use(errorHandler);

        // Configuración del puerto
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1); // Detener el servidor si no se puede conectar a la base de datos
    }
};

// Iniciar el servidor
startServer();
