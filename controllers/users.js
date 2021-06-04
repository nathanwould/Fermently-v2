const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const db = require('../db/connection');

db.on('error', console.error.bind(console, 'Database connection error:'));

const SALT_ROUNDS = 11;
const TOKEN_KEY = process.env.TOKEN_KEY || 'areallygreatlongkey';

const signUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const password_digest = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({
      email,
      password_digest,
      firstName,
      lastName
    });
    console.log(user);

    await user.save();

    const payload = {
      email: user.email,
      firstName: user.firstName
    };

    const token = jwt.sign(payload, TOKEN_KEY);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password, firstName } = req.body;
    const user = await User.findOne({ email: email });

    if (await bcrypt.compare(password, user.password_digest)) {
      const payload = {
        email: user.email,
        firstName: user.firstName,
        userID: user._id
      };
      const token = jwt.sign(payload, TOKEN_KEY);
      res.status(201).json({ token });
    } else {
      res.status(401).send("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verify = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, TOKEN_KEY);
    if (payload) {
      res.json(payload);
    }
  } catch (e) {
    res.status(401).send("Not Authorized");
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('userProjects');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('userProjects');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
  verify,
  getUsers,
  getUser
};