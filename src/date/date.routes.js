import { Router } from "express";
import { check } from "express-validator";
import { saveDate, getDates, searchDate, updateDate, deleteDate } from "./date.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check('email', 'Email invalid!').not().isEmpty(),
        check('id', 'Id invalid!').not().isEmpty(),
        validarCampos
    ],
    saveDate
)

router.get("/", getDates)

router.get(
    "/:id",
    [
        validarJWT,
        check("id", "ID invalid!").isMongoId(),
        validarCampos
    ],
    searchDate
)

router.put(
    "/:id",
    [
        check("id", "ID invalid!").isMongoId(),
        validarCampos
    ],
    updateDate
)

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "ID invalid!").isMongoId(),
        validarCampos
    ],
    deleteDate
)

export default router;