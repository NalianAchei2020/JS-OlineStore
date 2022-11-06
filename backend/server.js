
import express from 'express';
import data from './data.js';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config.js';
import UserRouter from './routers/userRouter.js';


mongoose.connect(config.MONGODB_URL).then(()=>{
    console.log('Connected to mongodb');
})
.catch((error)=>{
    console.log(error.reason);
});

const app = express();
app.use(cors());

app.use("/api/users", UserRouter);
app.get("/api/products", (req, res) => {
    res.send(data.products);
});

app.get("/api/products/:id", (req, res) =>{
    const Product = data.products.find((x) => x._id === req.params.id);
    if(Product){
        res.send(Product);
    }
    else{
      res.status(404).send({message: 'Product not found!'});
      
    }
    
});

app.listen(5000, () => {
    console.log('serve at http://localhost:5000');
});