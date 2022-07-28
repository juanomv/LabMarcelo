const {Router} =require('express');
const router = Router()

// Importando controladores
const {GetRegistros,IntoRegistro,GetRegistro,UpdateRegistro,DeleteRegistro,getAll} = require('../controllers/Registro.Ctrl')
const {verificarToken} = require('../mildelwares/auth')

router.get('/Gets/:Orden',verificarToken,GetRegistros)
router.get('/Get/:Id',verificarToken,GetRegistro)
router.get('/GetAll',verificarToken,getAll)
router.post('/New',verificarToken,IntoRegistro)
router.put('/Update',verificarToken,UpdateRegistro)
router.delete('/Delete/:Id',verificarToken,DeleteRegistro)
module.exports=router