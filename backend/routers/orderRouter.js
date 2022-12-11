import express from "express"
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth, isAdmin } from "../Utils.js";
import Product from '../models/productModel.js';
import User from "../models/userModel.js";



const orderRouter = express.Router();
orderRouter.get(
    '/summary',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const orders = await Order.aggregate([
        {
          $group: {
            _id: null,
            numOrders: { $sum: 1 },
            totalSales: { $sum: '$totalPrice' },
          },
        },
      ]);
      const users = await User.aggregate([
        {
          $group: {
            _id: null,
            numUsers: { $sum: 1 },
          },
        },
      ]);
      const dailyOrders = await Order.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            orders: { $sum: 1 },
            sales: { $sum: '$totalPrice' },
          },
        },
      ]);
      const productCategories = await Product.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
      ]);
      res.send({
        users,
        orders: orders.length === 0 ? [{ numOrders: 0, totalSales: 0 }] : orders,
        dailyOrders,
        productCategories,
      });
    })
  );
  orderRouter.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const orders = await Order.find({}).populate('user');
      res.send(orders);
    })
  );
  
  orderRouter.get(
    '/mine',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const orders = await Order.find({ user: req.user._id });
      res.send(orders);
    })
  );
orderRouter.get('/:id', 
isAuth, 
expressAsyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }
    else{
        res.status(404).send({message: 'Order Not Found'});
    }
})
);
orderRouter.post(
    '/', 
isAuth,  
expressAsyncHandler(async(req, res)=>{
    const order = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shipping:req.body.shipping,
        payment:req.body.payment,
        itemPrice:req.body.itemPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice:req.body.shippingPrice,
        totalPrice:req.body.totalPrice,
    });
    const createOrder = await order.save();
    res.status(201).send({message: 'New Order Created', order:createOrder});

})
);
orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async(res, req)=>{
const order = await Order.findById(req.params.id);
if(order){
    order.isPaid = true;
    order.paidAt =  Date.now();
    order.payment.paymentResult = {
        payerId: req.body.payerId,
        paymentId: req.body.paymentId,
        orderId: req.body.orderId,
    };
    const updateOrder = await order.save();
    res.send({message: 'Order Paid', order:updateOrder});
}
else{
   res.status(404).send({message: 'Order Not Found'}) 
}
}));
orderRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        const deletedOrder = await order.remove();
        res.send({ message: 'Order Deleted', product: deletedOrder });
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );
  
  orderRouter.put(
    '/:id/pay',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.payment.paymentResult = {
          payerID: req.body.payerID,
          paymentID: req.body.paymentID,
          orderID: req.body.orderID,
        };
        const updatedOrder = await order.save();
        res.send({ message: 'Order Paid', order: updatedOrder });
      } else {
        res.status(404).send({ message: 'Order Not Found.' });
      }
    })
  );
  
  orderRouter.put(
    '/:id/deliver',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.send({ message: 'Order Delivered', order: updatedOrder });
      } else {
        res.status(404).send({ message: 'Order Not Found.' });
      }
    })
  );
  

export default orderRouter;