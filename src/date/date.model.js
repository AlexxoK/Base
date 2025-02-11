import { Schema, model } from "mongoose";

const DateSchema = Schema({
    date: {
        type: String,
        required: true
    },

    place: {
        type: String,
        required: true
    },

    keeper: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    pet: {
        type: Schema.Types.ObjectId,
        ref: 'pet',
        required: true
    },

    status: {
        type: Boolean,
        default: true
    }
},

    {
        timestamps: true,
        versionKey: false
    }

)

export default model('Date', DateSchema);