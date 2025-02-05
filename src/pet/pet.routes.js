import { Router } from "express";
import { check } from "express-validator";
import { savePet } from "./pet.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check('email', 'Email invalid!').not().isEmpty(),
        validarCampos
    ],
    savePet
)

export default router;