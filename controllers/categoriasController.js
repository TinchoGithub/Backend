const categoriasModel = require("../models/categoriasModel")

module.exports={

    getAll: async function(req, res, next) {
        try{
          const categorias = await categoriasModel.find()
          res.json(categorias)
        }
        catch(error){
          console.log(error)
        }
      },

      create: async function(req, res, next){
        try{
            console.log(req.body)
            console.log(req.body.nombre)
            
            const document = new categoriasModel({
              nombre:req.body.nombre
            })
            const response = await document.save()
            res.json(response)
        }catch(error){
            next(error)
        }
      },  
}