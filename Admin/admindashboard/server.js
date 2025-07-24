const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;
const productsFile = path.join(__dirname, 'products.json');

app.use(cors());
app.use(express.json());

async function readProducts() {
  try {
    const data = await fs.readFile(productsFile, 'utf8');
    console.log('Successfully read products.json:', data);
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading products:', err);
    return [];
  }
}

async function writeProducts(products) {
  try {
    await fs.writeFile(productsFile, JSON.stringify(products, null, 2));
  } catch (err) {
    console.error('Error writing products:', err);
  }
}

app.get('/api/products', async (req, res) => {
  const products = await readProducts();
  res.json(products);
});

app.post('/api/products', async (req, res) => {
  const products = await readProducts();
  const newProduct = {
    id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
    name: req.body.name,
    price: parseFloat(req.body.price),
    stock: parseInt(req.body.stock),
    aisle: req.body.aisle // Add aisle field
  };
  products.push(newProduct);
  await writeProducts(products);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', async (req, res) => {
  const products = await readProducts();
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products[productIndex] = {
    ...products[productIndex],
    name: req.body.name || products[productIndex].name,
    price: req.body.price ? parseFloat(req.body.price) : products[productIndex].price,
    stock: req.body.stock ? parseInt(req.body.stock) : products[productIndex].stock,
    aisle: req.body.aisle || products[productIndex].aisle // Update aisle if provided
  };
  await writeProducts(products);
  res.json(products[productIndex]);
});

app.delete('/api/products/:id', async (req, res) => {
  const products = await readProducts();
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const deletedProduct = products.splice(productIndex, 1)[0];
  await writeProducts(products);
  res.json(deletedProduct);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});