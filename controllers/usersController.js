
const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports={
  
      create: async function(req, res, next){
        try{
            const user = new usersModel({
                nombre:req.body.nombre,
                email:req.body.email,
                password:req.body.password

            })
            const document = await user.save()
            console.log(req.body)
            res.status(201).json(document)
        }catch(error){
            console.log(error)
            next(error)
        }
      },
      
      login: async function(req, res, next){
        try{
          const user = await usersModel.findOne({email:req.body.email});
          if(!user){
            res.json({message:"Email incorrecto"});
            return
          }
          if(bcrypt.compareSync(req.body.password, user.password)){
            const token = jwt.sign({userId:user._id},req.app.get("secretKey"),{expiresIn:"1h"});
            res.status(201).json({token});
          }else{
            res.json({message:"Contraseña incorrecto"});
            return
          }
          
        }
        catch(error){
          console.log(error)
          next(error)
        }
      }

}