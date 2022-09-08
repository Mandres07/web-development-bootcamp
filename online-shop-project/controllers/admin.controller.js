const Product = require('../models/product.model');

async function getProducts(req, res, next) {
   try {
      const products = await Product.findAll();
      res.render('admin/products/all-products', { products });
   } catch (error) {
      return next(error);
   }

}

function getNewProduct(req, res, next) {
   res.render('admin/products/new-product');
}

async function createProduct(req, res, next) {
   const product = new Product({
      ...req.body,
      image: req.file.filename
   });
   try {
      await product.save();
   } catch (error) {
      return next(error);
   }
   res.redirect('/admin/products');
}

async function getUpdateProduct(req, res, next) {
   try {
      const product = await Product.findById(req.params.id);
      res.render('admin/products/update-product', { product });
   } catch (error) {
      return next(error);
   }
}

async function updateProduct(req, res, next) {
   const product = new Product({
      _id: req.params.id,
      ...req.body
   });
   if (req.file) {
      product.replaceImage(req.file.filename);
   }
   try {
      await product.save();
   } catch (error) {
      return next(error);
   }
   res.redirect('/admin/products');
}

async function deleteProduct(req, res, next) {
   try {
      const product = await Product.findById(req.params.id);
      await product.remove();
   } catch (error) {
      return next(error);
   }
   res.json({ message: 'product deleted' });
}

module.exports = {
   getNewProduct,
   getProducts,
   createProduct,
   getUpdateProduct,
   updateProduct,
   deleteProduct
}