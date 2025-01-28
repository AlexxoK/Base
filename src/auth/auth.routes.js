import { Router } from 'express';
import { check } from 'express-validator';
import { login, register } from './auth.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { existenteEmail, esRoleValido } from '../helpers/db-validator.js';

const router = Router();

router.post(
    '/login',
    [
        check('email', 'Email not valid!').isEmail(),
        check('password', 'Password is required!').not().isEmpty(),
        validarCampos,
    ],
    login
);

router.post(
    '/register',
    [
        check('name', 'Name is required!').not().isEmpty(),
        check('password', 'The password must be longer than 6 characters!').isLength({ min: 6 }),
        check('email', 'Email not valid!').isEmail(),
        check('email').custom(existenteEmail),
        check('role').custom(esRoleValido),
        check('phone', 'The number must be longer than 6 characters!').isLength({ min: 8, max: 8 }),
        validarCampos,
    ],
    register
);

export default router;