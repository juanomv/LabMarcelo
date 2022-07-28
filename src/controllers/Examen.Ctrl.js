const connection = require("../config/database.config");

async function GetExamenes(req, res) {
  try {
    const [rows, fields] = await (
      await connection
    ).query("SELECT * FROM Examen;");

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

async function GetExamen(req,res){
    const {Id}=req.params
    try {
        const [rows,flieds] = await(await connection).query('SELECT * FROM Examen WHERE Id = ?',[Id])
        if(rows.length>0){
            res.json({
                ok:true,
                data:rows[0]
            })
        }else{
            res.json({
                ok:true,
                msg:`No Existe Examen con Id ${Id}`
            })
        }
    } catch (error) {
        res.json({
            ok:false,
            error
        })
    }
}

async function IntoExamen(req,res){
    const {Nombre,Descripcion} = req.body;
    
    try {
        await(await connection).query('INSERT INTO Examen (Nombre,Descripcion) Values (?,?)',[Nombre,Descripcion]);
        res.json({ok:true, msg:"Examen Registrado Correctamente"})
    } catch (error) {
        res.json({
            ok:false,
            error
        })
    }
}
async function UpdateExamen(req,res){
    const {Id,Nombre,Descripcion} = req.body;
    try {
        await(await connection).query('UPDATE Examen SET Nombre=? ,Descripcion=? WHERE Id=?;',[Nombre,Descripcion,Id]);
        res.json({ok:true, msg:"Datos de Paciente Modificado Correctamente"})
    } catch (error) {
        res.json({
            ok:false,
            error
        })
    }
}

async function DeleteExamen(req,res){
    const {Id} = req.params;
    try {
        await(await connection).query('DELETE FROM Examen WHERE Id=?;',[Id]);
        res.json({ok:true, msg:"Paciente Eliminado Correctamente"})
    } catch (error) {
        res.json({
            ok:false,
            error
        })
    }
}

module.exports = { GetExamenes,GetExamen,IntoExamen,UpdateExamen,DeleteExamen};
