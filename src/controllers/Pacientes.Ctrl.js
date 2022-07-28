const { async } = require("@firebase/util");
const connection = require("../config/database.config");

async function GetPacicentes(req, res) {
  try {
    const [rows, fields] = await (
      await connection
    ).query("SELECT * FROM Paciente;");

    res.json({
      ok: true,
      data: rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      error,
      msg:'desde el ctrl'
    });
  }
}

async function GetPaciente(req,res){
    const {Cedula}=req.params
    console.log(Cedula)
    try {
        const [rows,flieds] = await(await connection).query('SELECT * FROM Paciente WHERE Cedula = ?',[Cedula])
        if(rows.length>0){
            res.json({
                ok:true,
                data:rows[0]
            })
        }else{
            res.json({
                ok:true,
                msg:'No Existe paciente con cedula',Cedula
            })
        }
    } catch (error) {
        res.json({
            ok:false,
            error
        })
    }
}

async function IntoPaciente(req,res){
    const {Cedula,Nombre} = req.body;
    try {
        await(await connection).query('INSERT INTO Paciente (Cedula,Nombre) Values (?,?)',[Cedula,Nombre]);
        res.json({ok:true, msg:"Paciente Registrado Correctamente"})
    } catch (error) {
        if(error.code==="ER_DUP_ENTRY")res.json({ok:false, msg:`Ya existe un paciente con esta cedula`})
        else res.json({
            ok:false,
            error
        })
    }
}
async function UpdatePaciente(req,res){
    const {Cedula,Nombre} = req.body;
    try {
        await(await connection).query('UPDATE Paciente SET Nombre=? WHERE Cedula=?;',[Nombre,Cedula]);
        res.json({ok:true, msg:"Datos de Paciente Modificado Correctamente"})
    } catch (error) {
        res.json({
            ok:false,
            error
        })
    }
}

async function DeletePaciente(req,res){
    const {Cedula} = req.params;
    try {
        await(await connection).query('DELETE FROM Paciente WHERE Cedula=?;',[Cedula]);
        res.json({ok:true, msg:"Paciente Eliminado Correctamente"})
    } catch (error) {
        res.json({
            ok:false,
            error
        })
    }
}

module.exports = { GetPacicentes,GetPaciente,IntoPaciente,UpdatePaciente,DeletePaciente};
