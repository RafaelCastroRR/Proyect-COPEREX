import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const dbConnection = async () => {
    try {
        mongoose.connection.on('error', () => {
            mongoose.disconnect();
        });
        mongoose.connection.on('connecting', () => {
        });
        mongoose.connection.on('connected', () => {
        });
        mongoose.connection.on('open', () => {
        });
        mongoose.connection.on('reconnected', () => {
        });
        mongoose.connection.on('disconnected', () => {
        });

        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50,
        });

    } catch (error) {
        console.error(' Error al conectar a la base de datos:', error);
        process.exit(1);
    }
};
