const User = require("../models/user.model.js");
const bcrypt = require('bcrypt');

const getUser = async (req, res) => {
    try {
        var search = await User.find({})
        res.status(200).json(search)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createAccount = async (req, res) => {
    try {
        var nameX = req.body.username;
        var search = await User.find({name: nameX})
        var userPassword = req.body.password;
        const hash = bcrypt.hashSync(userPassword, 10);
        if (search.length > 0) {
            res.status(500).json({message: 'username have already been used.'})
        } else {
            const makeAccount = await User.create({name: req.body.username, password: hash, email: req.body.email, admin: req.body.admin});
            res.status(200).json({success: 'true', message: 'true', data: makeAccount})
        }
    } catch (error) {
        res.status(500).json({success: 'false', message: error.message})
    }
}

const loginProfile = async (req, res) => {
    try {
        var nameX = req.body.username
        var passX = req.body.password
        var search = await User.find({name: nameX})
        var hashedPassword = search[0].password
        var passwordTrue = bcrypt.compareSync(passX, hashedPassword);
        if (search.length > 0 && passwordTrue) {
            if (search.length > 0) {
                res.status(200).json({success: 'true', message: `Successfully logged in as @${search.name}`, data: search[0]})
            } else {
                res.status(500).json({message: 'username/password may be incorrect.'})
            }
        } else {
            res.status(500).json({message: 'username/password may be incorrect.'})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const accountProfileId = async (req, res) => {
    try {
        const { id } = req.params;
        const profileAccount = await User.findById(id);
        res.status(200).json({success: 'true', message: 'true', data: profileAccount})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const accountUpdateProfileId = async (req, res) => {
    try {
        const { id } = req.params;
        const userPassword = req.body.password;
        const hash = bcrypt.hashSync(userPassword, 10);
        const profileAccount = await User.findByIdAndUpdate(id, {name: req.body.name, password: hash});
        if (!profileAccount) {
            return res.status(404).json({message: "User not found"})
        }
        const profileAccountUpdate = await User.findById(id);
        res.status(200).json({success: 'true', message: 'true', data: profileAccountUpdate})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteProfileId = async (req, res) => {
    try {
        const { id } = req.params;
        const profileAccountDelete = await User.findByIdAndDelete(id);
        if (!profileAccountDelete) {
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json({success: 'true', message: "User Deleted successfully!", data: profileAccountDelete})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getUser, 
    createAccount, 
    loginProfile, 
    accountProfileId, 
    accountUpdateProfileId, 
    deleteProfileId
}