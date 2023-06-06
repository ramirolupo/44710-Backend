import fs from 'fs';

export class CartManager{
    constructor(path){
        this.path = path;
    }

    async getCarts(idCart){
        try {
            if (fs.existsSync(this.path)) {
                const carts = await fs.promises.readFile(this.path,'utf-8');
                const cartsJS = JSON.parse(carts);
                const checkCart = cartsJS.find((cart) => cart.id === idCart)
                    if (!checkCart){
                        return [];
                    } else {
                        return [checkCart];
                    }
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async #getMaxId(){
        let maxId = 0;
        const carts = await this.getCarts();
        carts.map((cart) => { 
          if (cart.id > maxId) maxId = cart.id;                                       
        });
        return maxId;
    }

    async addCart(idProduct){
        try {
            const cart = {
                id: await this.#getMaxId() + 1,
                products: [{id: idProduct, quantity: 1}]
            }
            const cartFile = await this.getCarts();
            cartFile.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(cartFile));         
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(idCart, idProduct){
        try {
            const cartsFile = await this.getCarts(idCart);
            const cartIndex = cartsFile.findIndex(cart => cart.id === idCart);
            const product = cartsFile[cartIndex].products.find(product => product.id == idProduct);
            if (product) {
                product.quantity += 1;
            } else {
                cartsFile[cartIndex].products.push({ id: idProduct, quantity: 1 });
            }
            await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));            
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCart(idCart){
        try {
            const cartFile = await this.getProducts();
            if(cartFile.length > 0){
                const resultado = cartFile.filter((item) => item.id !== idCart);
                await fs.promises.writeFile(this.path, JSON.stringify(resultado));
            } else {
                throw new Error(`Cart not found`);
            }  
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAllCarts(){
        if(fs.existsSync(this.path)){
            await fs.promises.unlink(this.path)
        }
      }

}