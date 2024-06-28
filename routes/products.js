var express = require('express');
var router = express.Router();
const addProduct = require('../models/addProduct')
const deleteProduct = require('../models/deleteProduct')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const products_display = require('../models/products_display');
const getProductById = require('../models/getProductById');
const fs = require('fs');
const updateProduct = require('../models/updateProduct');

router.get('/', function(req, res, next) {
  res.render('addProduct', { title: 'Add product' });
});

router.get('/:id', async function(req, res, next) {
  const id = req.params.id;
  const result = await getProductById(id);
    res.render('updateProduct', { title: 'Update product',form_data : result  });
  
});

router.post('/',upload.single('image'), async function(req, res, next) {
  const name = req.body.name;
  const description = req.body.description; 
  const price = req.body.price;
  const quantity = req.body.quantity;
  const image = req.file.path; 
  const base64Data = fs.readFileSync(image, { encoding: 'base64' });
  console.log(name, description, price, quantity, base64Data)
  const result = await addProduct(name, description, price, quantity, base64Data, shopName=req.session.username);
  if(result) {
    html_table = await products_display(req.session.username);
    res.render('users', {title: 'User Page', products_table: html_table});
  } else {
    console.log("error")
  }
})

router.post('/update/:id',upload.single('image'), async function(req, res, next) {
  const id = req.params.id;
  const name = req.body.name;
  const description = req.body.description; 
  const price = req.body.price;
  const quantity = req.body.quantity;
  console.log(req)
  let base64Data
  if(req?.file?.path != undefined){
    const image = req.file.path; 
    base64Data = fs.readFileSync(image, { encoding: 'base64' });
  }else{
    base64Data = req.body.image
  }
  console.log(name, description, price, quantity, base64Data)
  const result = await updateProduct(id, name, description, price, quantity, base64Data);
  if(result) {
    html_table = await products_display(req.session.username);
    res.render('users', {title: 'User Page', products_table: html_table});
  } else {
    console.log("error")
  }
})

router.post('/:id', async function(req, res, next) {
  console.log(req.params.id)
  const id = req.params.id;
  const result = await deleteProduct(id);
  if(result) {
    html_table = await products_display(req.session.username);
    res.render('users', {title: 'User Page', products_table: html_table});
  } else {
    console.log("error")
  }
})

module.exports = router;
