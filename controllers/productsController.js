const productsModel = require("../models/productsModel");
const { find } = require("../models/productsModel");

module.exports={

    getAll: async function(req, res, next) {
        try{
          let queryFind={}
          if(req.query.buscar){
            queryFind = {nombre:{$regex:".*"+req.query.buscar+".*",$options:"i"}}
          }
          const products = await productsModel.find(queryFind);
          res.status(200).json(products)
        }
        catch(error){
          console.log(error)
        }
      },
      getDestacados:async function(req, res, next){
        try{
          const product = await productsModel.find({destacado:true})
          res.status(200).json(product)
        }catch(error){
          console.log(error)
        }
      },

      getCategorias:async function(req, res, next){
        try{
          const product = await productsModel.find(req.body.categoria)
          res.status(200).json(product)
        }catch(error){
          console.log(error)
        }
      },
      
      getById:async function(req, res, next){
        console.log(req.params.id)
        try{
          const product = await productsModel.findById(req.params.id)
          res.status(200).json(product)
        }catch(error){
          console.log(error)
        }
      },
      

      create: async function(req, res, next){
        try{
            const product = new productsModel({
                nombre:req.body.nombre,
                precio:req.body.precio,
                descripcion:req.body.descripcion,
                cantidad:req.body.cantidad,
                categoria:req.body.categoria,
                destacado:req.body.destacado
            })
            const document = await product.save()
            console.log(req.body)
            res.status(201).json(document)
        }catch(error){
            console.log(error)
            next(error)
        }
      },

      update:async function(req, res, next){
        console.log(req.body)
        try {
          const product = await productsModel.updateOne({_id:req.params.id},req.body)
          res.status(201).json(product)
        } catch (error) {
          console.log(error)
        }
      },

      delete: async function(req, res, next){
        console.log(req.params.id)
        try {
          const document = await productsModel.deleteOne({_id:req.params.id})
          res.status(201).json(document)
        } catch (error) {
          console.log(error)
        }
      }
}