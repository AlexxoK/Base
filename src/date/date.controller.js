import User from "../users/user.model.js";
import Pet from "../pet/pet.model.js";
import Date from "../date/date.model.js";

export const saveDate = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({ email: data.email });
        const pet = await Pet.findOne({ name: data.name });

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

export const getDates = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { status: true };

    try {
        const dates = await Date.find(query)
            .skip(Number(desde))
            .limit(Number(limite));

        const datesWithOwnerNames = await Promise.all(dates.map(async (date) => {

            return {
                ...date.toObject()
            };
        }));

        const total = await Date.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            dates: datesWithOwnerNames
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error getting dates!',
            error
        });
    }
}

export const searchDate = async (req, res) => {
    const { id } = req.params;

    try {
        const date = await Date.findById(id);

        if (!date) {
            return res.status(404).json({
                success: false,
                message: 'Date dont found!'
            })
        }

        res.status(200).json({
            success: true,
            date: {
                ...date.toObject()
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error searching date!',
            error
        })
    }
}

export const updateDate = async (req, res = response) => {
    try {
        
        const { id } = req.params;
        const data = req.body;

        const date = await Date.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Date update!',
            date
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error update!',
            error
        })
    }
}

export const deleteDate = async (req, res) => {
    
    const { id } = req.params;

    try {

        await Date.findByIdAndUpdate(id, { status: false });

        res.status(200).json({
            success: true,
            message: 'Date delete success!'
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting date!',
            error
        })
    }
}