const express = require('express');
const functions = require('./functions');
const app = express();
app.use(express.json())

let port = process.env.PORT || 8080;

app.get('/products/all', async (req, res) => {
    const products = await functions.getJSONFile();
    res.json(products.products)
})

app.get('/inventory/all', async (req, res) => {
    const inventory = await functions.getJSONFile();
    res.json(inventory.inventory)
})

app.get('/inventory/:id', async (req, res) => {
    const item = await functions.getItem(req.params.id);
    res.json(item)
})

app.post('/inventory/all', (req,res)=>{
    const item = functions.createItem({
        product: req.body.product,
        quantity: req.body.quantity,
        type: req.body.type,
        store: req.body.store,
        aisle: req.body.aisle,
        price: req.body.price  
    })
    res.json(item)
})

// Send a POST request to /products/:product CREATE a new product
// Send a POST request to CREATE a new item in the inventory
// Send a PUT request to UPDATE new item in the inventory
// Send a DELETE request to DELETE item in inventory
// Send a DELETE request to DELETE/REST the inventory
app.listen(port, () => console.log(`Listening to port ${port}`))