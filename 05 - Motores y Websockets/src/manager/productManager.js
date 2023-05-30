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

    async #getMaxId(){
        let maxId = 0;
        const products = await this.getProducts();
        products.map((prod) => { 
          if (prod.id > maxId) maxId = prod.id;                                       
        });
        return maxId;
    }

    // {
    //     "title": "Hol4",
    //     "description": "asd",
    //     "price": 2,
    //     "stock": 5,
    //     "status": true,
    //     "category": "a",
    //     "code": "prueba1"
    //   }

    async addProduct(obj){
        try {
            const product = {
                id: await this.#getMaxId() + 1,
                ...obj
            };
            const productFile = await this.getProducts();
            const prueba = productFile.find((el) => el.code === product.code)
            if (prueba) {
                console.log('El producto ya existe.');

            } else if (!product.title) {
                console.log('Falta el nombre'); 

            } else if (!product.description) {
                console.log('Falta la descripción'); 

            } else if (!product.price) {
                console.log('Falta el precio'); 

            } else if (!product.status) {
                console.log('Falta el status'); 

            } else if (!product.category) {
                console.log('Falta la categoría'); 

            } else if (!product.code) {
                console.log('Falta el código'); 

            } else if (!product.stock) {
                console.log('Falta el stock'); 

            } else {
                productFile.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(productFile));
                return product;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(idProduct){
        try {
            const productFile = await this.getProducts();
            const checkProduct = productFile.find((product) => product.id === idProduct)
            if (!checkProduct){
                return false;
            } else {
                return checkProduct;
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(obj, id){
        try {
            const productsFile = await this.getProducts();
            const index = productsFile.findIndex(prod => prod.id === id);
            if(index === -1){
                throw new Error(`Id ${id} not found`)
            } else {
                productsFile[index] = { ...obj, id }
            }
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(idProduct){
        try {
            const productFile = await this.getProducts();
            if(productFile.length > 0){
                const resultado = productFile.filter((product) => product.id !== idProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(resultado));
            } else {
                throw new Error(`Product not found`);
            }  
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAllProducts(){
        if(fs.existsSync(this.path)){
            await fs.promises.unlink(this.path)
        }
      }

}