const User = require('../Models/UserSchema');
const bcrypt = require('bcrypt');
const validate = require('../Utils/validate');

const getUserList = async (req, res) => {
  return res.json(await User.find());
};

const createUser = async (req, res) => {
  const {
    email, phone, password, cpf,
  } = req.body;

  const invalidValues = validate.validateValues(email, phone, password, cpf);

  if (invalidValues.length) {
    return res.status(400).json({ 'invalid values': invalidValues });
  }

  var salt = bcrypt.genSaltSync(10);
  var cryptedPassword = bcrypt.hashSync(password, salt);

  try {
    const user = await User.create({
      email,
      phone,
      pass: cryptedPassword,
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
    email, cpf, phone, pass,
  } = req.body;

  const invalidValues = validate.validateValues(email, phone, pass, cpf);

  if (invalidValues.length) {
    return res.status(400).json({ 'invalid values': invalidValues });
  }

  if (pass) {
    var salt = bcrypt.genSaltSync(10);
    var cryptedPassword = bcrypt.hashSync(pass, salt);
  }

  try {
    const updatedUser = await User.findOneAndUpdate({ _id: id }, {
      email,
      phone,
      pass: cryptedPassword,
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user == null) {
    return res.json({ message: "user not found" });
  }

  if (await bcrypt.compare(password, user.pass)) {
    return res.json(user);
  }

  return res.json({ message: "wrong password" });
}

module.exports = {
  getUserList, createUser, editUser, deleteUser, loginUser,
};