const express=require('express');
const {urlencoded,json}=require('express');
const morgan=require('morgan');
const cors=require('cors') 
// importando mi dependencias
const connection= require('./config/database.config')
// importando rutas 
const Login = require('./routers/Login')
const Paciente = require('./routers/PacienteRoute')
const Examen = require('./routers/ExamenRoute')
const Registro = require('./routers/Registro.Route')
// express
const app=express()

// listaBlanca
const corsOptions ={
    //origin:'http://localhost:3000', 
    origin: ['https://marcelo-spinola-lb-caf68.web.app'],
    
}  
// mildelware
app.use(morgan('dev'));
app.use(urlencoded({extended: true}))

app.use(json())
app.use(cors());
  

// rutas

app.use('/auth',Login)
app.use('/Paciente',Paciente)
app.use('/Examen',Examen )
app.use('/Registro',Registro)
module.exports= app;