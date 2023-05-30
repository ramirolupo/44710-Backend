import fs from 'fs';

export class ProductManager{
    constructor(path){
        this.path = path;
    }

    async getProducts(){
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path,'utf-8');
                const productsJS = JSON.parse(products);
                return productsJS;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async addProduct(product){
        try {
            const productFile = await this.getProducts();
            productFile.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(productFile));
        } catch (error) {
            console.log(error);
        }
    }

    async getProductByID(idProduct){
        try {
            const productID = await this.getProducts();
            const checkProduct = productID.find((product) => product.id === idProduct)
            if (!checkProduct){
                return 'El producto no existe';
            } else {
                return checkProduct;
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(idProduct, campo, nuevoValor){
        try {
            const productFile = await this.getProducts();
            const productIndex = productFile.findIndex((product) => product.id === idProduct);
            if (productIndex === -1) {
                return console.log('El producto no existe');
            } else {
                productFile[productIndex][campo] = nuevoValor;
                await fs.promises.writeFile(this.path, JSON.stringify(productFile));
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(idProduct){
        try {
            const productFile = await this.getProducts();
            const resultado = productFile.filter((product) => product.id !== idProduct);
            if (productFile == resultado) {
                return console.log('El producto no existe!!');
            } else {
                await fs.promises.writeFile(this.path, JSON.stringify(resultado));
                console.log('Producto eliminado!')
            }                      
        } catch (error) {
            console.log(error);
        }
    }

}