import bcryptjs from 'bcryptjs';
import Usuario from '../users/user.model.js';
import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    
    const { email, password } = req.body;

    try {
        
        const usuario = await Usuario.findOne({email});

        if (!usuario) {
            return res.status(400).json({
                msg: 'Incorrect credentials - email does not exist in the database!'
            })
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'User does not exist in the database!'
            })
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'The password is incorrect!'
            })
        }

        const token = await generarJWT( usuario.id );

        return res.status(200).json({
            msg: 'Login OK!',
            usuario,
            token
        })

    } catch (e) {
        console.log(e);
        req.status(500).json({
            msg: "Contact with Admin!"
        })
    }
}

export const register = async (req, res) => {

    const { name, email, password, role, phone } = req.body;
    const user = new Usuario({ name, email, password, role, phone });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    
    await user.save();

    res.status(200).json({
        user,
    });
}