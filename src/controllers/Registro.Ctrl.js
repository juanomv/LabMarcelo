const connection = require("../config/database.config");
const  {  v4 : uuidv4  }  =  require ( 'uuid' ) ; 
async function GetRegistros(req, res) {
    
  try {
    const [rows, fields] = await (
      await connection
    ).query(`SELECT PE.*, P.Nombre, E.Nombre as ExaName FROM PacienteExamen as PE inner join Paciente as P on PE.Paciente= P.Cedula inner join Examen as E on PE.Examen = E.Id order by PE.Fecha ${req.params.Orden} ;`);

    res.json({
      ok: true,
      data: rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      error,
    });
  }
}

async function GetRegistro(req,res){
    const {Id}=req.params
    try {
        const [rows,flieds] = await(await connection).query('SELECT PE.*, P.Nombre FROM PacienteExamen as PE inner join Paciente as P on PE.Paciente= P.Cedula where PE.Id = ?',[Id])
        if(rows.length>0){
            res.json({
                ok:true,
                data:rows[0]
            })
        }else{
            res.json({
                ok:true,
                msg:`No Existe Registro con Id ${Id}`
            })
        }
    } catch (error) {
        res.json({
            ok:false,
            error
        })
    }
}

async function IntoRegistro(req,res){
    const Id= uuidv4();
    const {Paciente,Examen,Fecha,Url} = req.body;
    try {
        await(await connection).query('INSERT INTO PacienteExamen (Id,Paciente,Examen,Fecha,url) Values (?,?,?,?,?)',[Id,Paciente,Examen,Fecha,Url]);
        res.json({ok:true, msg:"Registro Guardado Correctamente"})
    } catch (error) {
        res.json({
            ok:false,
            error
        })
    }
}
async function UpdateRegistro(req,res){
    const {Id,Paciente,Examen,Fecha,Url} = req.body;
    try {
        await(await connection).query('UPDATE PacienteExamen SET Paciente=?, Examen=?, Fecha=?, url=? WHERE Id=?;',[Paciente,Examen,Fecha,Url,Id]);
        res.json({ok:true, msg:"Datos de Registro Modificado Correctamente"})
    } catch (error) {
        res.json({
            ok:false,
            error
        })
    }
}

async function DeleteRegistro(req,res){
    const {Id} = req.params;
    try {
        await(await connection).query('DELETE FROM PacienteExamen WHERE Id=?;',[Id]);
        res.json({ok:true, msg:"Registro Eliminado Correctamente"})
    } catch (error) {
        res.json({
            ok:false,
            error
        })
    }
}

async function getAll(req,res) {
    try {
        const [Paci] = await(await connection).query('SELECT * FROM Paciente;');
        let Paciente=[]
        let Examen=[]
        Paci.forEach((element) => {
            Paciente.push({value:element.Cedula,label:`${element.Cedula} - ${element.Nombre}`})
        });
        const [Exa] = await(await connection).query('SELECT Id,Nombre FROM Examen;');
        
        Exa.forEach((element) => {
            Examen.push({value:element.Id,label:element.Nombre})
        });
        res.json({
            ok:true,
            Paciente,
            Examen
        })
    } catch (error) {
        res.json({
            ok:false,
            error
        })
    }
}
module.exports = { GetRegistros,GetRegistro,IntoRegistro,UpdateRegistro,DeleteRegistro,getAll};
