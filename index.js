import express from 'express';
import { AppError, globlaErrorHandler} from './utils/appError.js';
import morgan from 'morgan';
import validateJWT from './utils/validateJWT.js';
import corsMiddleware from './utils/validateCORS.js';
import { conectar } from './config/db.js';
import productorouter from './routers/productoRouter.js';
import ventarouter from './routers/VentaRouter.js';
import jwt  from 'jsonwebtoken';

conectar();

const app = express();
//Middleware para analizar los datos del cuerpo de las solicitudes en formato JSON
app.use(express.json());

//Configurar el middleware de morgan para el registro de solicitudes en consola
app.use(morgan('combined'));

app.use(corsMiddleware);

app.post('/api/usuario/iniciarsesion', (req, res) => {
    const { username, password } = req.body;

    // Validar las credenciales del usuario (esto es solo un ejemplo básico)
    // Aquí deberías verificar el usuario contra tu base de datos
    if (username === 'admin' && password === 'password') {
        // Datos del payload para el token (puedes incluir lo que quieras)
        const payload = {
            userId: 1,
            username: 'admin',
            role: 'admin'
        };

        // Crear el token JWT (con duración de 1 hora, por ejemplo)
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Devolver el token al usuario
        res.json({
            msg: 'Login successful',
            token
        });
    } else {
        // Respuesta en caso de credenciales incorrectas
        res.status(401).json({
            msg: 'Invalid username or password'
        });
    }
});


//Middleware para exponer mis rutas y puedan ser accedidas
app.use('/api/productos',validateJWT, productorouter);
app.use('/api/ventas', ventarouter);

app.use((req,res,next)=>{
    const error = new AppError(`No se ha podido acceder a ${req.originalUrl} en el servidor`, 404);
    next(error);
});

app.use(globlaErrorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
})