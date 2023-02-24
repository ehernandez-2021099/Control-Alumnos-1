const { Schema, model } = require('mongoose');


const CursoSchema = Schema({
    nombre: {
        type: String,
        required: [true , 'El nombre de la cateogira es obligatorio'],
        unique: true
    },
    descripcion:{
        type: String,
        require: true,

    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    capacidad: {
        type: String,
        required: true
    },
    alumnos: [{
        type:Schema.Types.ObjectId,
        ref: 'Usuarios'
        
    }]

});


module.exports = model('Curso', CursoSchema);