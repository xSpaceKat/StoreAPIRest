import Venta from '../models/Venta.js';

class VentaDAO {
    constructor() { }

    async crearVenta(ventaData) {
        try {
            const venta = new Venta(ventaData);
            return await venta.save();
        } catch (error) {
            throw error
        }
    }

    async obtenerVentaPorID(id) {
        try {
            return await Venta.findById(id);
        } catch (error) {
            throw error
        }
    }

    async obtenerVentas() {
        try {
            return await Venta.find();
        } catch (error) {
            throw error
        }
    }

    async actualizarVenta(id, ventaData) {
        try {
            return await Venta.findByIdAndUpdate(id, ventaData, { new: true });
        } catch (error) {
            throw error;
        }
    }

    async eliminarVenta(id) {
        try {
            return await Venta.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

    async agregaProductosAVenta(idVenta, productos) {
        try {
            const venta = await Venta.findById(idVenta);;
            if (!venta) {
                throw new Error('No se encontro la venta');
            }

            venta.productosventa.push(
                ...productos.map(producto => ({
                    idProducto: producto.idProducto,
                    descripcion: producto.nombre,
                    precioVenta: producto.precioVenta,
                    cantidad: producto.cantidad,
                    subtotal: producto.precioVenta * producto.cantidad
                }))
            );

            return await venta.save();
        } catch (error) {
            throw error;
        }
    }
}

export default new VentaDAO();