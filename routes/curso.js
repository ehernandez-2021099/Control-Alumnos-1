const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole, esAdminRole } = require('../middlewares/validar-roles');

//Controllers
const {getCursos, getCursoPorID, postCurso, putCurso, deleteCurso } = require('../controllers/curso');

const { existeProductoPorId } = require('../helpers/db-validators');

const router = Router();

//Manejo de rutas
//Obtener todas las productos - publico
router.get('/', getCursos );

//Obtener un producto por id - publico
router.get('/:id', 
// [
//     check('id', 'No es un id de Mongo Válido').isMongoId(),
//     check('id').custom( existeProductoPorId ),
//     validarCampos

// ],  
getCursoPorID);

// Crear producto - privada - cualquier persona con un token válido
router.post('/agregar', 
// [
//     validarJWT,
//     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
//     validarCampos
// ],
 postCurso);

// Actuaizar producto - privada - cualquier persona con un token válido
router.put('/editar/:id',
//  [
//     validarJWT,
//     check('id', 'No es un id de Mongo Válido').isMongoId(),
//     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
//     check('id').custom( existeProductoPorId ),
//     validarCampos
// ],
 putCurso);

//Borrar un producto - privado - Solo el admin puede eliminar una categoria (estado: false)
router.delete('/eliminar/:id',
//  [
//     validarJWT,
//     esAdminRole,
//     //tieneRole('ADMIN_ROLE', 'SUPER_ROLE'),
//     check('id', 'No es un id de Mongo Válido').isMongoId(),
//     check('id').custom( existeProductoPorId ),
//     validarCampos
// ],
 deleteCurso);



module.exports = router;