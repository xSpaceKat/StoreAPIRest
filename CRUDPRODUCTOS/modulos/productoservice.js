const API_URL = "http://localhost:3000/api/productos";

export default class ProductoService {
    static getProducts(){
        return fetch(`${API_URL}`).then(response => response.json());
    }

    static getProductById(id){
        return fetch(`${API_URL}/${id}`).then(response => response.json());
    }

    static addProduct(productData){
        return fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        }).then(response => response.json());
    }

    static editProduct(id, productData){
        return fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        }).then(response => response.json());
    }

    static deleteProduct(id){
        return fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        }).then(response => response.json());
    }

    static searchProducts(filtro){
        return fetch(`${API_URL}/filtro/${filtro}`).then(response => response.json());
    }
}