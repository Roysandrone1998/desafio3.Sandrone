import express from 'express';
import ProductManager from './productManager.js';

const app = express();
const port = 3000;


const manager = new ProductManager('./Productos.json');

app.get('/products', async (req, res) => {
  const limit = parseInt(req.query.limit, 10);

  if (isNaN(limit)) {
    res.json(manager.consultarProductos());
  } else {
    res.json(manager.consultarProductos().slice(0, limit));
  }
});

app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid, 10);
  const product = manager.getProductById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});