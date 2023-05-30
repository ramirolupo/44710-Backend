import fs from 'fs';

class ProductManager{
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
            const prueba = productFile.find((el) => el.code === product.code)
            if (prueba) {
                console.log('El producto ya existe.');
                
            } else if (!product.title) {
                console.log('Falta el nombre'); 
    
            } else if (!product.description) {
                console.log('Falta la descripción'); 
            
            } else if (!product.price) {
                console.log('Falta el precio'); 
            
            } else if (!product.thumbnail) {
                console.log('Falta la imagen'); 
            
            } else if (!product.code) {
                console.log('Falta el código'); 
            
            } else if (!product.stock) {
                console.log('Falta el stock'); 
            
            } else {
                product.id = this.#newId(productFile);
                productFile.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(productFile));
            }            
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

    #newId(productFile) {
        let lastId = productFile.length > 0 ? productFile[productFile.length - 1].id : -1;
        return lastId + 1;
    }
    

}

const manager = new ProductManager('./products.json');


const producto1 = {
    title: 'paleta4',
    description: 'description',
    price: 1000,
    thumbnail: 'thumbnail',
    code: 'jkl',
    stock: 20
}
const producto2 = {
    title: 'paleta5',
    description: 'description',
    price: 2000,
    thumbnail: 'thumbnail',
    code: 'mno',
    stock: 10
}

const test = async() => {
    const get = await manager.getProducts();
    console.log('primer consulta', get);
    await manager.addProduct(producto1);
    const get2 = await manager.getProducts();
    console.log('segunda consulta', get2);
    await manager.addProduct(producto2);
    const get3 = await manager.getProducts();
    console.log('tercer consulta', get3);
}

const test2 = async() => {
    await manager.deleteProduct(3);
    const get = await manager.getProducts();
    console.log(get);
}

const test3 = async() => {
    await manager.updateProduct(3,'description','pruebaUpdate')
    const get = await manager.getProducts();
    console.log(get);
}

test();
//test2();
//test3(); 
