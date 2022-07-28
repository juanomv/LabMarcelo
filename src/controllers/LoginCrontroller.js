
const firebaseApp= require('../config/firebase.config');
const jwt = require('jsonwebtoken')
const {getAuth,signInWithEmailAndPassword} = require('firebase/auth');
const jwtconfig = require('../config/jwt.config')
const auth=getAuth(firebaseApp);



function Login(req,res){
    const {email,password} = req.body;
    
    signInWithEmailAndPassword(auth,email,password).then(
        resp=>{
                const {uid,email} = resp.user
                let Token = jwt.sign({ email, uid }, jwtconfig.secret, {
                    expiresIn: jwtconfig.expires,
                  });
                res.status(200).json({
                    ok:true,
                    Token,
                    msg:'Usuario Authenticado correctamente'
                })
            
           }
    ).catch(err=>{
        if(err.code="auth/wrong-password"){ 
            res.status(200).json({
                ok:false,
                err,
                msg:'Usuario Authenticado incorrectamente'
            })
        }else if(err.code="auth/wrong-password"){
            res.status(200).json({
                ok:false,
                err,
                msg:'Usuario no existe'
            })
        }
        else{
        res.status(200).json({
            ok:false,
            err,
            msg:'Usuario Authenticado incorrectamente'
        })
        }
    })
    
}

module.exports = {Login}