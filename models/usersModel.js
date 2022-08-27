const mongoose = require("../config/mongodb");
const errorMessage = require("../util/errorMessage");
const validators = require("../util/validators");
const bcrypt = require("bcrypt");

// Creacion de schema -->

const userSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:[true,errorMessage.GENERAL.campo_obligatorio]
    },
    email:{
        type:String,
        required:[true, errorMessage.GENERAL.campo_obligatorio],
        unique:true
    },
    password:{
        type: String,
        validate:{
            validator:function(value){
                return validators.isGoodPassword(value)
            },
            message:errorMessage.USERS.passwordIncorrecto
        }
    }
})
userSchema.pre("save", function(next){
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})

module.exports = mongoose.model("users", userSchema);