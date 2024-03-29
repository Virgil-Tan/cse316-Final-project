const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

getLoggedIn = async (req, res) => {
    auth.verify(req, res, async function () {
        const loggedInUser = await User.findOne({ _id: req.userId });
        const token = auth.signToken(loggedInUser);
        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            loggedIn: true,
            user: {
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                email: loggedInUser.email
            }
        }).send();
    })
}

logoutUser = async (req, res) => {
    auth.verify(req, res, async function () {
        //const loggedInUser = await User.findOne({ _id: req.userId });
        await res.cookie().status(200).json().send();
    })
}

loginUser =  async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(202)
                .json({ errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            return res
                .status(202)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res
                .status(202)
                .json({
                    success: false,
                    errorMessage: "An account with this email address did not exists."
                })
        }

        if (!bcrypt.compareSync(password,existingUser.passwordHash)) {
            return res
                .status(202)
                .json({
                    errorMessage: " Please enter the correct password "
                })
        }

        // LOGIN THE USER
        const token = auth.signToken(existingUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, passwordVerify } = req.body;
        if (!firstName || !lastName || !email || !password || !passwordVerify) {
            return res
                .status(202)
                .json({ errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            return res
                .status(202)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        if (password !== passwordVerify) {
            return res
                .status(202)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res
                .status(202)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, lastName, email, passwordHash
        });
        const savedUser = await newUser.save();

        // LOGIN THE USER
        // const token = auth.signToken(savedUser);

        await res.status(200).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

guess =  async (req, res) => {
    auth.verify(req, res, async function () {
        await res.cookie().status(200).json().send();
    })
}

module.exports = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    guess
}