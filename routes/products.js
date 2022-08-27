var express = require('express');
var router = express.Router();
const productsController = require("../controllers/productsController");


/* GET users listing. */
router.get('/', productsController.getAll);

router.get('/categorias', productsController.getCategorias);

router.get('/destacados', productsController.getDestacados);

router.get('/:id', productsController.getById);

router.post('/',(req,res,next)=>{req.app.veryfyToken(req,res,next)}, productsController.create);

router.put("/:id", productsController.update);

router.delete("/:id", productsController.delete )


module.exports = router;
