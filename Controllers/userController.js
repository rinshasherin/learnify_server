const users = require('../Models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.userRegistration = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            res.status(406).json("Invalid Inputs!!")
        }
        else {
            const existingUser = await users.findOne({ email })
            if (existingUser) {
                res.status(406).json("User Already Exists")
            }
            else {
                const encPassword = await bcrypt.hash(password, 10)
                const newUser = new users({
                    email, username, password: encPassword, profile: ''
                })
                await newUser.save()
                res.status(201).json("User Registration Successfull")
            }
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}


exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            const isMatch = await bcrypt.compare(password, existingUser.password)
            if (isMatch || password == existingUser.password) {
                const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET_KEY)
                res.status(200).json({ user: existingUser, username: existingUser.username, profile: existingUser.profile, token })
            }
            else {
                res.status(406).json("Invalid Password")
            }

        }
        else {
            res.status(406).json("Invalid Email Id")
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json("Inavlid Email")
    }
}


exports.userProfile = async (req, res) => {
    try {
        const userId = req.payload
        if (req.file) {
            var profile = req.file.filename
            var { username } = req.body
        }
        else {
            var { profile, username } = req.body
        }

        const result = await users.findByIdAndUpdate(userId, { username, profile })
        res.status(200).json("Updated!!")
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}


// admin

exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await users.find()
        res.status(200).json(allUsers)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}