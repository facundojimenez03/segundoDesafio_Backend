
const express = require('express');
const ProductManager = require("./ProductManager");
const productManager = new ProductManager();

const app = express();

const PORT = 8080;
app.use(express.urlencoded({ extended: true }));


productManager.leerProductos().then(() => {


    app.get('/productos/:pid', async (req, res) => {
        try {
            const pid = parseInt(req.params.pid);
            const buscar = await productManager.getProductById(pid);
            if (buscar) {
                return res.send(buscar);
            } else {
                console.log('Producto no encontrado');
                return res.status(404).send('Producto no encontrado');
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error al procesar el pedido de búsqueda por ID');
        }
    });

    app.get('/productos', async (req, res) => {
        try {
            const { limit } = req.query;
            let productos = await productManager.getProducts();
            
            if (limit) {
                productos = productos.slice(0, Number(limit));
            }
            
            res.send(productos);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los productos", detalles: error });
        }
    });

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}).catch(error => console.error("Error al cargar los productos:", error));
