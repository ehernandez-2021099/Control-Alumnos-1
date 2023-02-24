const { request, response } = require('express');
const Curso = require('../models/curso');
const Curso = require('../models/usuario');

const getCursos = async (req = request, res = response) => {

     //Cursos del get
     const query = { estado: true };

     const listaCursos = await Promise.all([
         Curso.countDocuments(query),
         Curso.find(query)//.populate('usuario', 'nombre')
     ]);

     res.json({
         msg: 'get Api - Controlador Cursos',
         listaCursos
     });

}

const getCursoPorID = async (req = request, res = response) => {

    const { id } = req.params;
    const cursosById = await Curso.findById( id ).populate('usuario', 'nombre');
 
    res.status(201).json( cursosByIdById );
 
}
 

const postCurso = async (req = request, res = response) => {
    //toUpperCase para todo a Mayusculas
    const{...body}=req.body;
    const data = {
        ...body,
        usuario: req.usuario._id
    }
    const cursoDB = await Curso(data );

    //validacion para verificar si ya existe dicha categoria para que no lo agregue
    // if (categoriaDB) {
    //     return res.status(400).json({
    //         msg: `La categoria ${categoriaDB.nombre}, ya existe`
    //     });
    // }

    //Guardar en DB
    await cursoDB.save();

    res.status(201).json(cursoDB);
}

const putCurso = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;
    
    // resto.nombre = resto.nombre.toUpperCase();
    // resto.usuario = req.usuario._id;

    //Editar o actualiar la cateogira
    const cursoEditado = await Curso.findByIdAndUpdate(id, resto, { new: true });
    res.status(201).json(cursoEditado);

}

const deleteCurso = async (req = request, res = response) => {

    const { id } = req.params;
    // const cursoEliminar = await Curso.findByIdAndDelete

    //Editar o actualiar la cateogira: Estado FALSE
    const cursoBorrado = await Curso.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.status(201).json(cursoBorrado);

}


module.exports = {
    getCursos,
    getCursoPorID,
    postCurso,
    putCurso,
    deleteCurso
}
