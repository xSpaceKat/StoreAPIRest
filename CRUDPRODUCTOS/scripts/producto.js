import ProductoService from "../modulos/productoservice";

document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('search');
    const addProductButton = document.getElementById('add-product');

    console.log(window.navigator);
    console.log(window.location);
    console.log("Ancho de la ventana: " + window.screen.width + "px");
    console.log("Alto de la ventana: " + window.screen.height + "px");

    async function getProducts() {
        const products = await ProductoService.getProducts();
        
        products.forEach(product => {
            const productItem = document.createElement('li');
            productItem.innerHTML = `
                <p><strong>Nombre: </strong>${product.nombre}</p>
                <p><strong>Precio: </strong>$${product.precio}</p>
                <p><strong>Cantidad: </strong>${product.cantidad}</p>
                <button data-id="${product._id}" class="edit-button">Editar</button>
                <button data-id="${product._id}" class="delete-button">Eliminar</button>
                `;
                productList.appendChild(productItem);
            });
        } 


    getProducts();

    addProductButton.addEventListener('click', function() {
        window.location.href = 'formulario.html';
    });

    productList.addEventListener('click', async function(e) {
        if (e.target.classList.contains('edit-button')) {
            const productId = e.target.getAttribute('data-id');
            window.location.href = `formulario.html?id=${productId}`;
        }

        if (e.target.classList.contains('delete-button')) {
            const productId = e.target.getAttribute('data-id');
            if(confirm('¿Estás seguro de que deseas eliminar el producto?')) {
                try {
                    await ProductoService.deleteProduct(productId);
                    e.target.parentElement.remove();
                    alert('Producto eliminado con exito');
                } catch (error) {
                    console.error("Ocurrio un error al eliminar el producto:", error);
                }
            }
        }
    });

    searchInput.addEventListener('input', async function(e) {
        productList.innerHTML = '';
        
        const filtro = searchInput.value;

        if(filtro === '') {
            getProducts();
        } else {
            let products = await ProductoService.searchProducts(filtro);
            
            products.forEach(product => {
                const productItem = document.createElement('li');
                productItem.innerHTML = `
                <p><strong>Nombre: </strong>${product.nombre}</p>
                <p><strong>Precio: </strong>$${product.precio}</p>
                <p><strong>Cantidad: </strong>${product.cantidad}</p>
                <button data-id="${product._id}" class="edit-button">Editar</button>
                <button data-id="${product._id}" class="delete-button">Eliminar</button>
                `;
                productList.appendChild(productItem);
            });
        }

});
});
