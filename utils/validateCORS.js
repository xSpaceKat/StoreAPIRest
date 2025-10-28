//npm install cors
import cors from 'cors';

import dotenv from 'dotenv';

dotenv.config({ path: './variables.env' });

// Obtener las URLs permitidas desde el archivo .env
const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [];

// Configuración del middleware CORS
const corsOptions = {
  origin: (origin, callback) => {
    // Si la URL está en la lista de permitidos o no hay origin (por ejemplo en Postman), permitir la solicitud
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Para permitir el envío de cookies, tokens, etc.
  optionsSuccessStatus: 200 // Para algunas configuraciones de navegadores antiguos
};

export default cors(corsOptions);