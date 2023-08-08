export default class ProductRegisterDTO {
    constructor(product) {
        this.brand = product.brand
        this.model = product.model
        this.description = product.description
        this.price = product.price
        this.stock = product.stock
    }
}