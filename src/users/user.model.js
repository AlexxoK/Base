import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name is required!"],
    },

    email: {
        type: String,
        required: [true, "The email is required!"],
        unique: true,
    },

    password: {
        type: String,
        required: [true, "The password is required!"],
    },

    img: {
        type: String,
    },

    phone: {
        type: String,
        minLenght: 8,
        maxLenght: 8,
        required: [true, "The phone is required!"],
    },

    role: {
        type: String,
        required: [true, "The role is required!"],
        enum: ["ADMIN_ROLE", "USER_ROLE"],
    },

    estado: {
        type: Boolean,
        default: true,
    },

    google: {
        type: Boolean,
        default: false,
    },
});

UserSchema.methods.toJSON = function () {
    const {_v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default mongoose.model('User', UserSchema);