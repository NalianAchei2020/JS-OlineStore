import express from 'express';
import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import { generateToken, isAuth } from '../Utils.js';


const UserRouter = express.Router();

UserRouter.get("/createadmin", expressAsyncHandler(async(req, res) =>{
    try{
 const user = new User({
    name: "admin",
    email: 'admin@example.com',
    password: '12345',
    isAdmin: true,

 });
 const createUser = await user.save();
 res.send(createUser);
    } catch(err){
res.status(500).send({message:err.message});
    }
})
);
UserRouter.post('/signin', expressAsyncHandler(async(req, res)=>{
 const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password
 });
 if(!signinUser ){
    res.status(401).send({
        message: 'Invalid Email or Password',
    })
 } else{
   res.send({
      _id:signinUser._id,
      name:signinUser.name,
      email:signinUser.email,
      isAdmin:signinUser.isAdmin,
      token:generateToken(signinUser),
   })
 }
})
);


UserRouter.post('/register', expressAsyncHandler(async(req, res)=>{
   const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
   });
   const createUser = await user.save();
   if(!createUser ){
      res.status(401).send({
          message: 'Invalid User Data',
      })
   } else{
     res.send({
        _id:createUser._id,
        name:createUser.name,
        email:createUser.email,
        isAdmin:createUser.isAdmin,
        token:generateToken(createUser),
     })
   }
  })
  );

  UserRouter.put('/:id',isAuth, expressAsyncHandler(async(req, res)=>{
   const user = await User.findById(req.params.id);
   if(!user ){
      res.status(401).send({
          message: 'User Not Found',
      })
   } else{
      user.name =  req.body.name || user.name;
      user.email =  req.body.email || user.email;
      user.password =  req.body.password || user.password;
      const updateUser = await user.save();
     res.send({
        _id:updateUser._id,
        name:updateUser.name,
        email:updateUser.email,
        isAdmin:updateUser.isAdmin,
        token:generateToken(updateUser),
     })
   }
  })
  );

export default UserRouter;