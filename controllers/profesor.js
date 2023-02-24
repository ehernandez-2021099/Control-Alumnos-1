const { response, request } = require('express');
const bcrypt = require('bcryptjs');
//Importación del modelo
const Profesor = require('../models/usuario');

const getProfesor = async (req = request, res = response) => {

    //condiciones del get
    const query = { estado: true };

    const listaProfesor = await Promise.all([
        Profesor.countDocuments(query),
        Profesor.find(query)
    ]);

    res.json({
        msg: 'get Api - Controlador de profesores',
        listaProfesor
    });

}

const postProfesor = async (req = request, res = response) => {
    rol='PROFESOR_ROLE';
    //Desestructuración
    const { nombre, correo, password } = req.body;
    const profesorGuardadoDB = new Profesor({ nombre, correo, password, rol });

    //Encriptar password
    const salt = bcrypt.genSaltSync();
    profesorGuardadoDB.password = bcrypt.hashSync(password, salt);

    //Guardar en BD
    await profesorGuardadoDB.save();

    res.json({
        msg: 'Post Api - Post profesor',
        profesorGuardadoDB
    });

}


const putProfesor = async (req = request, res = response) => {

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
    const profesorEditado = await Profesor.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT editar Maestro',
        profesorEditado
    });

}

const deleteProfesor= async(req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;

    //Eliminar fisicamente de la DB
    //const usuarioEliminado = await Usuario.findByIdAndDelete( id);

    //Eliminar cambiando el estado a false
     const profesorEliminado = await Profesor.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE eliminar profesor',
        profesorEliminado
    });
}

module.exports = {
    getProfesor,
    postProfesor,
    putProfesor,
    deleteProfesor
}


// CONTROLADOR