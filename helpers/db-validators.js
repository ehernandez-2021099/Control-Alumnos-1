const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Profesor = require('../models/usuario')
const Alumno = require('../models/usuario')
// const Categoria = require('../models/');
// const Producto = require('../models/producto');

//Este archivo maneja validaciones personalizadas

const esRoleValidoP = async( rol = '' ) => {

    const existeRol = await Role.findOne( { rol } );

    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la DB`);
    }

}
const esRoleValidoA = async( rol = '' ) => {

    const existeRol = await Role.findOne( { rol } );

    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la DB`);
    }

}
/// PARA ALUMNOS
const emailExisteA = async( correo = '' ) => {

    //Verificamos si el correo ya existe en la DB
    const existeEmail = await Usuario.findOne( { correo } );

    //Si existe (es true) lanzamos excepción
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo } ya existe y esta registrado en la DB`);
    }

}
///PARA PROFESORES
const emailExisteP = async( correo = '' ) => {

    //Verificamos si el correo ya existe en la DB
    const existeEmail = await Usuario.findOne( { correo } );

    //Si existe (es true) lanzamos excepción
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo } ya existe y esta registrado en la DB`);
    }

}


const existeAlumnoPorId = async(id) => {

    //Verificar si el ID existe
    const existeAlumnoPorId = await Alumno.findById(id);

    if ( !existeAlumnoPorId ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}
const existeProfesorPorId = async(id) => {

    //Verificar si el ID existe
    const existeProfesorPorId = await Profesor.findById(id);

    if ( !existeProfesorPorId ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}

// const existeCategoriaPorId = async(id) => {

//     //Verificar si el ID existe
//     const existeCategoria = await Categoria.findById(id);

//     if ( !existeCategoria ) {
//         throw new Error(`El id ${ id } no existe en la DB`);
//     }

// }


// const existeProductoPorId = async(id) => {

//     //Verificar si el ID existe
//     const existeProducto = await Producto.findById(id);

//     if ( !existeProducto ) {
//         throw new Error(`El id ${ id } no existe en la DB`);
//     }

// }



module.exports = {
    esRoleValidoA,
    emailExisteA,
    emailExisteP,
    // existeUsuarioPorId,
    // existeCategoriaPorId,
    esRoleValidoP
}