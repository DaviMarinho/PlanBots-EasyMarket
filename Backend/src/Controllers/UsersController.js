const User = require('../Models/UserSchema');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const {
        userName, email, phone, pass, storeID, rating, cpf,
    } = req.body;

    const validFields = validation.validateUser(
        userName, email, phone, pass, storeID, rating, cpf,
    );

    if (validFields.length) {
        return res.status(400).json({ status: validFields });
    }

    var salt = bcrypt.genSaltSync(10);
    var finalPass = bcrypt.hashSync(pass, salt);

    try {
        const user = await User.create({
            userName, 
            email, 
            phone, 
            finalPass, 
            storeID, 
            rating, 
            cpf,
        });
        return res.json(user);
    } catch (error) {
        return res.status(400).json({ duplicated: error.keyValue });
    }
}

const editUser = async (req, res) => {
}


const deleteUser = async (req, res) => {
}

module.exports = {
    createUser, editUser, deleteUser,
};