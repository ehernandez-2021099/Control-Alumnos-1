const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole, esAdminRole } = require('../middlewares/validar-roles');

//Controllers
const {  getAlumno,  postAlumno, putAlumno, deleteAlumno } = require('../controllers/alumno');

const { existeProductoPorId, emailExisteA } = require('../helpers/db-validators');

const router = Router();

//Manejo de rutas
//Obtener todas las productos - publico
router.get('/mostrar', getAlumno );

//Obtener un alumno por id - publico
// router.get('/:id', 
// // [
// //     check('id', 'No es un id de Mongo Válido').isMongoId(),
// //     check('id').custom( existeProductoPorId ),
// //     validarCampos

// // ],  
// getCursoPorID);

// Crear producto - privada - cualquier persona con un token válido
router.post('/agregar',
[
    // validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExisteA),
    validarCampos
],
postAlumno);

// Actuaizar producto - privada - cualquier persona con un token válido
router.put('/editar/:id',
[
    validarJWT,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    //check('id').custom( existeProfesorPorId ),
    validarCampos
],
 putAlumno);

//Borrar un producto - privado - Solo el admin puede eliminar una categoria (estado: false)
router.delete('/eliminar/:id',
[
    validarJWT,
    //esAdminRole,
    tieneRole('PROFESOR_ROLE'),
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    //check('id').custom( existeProfesorPorId ),
     validarCampos
],
 deleteAlumno   );



module.exports = router;