const express = require('express');
const { UserModel } = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export class UserController {

    readMany = async (req, res) => {
        // if(req.user.type === "Administrator" || req.user.type === "BusinessUser" )
        try {
            let { filter, search, skip = 0, limit, planTypeFilter } = req.query
            const { type } = req.params;
            let query = {}, andQueries = [{}, {}]; // in case of no filter
            if (filter) {
                andQueries.push({ userStatus: filter });
            }
            if (search) {
                andQueries.push({
                    $or: [
                        { "email": { $regex: new RegExp(escapeRegExp(search), "i") } },
                        {
                            "$expr": {
                                "$regexMatch": {
                                    "input": { "$concat": ["$firstName", " ", "$lastName"] },
                                    "regex": '.*' + search + '.*',
                                    "options": "i"
                                }
                            }
                        },
                    ]
                });
            }
            if (planTypeFilter) {
                andQueries.push({
                    choosePlan: {
                        "$in": planTypeFilter.split(",")
                    }
                });
            }
            /*if(filter && search){
                query = {
                    $and: [
                        {
                            $or: [
                                {"email" : { $regex: new RegExp(escapeRegExp(search), "i")}},
                                {"$expr": {
                                    "$regexMatch": {
                                    "input": { "$concat": ["$firstName", " ", "$lastName"] },
                                    "regex":  '.*' + search + '.*',
                                    "options": "i"
                                    }
                                }
                                },
                            ]
                        }, {userStatus: filter}
                    ]
                }
            } else if(filter) {
                query = {userStatus: filter}
            } else if(search) {
                query = {
                    "$match":{
                        $or: [
                            {"email" : { $regex: new RegExp(escapeRegExp(search), "i")}},
                            {"$expr": {
                                    "$regexMatch": {
                                    "input": { "$concat": ["$firstName", " ", "$lastName"] },
                                    "regex":  '.*' + search + '.*',
                                    "options": "i"
                                    }
                                }
                            },
                        ]
                    }
                }
            } else {
                query = {}
            }
            */
            query = {
                $and: [...andQueries]
            };

            if (type === "Customer") {
                let users = await CustomerModel.find({ $and: [{ type: type }, query] }).populate('members').sort({ "createdAt": -1 }).skip(parseInt(skip)).limit(parseInt(limit)).lean();
                users = users.map(user => {
                    let membershipEndingSoonFlag = false
                    let membershipEndedFlag = false
                    if (user.members) {
                        user.members.forEach(member => {
                            if (member.memberShipEnd) {
                                const today = new Date();
                                const memberShipEnd = new Date(member.memberShipEnd);
                                const diffTime = memberShipEnd - today;
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                if (diffDays < 21) {
                                    membershipEndingSoonFlag = true
                                    if (diffDays <= 0) {
                                        membershipEndedFlag = true
                                    }
                                }
                            }
                        });
                    }
                    user.membershipEndingSoonFlag = membershipEndingSoonFlag
                    user.membershipEndedFlag = membershipEndedFlag
                    return user
                })
                const count = await UserModel.find({ $and: [{ type: type }, query] }).count()
                res.send({ data: users, count });
            } else {
                const count = await UserModel.find({ $and: [{ type: type }, query] }).count()
                const users = await UserModel.find({ $and: [{ type: type }, query] }).sort({ "createdAt": -1 }).skip(parseInt(skip)).limit(parseInt(limit));
                res.send({ data: users, count });
            }
        } catch (err) {
            res.status(500).send({ err });
        }
        // else {
        //     res.status(401).send({message: 'Unauthorized'});
        // }
    }

    readOne = async (req, res) => {
        const { _id } = req.params;
        try {
            if (_id) {
                let user = await UserModel.findById(_id)
                user = user.toJSON()
                if (user.type === 'Customer')
                    user = await CustomerModel.findById(_id).populate({ path: 'members', options: { sort: { 'createdAt': -1 } } });
                res.send(user);
            } else {
                res.status(401).send({ message: "please check the user" });
            }
        } catch (err) {
            let message = getErrorMsg(err)
            res.status(500).send({ message });
        }
    };

    create = async (req, res) => {
        let userData = req.body
        console.log(req.body);
        let user;
        const users = await UserModel.find({ email: { $regex: new RegExp(escapeRegExp(userData.email), "i") } });
        if (users.length) {
            res.status(400).send({ message: "Email id aleady exists" });
        } else {
            const hash = bcrypt.hashSync(req.body.password, saltRounds);
            userData.password = hash;
            user = new UserModel(userData);
            try {
                await user.save();
                user = user.toJSON()
                let data = user
                res.status(200).send({ data });
            } catch (err) {
                res.status(500).send({ err });
            }
        }
    };

    update = async (req, res) => {
        let userData = req.body
        let user;
        const currentUserData = await UserModel.findById(req.params.id);
        if (!currentUserData) {
            res.status(500).send({ message: "User doesn't exist" });
            return
        }
        try {
            user = await UserModel.findByIdAndUpdate(req.params.id, userData);
            res.send({ data: user });
        } catch (err) {
            res.status(500).send({ err });
        }
    };

    resetPassword = async (req, res) => {
        try {
            if (req.user.id) {
                let userData = await UserModel.find({ '_id': req.user.id })
                if (userData.length) {
                    const hash = bcrypt.hashSync(req.body.password, saltRounds);
                    let data = {
                        password: hash,
                    }
                    if (userData[0].userStatus === 'Awaiting')
                        data.userStatus = 'Active'
                    data.validated = true
                    let user = await UserModel.findByIdAndUpdate(req.user.id, data);
                    res.send({ data: user });
                } else {
                    res.status(400).send({ message: "No user found" });
                }
            } else {
                res.status(500).send({ message: "Invalid user" });
            }
        } catch (err) {
            const message = getErrorMsg(err)
            res.status(500).send(err);
        }
    }

    delete = async (req, res) => {
        try {
            let member = await UserModel.findById(req.params.id);
            if (!member) {
                return res.status(401).send({ message: "User doesn't exist" });
            }
            member = await UserModel.findOneAndRemove({ _id: req.params.id });
            res.send({ message: "User deleted Successfully" });
        } catch (err) {
            let message = getErrorMsg(err)
            res.status(500).send({ message });
        }
    }
}

const User = new UserController()

let router = express.Router();
router.patch('/resetPassword', User.resetPassword)
router.patch('/:id', User.update);
router.get('/all/:type', User.readMany);
router.get('/:_id', User.readOne);
router.delete('/:id', User.delete);
router.post('/', User.create);

export default router;