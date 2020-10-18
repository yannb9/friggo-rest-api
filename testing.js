fetch("http://localhost:8080/products/all", {
        method: 'GET',
        headers: {
            "api-key": "tbFi8sm-9ET8QPw5"
        },
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));


// POSTING NEW ITEM
var data = {
    product: "Sugar",
    quantity: 20,
    type: "Sucrose",
    store: "Supersal",
    aisle: 8,
    price: 0.99
};
fetch('http://localhost:8080/inventory/all', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "api-key": "tbFi8sm-9ET8QPw5"
        },
        body: JSON.stringify(data)
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));


// POSTING NEW PRODUCT
fetch('http://localhost:8080/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "api-key": "tbFi8sm-9ET8QPw5"
        },
        body: ''
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));