const socket = io();

const title = document.getElementById('title');
const description = document.getElementById('description');
const price = document.getElementById('price');
const stock = document.getElementById('stock');
const estado = document.getElementById('status');
const category = document.getElementById('category');
const code = document.getElementById('code');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const deleteId = document.getElementById('delete-id');
const deleteBtn = document.getElementById('delete');


btn.addEventListener('click', () =>{
    socket.emit('newProduct', {
        title: title.value,
        description: description.value,
        price: price.value,
        stock: stock.value,
        status: estado.value,
        category: category.value,
        code: code.value
    });
    title.value = '';
    description.value = '';
    price.value = '';
    stock.value = '';
    estado.value = '';
    category.value = '';
    code.value = '';
});

document.addEventListener('DOMContentLoaded', () => {
    socket.emit('getProducts')
});
  
socket.on('products', (data)=>{
    const productsRender = data.map((product) => {
        return `<div class="product">
                    <h2>${product.title}</h2>
                    <p>Descripción: ${product.description}</p>
                    <p>Precio: ${product.price}</p>
                    <p>Stock: ${product.stock}</p>
                    <p>Estado: ${product.status}</p>
                    <p>Categoría: ${product.category}</p>
                    <p>Código: ${product.code}</p>
                </div>`;
    }).join(' ');
    output.innerHTML = productsRender;
});


deleteBtn.addEventListener('click', () => {
    const productId = Number(deleteId.value);
    socket.emit('deleteProduct', productId);
    deleteId.value = '';
});

socket.on('productDeleted', (productId) => {
    const product = document.getElementById(`product-${productId}`);
    if (product) {
        product.remove();
    }
});


