
//npm install jsonwebtoken
//npm install express-unless
import { AppError } from './appError.js';

import jwt from 'jsonwebtoken';

// Definimos la función middleware
const validateJWT = (req, res, next) => {
  // Obtener el token desde los headers
  const token = req.header('Authorization'); 

  // Validar si el token existe
  if (!token) {
    next(new AppError('No token provided, authorization denied', 500))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Si es válido, añadimos los datos decodificados al request (opcional)
    req.user = decoded;

    // Llamamos a `next()` para continuar con el siguiente middleware o la ruta
    next();
  } catch (error) {
    // Si el token no es válido, retornamos un error
    next(new AppError('Token is not valid', 500))
  }
};

export default validateJWT;