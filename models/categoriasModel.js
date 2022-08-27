const mongoose = require("../config/mongodb");

// Creacion de schema -->

const categoriaSchema = mongoose.Schema({
    nombre:String
});
module.exports = mongoose.model("categorias", categoriaSchema)