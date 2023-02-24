const { response, request } = require('express');
const bcrypt = require('bcryptjs');
//Importación del modelo
const Alumno = require('../models/usuario');

const getAlumno = async (req = request, res = response) => {

    //condiciones del get
    const query = { estado: true };

    const listaAlumno = await Promise.all([
        Alumno.countDocuments(query),
        Alumno.find(query)
    ]);

    res.json({
        msg: 'get Api - Controlador de alumnos',
        listaAlumno
    });

}

const postAlumno = async (req = request, res = response) => {
    rol='ALUMNO_ROLE'
    //Desestructuración
    const { nombre, correo, password} = req.body;
    const alumnoGuardadoDB = new Alumno({ nombre, correo, password, rol });

    //Encriptar password
    const salt = bcrypt.genSaltSync();
    alumnoGuardadoDB.password = bcrypt.hashSync(password, salt);

    //Guardar en BD
    
    await alumnoGuardadoDB.save();

    res.json({
        msg: 'Post Api - Post Usuario',
        alumnoGuardadoDB
        
    });

}


const putAlumno = async (req = request, res = response) => {

    //Req.params sirve para traer parametros de las rutas
    
    const { id } = req.params;
    const { _id, img,  /* rol,*/  estado, google, ...resto } = req.body;
    //Los parametros img, rol, estado y google no se modifican, el resto de valores si (nombre, correo y password)

    //Si la password existe o viene en el req.body, la encripta
    if ( resto.password ) {
        //Encriptar password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    //Editar al usuario por el id
    const alumnoEditado = await Alumno.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT editar Alumno',
        
        alumnoEditado
    });

}

const deleteAlumno = async(req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;

    //Eliminar fisicamente de la DB
    //const usuarioEliminado = await Usuario.findByIdAndDelete( id);

    //Eliminar cambiando el estado a false
     const alumnoEliminado = await Alumno.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE eliminar alumno',
        alumnoEliminado
    });
}

module.exports = {
    getAlumno,
    postAlumno,
    putAlumno,
    deleteAlumno
}


// CONTROLADOR