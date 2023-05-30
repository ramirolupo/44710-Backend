class ProductManager{
    constructor(){
        this.products = [];
    }

    getProducts(){
        return this.products;
    }

    addProduct(title,description,price,thumbnail,code,stock){
        const product = {
            id: this.#newId() + 1,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };
        if (!title) {
            console.log('Falta el nombre'); 

        } else if (!description) {
            console.log('Falta la descripción'); 
        
        } else if (!price) {
            console.log('Falta el precio'); 
        
        } else if (!thumbnail) {
            console.log('Falta la imagen'); 
        
        } else if (!code) {
            console.log('Falta el código'); 
        
        } else if (!stock) {
            console.log('Falta el stock'); 
        
        } else {
            if (!this.#checkCode(code)) {
                this.products.push(product);
            } else {
                console.log('El evento ya existe.');
            }
        }  
    }

    getProductByID(idProduct){
        const checkProduct = this.products.find((product) => product.id === idProduct)
        
        if (!checkProduct) {
            return 'No existe el producto';
        }
        return  checkProduct;
    }

    #newId(){
        let maxId = 0;
        this.products.map((product) => {
            if(product.id > maxId) maxId = product.id;
        });
        return maxId;
    }
    
    #checkCode(code){
        return this.products.find((product) => product.code === code)
    }

}

const productManager = new ProductManager();

productManager.addProduct('asd','Este es un producto prueba',200,'Sin Imagen','abc123',25);
// console.log(productManager.getProducts());
// productManager.addProduct('producto prueba','Este es un producto prueba',200,'Sin Imagen','abc123',25);
// console.log(productManager.getProductByID(1));
console.log(productManager.getProducts()); 
