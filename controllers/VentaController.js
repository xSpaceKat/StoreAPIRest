import VentaDAO from '../dao/VentaDAO.js';
import { AppError } from '../utils/appError.js';

export default class VentaController {
    static async crearVenta(req, res, next) {
        try {
            const ventareq = req.body;

            // Validación de entrada
            if (!ventareq.productosventa || !ventareq.productosventa.length) {
                next(new AppError('La lista de productos es obligatoria para crear una venta', 400));
            }

            const venta = await VentaDAO.crearVenta(ventareq);
            res.status(201).json(venta);
        } catch (error) {
            next(new AppError('Error al crear la venta', 500));
        }
    }

    static async obtenerVentaPorId(req, res, next) {
        try {
            const id = req.params.id;
            const venta = await VentaDAO.obtenerVentaPorID(id);

            if (!venta) {
                next(new AppError('No se encontró la venta', 404));
            }

            res.status(200).json(venta);
        } catch (error) {
            next(new AppError('Error al obtener la venta', 500));
        }
    }

    static async obtenerVentas(req, res, next) {
        try {
            
            const ventas = await VentaDAO.obtenerVentas();

            if (!ventas) {
                next(new AppError('No se encontraron ventas', 404));
            }

            res.status(200).json(ventas);
        } catch (error) {
            next(new AppError('Error al obtener las ventas', 500));
        }
    }

    static async actualizarVenta(req, res, next) {
        try {
            const id = req.params.id;
            const ventaData = req.body;
            const venta = await VentaDAO.actualizarVenta(id, ventaData);

            if (!venta) {
                next(new AppError('No se encontró la venta', 404));
            }

            res.status(200).json(venta);
        } catch (error) {
            next(new AppError('Error al actualizar la venta', 500));
        }
    }

    static async eliminarVenta(req, res, next) {
        try {
            const id = req.params.id;

            const venta = await VentaDAO.eliminarVenta(id);

            if (!venta) {
                next(new AppError('No se encontró la venta', 404));
            }

            res.status(200).json({ mensaje: 'Venta eliminada correctamente' });
        } catch (error) {
            next(new AppError('Error al eliminar la venta', 500));
        }
    }
}

