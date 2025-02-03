import { Router } from 'express';
import { login, register } from './auth.controller.js';
import { registerValidator, loginValidator } from '../middlewares/validator.js';
import { uploadProfilePicture } from "../middlewares/multer-upload.js";
import { deleteFileOnError  } from '../middlewares/delete-file-on-error.js';

const router = Router();

router.post(
    '/login',
    loginValidator,
    deleteFileOnError,
    login
);

router.post(
    '/register',
    uploadProfilePicture.single("profilePicture"),
    registerValidator,
    deleteFileOnError,
    register
);

export default router;