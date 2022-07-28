const {Router} =require('express');
const router = Router()

// Importando Rutas
const {Login} = require('../controllers/LoginCrontroller');
const {verificarToken} = require('../mildelwares/auth')
router.post('/login',Login)
router.post('/pro',verificarToken)
module.exports=router