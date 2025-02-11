import User from "../users/user.model.js";
import Pet from "../pet/pet.model.js";
import Date from "../date/date.model.js";

export const saveDate = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({ email: data.email });
        const pet = await Pet.findOne({ name: data._id });

        if (!user || !pet) {
            return res.status(404).json({
                success: false,
                message: 'Owner or Pet dont found!'
            })
        }

        const date = new Date({
            ...data,
            keeper: user._id,
            pet: pet._id
        });

        await date.save();

        res.status(200).json({
            success: true,
            date
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error saving date!',
            error
        })
    }
}