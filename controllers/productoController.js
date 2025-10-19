import  ProductoDAO  from '../dao/ProductoDAO.js';
import { AppError } from '../utils/appError.js';


class ProductoController {
    static async crearProducto(req, res, next) {
        try {
            const { nombre, precio, cantidad } = req.body;

            if (!nombre || !precio || !cantidad) {
                next(new AppError('Lo campos nombre, precio y cantidad son requeridos'))
            }

            const productoData = { nombre, precio, cantidad }
            const producto = await ProductoDAO.crearProducto(productoData);
            res.status(201).json(producto);
        } catch (error) {
            next(new AppError('Error al crear producto', 500))
        }
    }

    static async obtenerProductoPorId(req, res, next) {
        try {
            const id = req.params.id;
            const producto = await ProductoDAO.obtenerProductoPorId(id);

            if (!producto) {
                next(new AppError('Producto no encontrado', 404))
            }

            res.status(200).json(producto);
        } catch (error) {
            next(new AppError('Error al obtener producto', 500))
        }
    }

    static async obtenerProductos(req, res, next) {
        try {

            const limit = req.query.limit || 10;
            const productos = await ProductoDAO.obtenerProductos(limit);

            if (!productos) {
                next(new AppError('Productos no encontrados', 404))
            }

            res.status(200).json(productos);
        } catch (error) {
            next(new AppError('Error al obtener productos', 500))
        }
    }

    static async actualizarProducto(req, res, next) {
        try {
            const id = req.params.id;

            const productoexists = await ProductoDAO.obtenerProductoPorId(id);

            if (!productoexists) {
                next(new AppError('Producto no encontrado', 404))
            }

            const productoData = req.body;

            const producto = await ProductoDAO.actualizarProducto(id, productoData)

            if (!producto) {
                next(new AppError('Producto no encontrado', 404))
            }

            res.status(200).json(producto);
        } catch (error) {
            next(new AppError('Error al actualizar el producto', 500))
        }
    }

    static async eliminarProducto(req, res, next) {
        try {
            const id = req.params.id;
            const productoexists = await ProductoDAO.obtenerProductoPorId(id);

            if (!productoexists) {
                next(new AppError('Producto no encontrado', 404))
            }

            const producto = await ProductoDAO.eliminarProducto(id);

            const msjReturn = { mensaje: 'Producto Eliminado Correctamente' };

            res.status(200).json(msjReturn)
        } catch (error) {
            next(new AppError('Error al eliminar el producto', 500))
        }
    }

}

export default ProductoController;
