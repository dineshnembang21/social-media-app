const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//to register the new user in the data base
module.exports.register = async (req, res) => {
    try {
        //generating hashed password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //save user and return respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

//to check credential and login 
module.exports.post_login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        !validPassword && res.status(400).json("Wrong password");

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};


