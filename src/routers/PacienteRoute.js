const {Router} =require('express');
const router = Router()

// Importando controladores
const {GetPacicentes,IntoPaciente,GetPaciente,UpdatePaciente,DeletePaciente} = require('../controllers/Pacientes.Ctrl')
const {verificarToken} = require('../mildelwares/auth')

router.get('/Gets',verificarToken,GetPacicentes)
router.get('/Get/:Cedula',verificarToken,GetPaciente)
router.post('/New',verificarToken,IntoPaciente)
router.put('/Update',verificarToken,UpdatePaciente)
router.delete('/Delete/:Cedula',verificarToken,DeletePaciente)
module.exports=router