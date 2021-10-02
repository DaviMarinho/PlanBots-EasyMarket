const User = require('../Models/UserSchema');
const bcrypt = require('bcrypt');
const validate = require('../Utils/validate');

const createUser = async (req, res) => {
  const {
    username, email, phone, pass, cpf,
  } = req.body;

  const invalidValues = validate.validateValues(username, email, phone, pass, cpf);

  if (invalidValues.length) {
    return res.status(400).json({ 'invalid values': invalidValues });
  }

  var salt = bcrypt.genSaltSync(10);
  var cryptedPassword = bcrypt.hashSync(pass, salt);

  try {
    const user = await User.create({
      username,
      email,
      phone,
      cryptedPassword,
      storeID: '',
      rating: 0,
      cpf,
    });
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ duplicated: error.keyValue });
  }
}

const editUser = async (req, res) => {
  const { id } = req.params;
  const {
    username, email, phone, pass, cpf,
  } = req.body;

  const invalidValues = validate.validateValues(username, email, phone, pass, cpf);

  if (invalidValues.length) {
    return res.status(400).json({ 'invalid values': invalidValues });
  }

  var salt = bcrypt.genSaltSync(10);
  var cryptedPassword = bcrypt.hashSync(pass, salt);

  try {
    const updatedUser = await User.findOneAndUpdate({ _id: id }, {
      username,
      email,
      phone,
      cryptedPassword,
      cpf,
    }, { new: true });
    return res.json(updatedUser);
  } catch (err) {
    return res.json(err);
  };
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findOneAndDelete({ _id: id });
    return res.json(deletedUser);
  } catch (err) {
    return res.json(err);
  };
};

module.exports = {
  createUser, editUser, deleteUser,
};