const fs = require('fs').promises
class ProducManager {
    constructor() {
        this.products = [];
        this.path = 'productos.json';
    }

    async leerUsuarios() {
        try {
            const data = await fs.readFile(this.path, "utf8");
            this.products = JSON.parse(data);
        } catch (error) {
            console.log("Error al leer los productos:", error);
        }
    



    }
    async writeProducts(products) {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
            console.log("Productos actualizados exitosamente");
        } catch (error) {
            console.error("Se produjo un error al escribir los productos:", error);
        }
    

}
async updateProduct(productId, updatedProduct) {
    try {
        const index = this.products.findIndex(product => product.id === productId);
        if (index !== -1) {
            
            updatedProduct.id = productId;
            this.products[index] = updatedProduct;
            await this.writeProducts();
            console.log(`Producto con ID ${productId} actualizado exitosamente`);
        } else {
            console.log(`Producto con ID ${productId} no encontrado`);
        }
    } catch (error) {
        console.error("Se produjo un error al actualizar el producto:", error);
    }
}

async deleteProduct(productId) {
    try {
        const index = this.products.findIndex(product => product.id === productId);
        if (index !== -1) {
            this.products.splice(index, 1);
            await this.writeProducts();
            console.log(`Producto con ID ${productId} eliminado exitosamente`);
        } else {
            console.log(`Producto con ID ${productId} no encontrado`);
        }
    } catch (error) {
        console.error("Se produjo un error al eliminar el producto:", error);
    }
}



    addProducts(title, description, price, thumbnail, code, stock) {
        const product_id = this.products.length + 1
        if (!this.products.some(product => product.code === code) && title && description && price && thumbnail && code && stock) {
            const product = {
                id: product_id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            this.products.push(product);
        }
    }
    getProductById(product_id) {
        const product_encontrado = this.products.find((product) => product.id === product_id)
        if (!product_encontrado) {
            console.log("Not found")
            return

        } else {
            return product_encontrado
        }

    }
    getProducts() {
        return this.products
    }
}

(async () => {
         const productManager = new ProducManager();
    
    //     // Agregar productos
     await productManager.addProducts("licuadora", " mezclador de jugo fresco, carga inalámbrica", 1200, "/imgs/licuadora.jpg", "01", 25);
    await productManager.addProducts("cargador ", "Cargador rápido inalámbrico magnético", 8300, "/imgs/cargador.jpg", "02", 32);
   await productManager.addProducts("tostadora", "rapido tostado", 15.99, "img/tostadora.jpg", "03", 100);
  await productManager.addProducts("heladera", "heladera con pantalla", 3329.99, "img/heladera.jpg", "04", 50);

    
        // Obtener todos los productos
        console.log("Todos los productos:", await productManager.getProducts());
    
        // Obtener un producto por ID
        console.log("Producto con ID 1:", await productManager.getProductById(1));
    
       
        await productManager.updateProduct(1, { price: 350, stock: 10 });
        console.log("Producto actualizado con ID 1:", await productManager.getProductById(1));
    
        // Eliminar un producto
        await productManager.deleteProduct(1);
        console.log("Todos los productos después de eliminar:", await productManager.getProducts());
    })();
