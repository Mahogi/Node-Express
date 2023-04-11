const cors = require('cors');
const express = require('express');
const app = express();
const uid = require('uid');
//const productsJson = require('./productList.json');

app.use(express.json());
app.use(cors());

let products = [];

app.post('/products', (req, res) => {
  //console.log(req.body);
  const product = req.body;
  product.id = uid.uid();
  //res.send({products: productsJson});
  products.push(product);
  res.send({products});
})

app.get("/delete/:id", (req, res) => {
  const {id} = req.params
  products = products.filter(x => x.id !== id)
  res.send({products})
})

app.listen(3400);