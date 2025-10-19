import express from 'express';
import VentaController from '../controllers/VentaController.js';
const router = express.Router();

// Rutas para operaciones relacionadas con ventas
router.post('/', VentaController.crearVenta);
router.get('/:id', VentaController.obtenerVentaPorId);
router.get('/', VentaController.obtenerVentas);
router.put('/:id', VentaController.actualizarVenta);
router.delete('/:id', VentaController.eliminarVenta);

export default router;