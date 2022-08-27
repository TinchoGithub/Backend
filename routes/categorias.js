var express = require('express');
var router = express.Router();
const categoriasController = require("../controllers/categoriasController");


/* GET users listing. */
router.get('/', categoriasController.getAll);

router.post('/', categoriasController.create);

module.exports = router;
