const Product = require('../models/product.model');
const Order = require('../models/order.model');

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

async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAll();
    res.render('admin/orders/admin-orders', {
      orders
    });
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  const orderId = req.params.id;
  const newStatus = req.body.newStatus;
  try {
    const order = await Order.findById(orderId);
    order.status = newStatus;
    await order.save();
    res.json({ message: 'Order updated', newStatus: newStatus });
  } catch (error) {
    next(error);
  }
}

module.exports = {
   getNewProduct,
   getProducts,
   createProduct,
   getUpdateProduct,
   updateProduct,
   deleteProduct,
   getOrders,
   updateOrder
}