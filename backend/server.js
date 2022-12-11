
import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config.js';
import UserRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js'
import uploadRouter from './routers/uploadRouter.js';
import productRouter from './routers/productRouter.js';

const __dirname = path.resolve();
mongoose.connect(config.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Connected to mongodb');
})
.catch((error)=>{
    console.log(error.reason);
});

const app = express();
app.use(cors());

app.use(bodyParser.json())
app.use('/api/uploads', uploadRouter);
app.use("/api/users", UserRouter);
app.use('/api/products', productRouter);
app.use("/api/orders", orderRouter);
app.get("api/paypal/clientId", (req, res)=>{
    res.send({clientId: config.PAYPAL_CLIENT_ID});
})

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../JS OlineStore/frontend/public/index.html'));
});

/*app.get("/api/products", (req, res) => {
    res.send(data.products);
});)

app.get("/api/products/:id", (req, res) =>{
    const Product = data.products.find((x) => x._id === req.params.id);
    if(Product){
        res.send(Product);
    }
    else{
      res.status(404).send({message: 'Product not found!'});
      
    }
    
});
*/
app.use((err, res, next)=>{
  const status = err.name && err.name === 'ValidationError'? 400: 500;
  res.status(status).send(err.message);
})
app.listen(5000, () => {
    console.log('serve at http://localhost:5000');
});