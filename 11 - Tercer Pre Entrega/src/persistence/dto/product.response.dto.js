export default class ProductResponseDTO {
    constructor(product) {
        this.marca = product.brand
        this.modelo = product.model
        this.descripcion = product.description
        this.precio = product.price
    }
}