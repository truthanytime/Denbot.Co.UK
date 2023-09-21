const express = require('express');
const bcrypt = require('bcrypt');

import { generateAccessToken } from '../utils/auth'
const { UserModel } = require('../models');

function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export class AuthController {
    login = async (req, res) => {
        try {
            const users = await UserModel.find({ email: { $regex: new RegExp(escapeRegExp(req.body.email), "i") } }).select('+password');
            let user = users && users[0]
            if (!user) {
                res.status(404).send({ code: 'login/email-not-found', message: "Please check your email" });
            } else {
                if (user.password) {
                    if (!bcrypt.compareSync(req.body.password, user.password)) {
                        res.status(404).send({ code: 'login/password-not-match', message: "Password doesn't match" })
                    } else {
                        const token = await generateAccessToken({ email: user.email, name: user.name, id: user._id })
                        let data = user.toJSON()
                        data.token = token;
                        delete data.password;
                        res.send({ data });
                    }
                } else {
                    res.status(403).send({ code: 'login/user-not-active', message: "User not active" });
                }
            };
        } catch (err) {
            res.status(500).send(err);
        }
    }

    forgotPassword = async (req, res) => {
        try {
            let user = await UserModel.find({ email: { $regex: new RegExp(escapeRegExp(req.body.email), "i") } }).lean()
            if (user.length) {
                res.status(200).send({ message: "Check your mail to reset password" })
            } else {
                res.status(404).send({ message: "Email is not registered" })
            }
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
}

const Auth = new AuthController()

let router = express.Router();

router.post('/login', Auth.login)
router.post('/forgotPassword', Auth.forgotPassword)

export default router;
