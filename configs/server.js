'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import limiter from '../src/middlewares/validar-cant-peticiones.js';
import authRoutes from '../src/auth/auth.routes.js'

const configurarMiddleWares = (app) =>{
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const configurarRutas = (app) =>{
    const authPath = '/adoptionSystem/v1/auth';

    app.use(authPath, authRoutes);
}

const conectarDB = async () =>{
    try {
        await dbConnection();
        console.log('Succesful connecting to database')
    } catch (error) {
        console.log('Error connecting to database');
        process.exit(1);
    }
}

export const iniciarServidor = async () =>{
    const app = express();
    const port = process.env.PORT || 3000;

    await conectarDB();

    configurarMiddleWares(app);
    configurarRutas(app);

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}