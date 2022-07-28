const {Router} =require('express');
const router = Router()

// Importando controladores
const {GetExamenes,IntoExamen,GetExamen,UpdateExamen,DeleteExamen} = require('../controllers/Examen.Ctrl')
const {verificarToken} = require('../mildelwares/auth')

router.get('/Gets',verificarToken,GetExamenes)
router.get('/Get/:Id',verificarToken,GetExamen)
router.post('/New',verificarToken,IntoExamen)
router.put('/Update',verificarToken,UpdateExamen)
router.delete('/Delete/:Id',verificarToken,DeleteExamen)
module.exports=router