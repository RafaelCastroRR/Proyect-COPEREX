import express from 'express';
import { dbConnection } from './mongo.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const startServer = async () => {
    await dbConnection();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer()
