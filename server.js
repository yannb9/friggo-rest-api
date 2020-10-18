const express = require('express');
const functions = require('./functions');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

let port = process.env.PORT || 8080;

// Send a GET request to /products/all to GET all products
app.get('/products/all', async (req, res) => {
    try {
        if (req.headers["api-key"] === "tbFi8sm-9ET8QPw5") {
            const products = await functions.getJSONFile();
            res.json(products.products)
        } else {
            res.status(401).send({
                auth: false,
                message: 'No Key/Wrong Key provided.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

// Send a POST request to /products/all to CREATE a new product
app.post('/products/all', (req, res) => {
    try {
        if (req.headers["api-key"] === "tbFi8sm-9ET8QPw5") {
            const product = functions.addProduct(req.body.product)
            res.json(product)
        } else {
            res.status(401).send({
                auth: false,
                message: 'No Key/Wrong Key provided.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

// Send a DELETE request to DELETE product
app.delete('/products/:name', async(req,res)=>{
    try {
        const name = await functions.getProduct(req.params.name);
        if (name) {
            functions.deleteProduct(name)
        } else {
            res.status(404).send({message:"Product not available"})
        }
        if (req.headers["api-key"] === "tbFi8sm-9ET8QPw5") {
            
        } else {
            res.status(401).send({
                auth: false,
                message: 'No Key/Wrong Key provided.'
            });
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// Send a GET request to /inventory/all to GET all items in inventory
app.get('/inventory/all', async (req, res) => {
    try {
        if (req.headers["api-key"] === "tbFi8sm-9ET8QPw5") {
            const inventory = await functions.getJSONFile();
            res.json(inventory.inventory)
        } else {
            res.status(401).send({
                auth: false,
                message: 'No Key/Wrong Key provided.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

// Send a GET request to /inventory/:id to GET item based on id
app.get('/inventory/:id', async (req, res) => {
    try {
        if (req.headers["api-key"] === "tbFi8sm-9ET8QPw5") {
            const item = await functions.getItem(req.params.id);
            res.json(item)
        } else {
            res.status(401).send({
                auth: false,
                message: 'No Key/Wrong Key provided.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

// Send a POST request to /inventory/all CREATE a new item in the inventory
app.post('/inventory/all', (req, res) => {
    try {
        if (req.headers["api-key"] === "tbFi8sm-9ET8QPw5") {
            const item = functions.createItem({
                product: req.body.product,
                quantity: req.body.quantity,
                type: req.body.type,
                store: req.body.store,
                aisle: req.body.aisle,
                price: req.body.price
            })
            res.json(item)
        } else {
            res.status(401).send({
                auth: false,
                message: 'No Key/Wrong Key provided.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})


// Send a PUT request to UPDATE new item in the inventory
app.put('/inventory/:id', async(req,res)=>{
    try {
        if (req.headers["api-key"] === "tbFi8sm-9ET8QPw5") {
            const item = await functions.getItem(req.params.id);
            if (item) {
            item.price = req.body.price && req.body.price;
            item.quantity = req.body.quantity && req.body.quantity;
            item.aisle = req.body.aisle && req.body.aisle;
            await functions.updateItem(item);
            res.status(201).end({message: "Update Successful"})
            } else {
                res.status(404).send({message:"Item not in inventory"})
            }
        } else {
            res.status(401).send({
                auth: false,
                message: 'No Key/Wrong Key provided.'
            });
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


// Send a DELETE request to DELETE item in inventory
app.delete('/inventory/:id', async(req,res)=>{
    try {
        if (req.headers["api-key"] === "tbFi8sm-9ET8QPw5") {
            const item = await functions.getItem(req.params.id);
            if (item) {
                functions.deleteItem(item)
            } else {
                res.status(404).send({message:"Item not in inventory"})
            }
        } else {
            res.status(401).send({
                auth: false,
                message: 'No Key/Wrong Key provided.'
            });
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// Send a POST request to RESET inventory
app.post('/reset', async(req,res)=>{
    try {
        if (req.headers["api-key"] === "tbFi8sm-9ET8QPw5") {
            functions.resetData();
            res.status(201).send({
                reset: true,
                message: 'Your data has been resetted'
            });
        } else {
            res.status(401).send({
                auth: false,
                message: 'No Key/Wrong Key provided.'
            });
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


app.listen(port, () => console.log(`Listening to port ${port}`))