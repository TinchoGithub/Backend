const mongoose = require("../config/mongodb");
const errorMessage = require("../util/errorMessage")

// Creacion de schema -->

const productSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:[true,errorMessage.GENERAL.campo_obligatorio],
        minLength:[3,errorMessage.GENERAL.minlength],
        lowercase:true
    },
    precio:{
        type:Number,
        required:[true, errorMessage.GENERAL.campo_obligatorio],
        min:0,
        get: function(value){
            return value * 1.21
        },
        set: function(value){
            return value * 1.21
        }
    },
    codigo:{
        type:String,
        unique:true
    },
    descripcion:String,
    cantidad:{
        type:Number,
        required:[true, errorMessage.GENERAL.campo_obligatorio],
        minLength:[1,errorMessage.GENERAL.minlength]
    },
    categoria:{
        type: mongoose.Schema.ObjectId,
        ref:"categorias"
    },
    destacado:Boolean

})
productSchema.virtual("precio_simbolo").get(function(){
    return "$ "+this.precio
})
productSchema.set('toJSON',{getters:true,setters:true,virtual:true})
module.exports = mongoose.model("products", productSchema)