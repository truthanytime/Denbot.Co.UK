const express = require('express');
const { AdminModel } = require('../models');

export class AdminController {

    getZapierUrl = async (req, res) => {
        const zapierData = await AdminModel.findOne();
        if (!zapierData) {
            res.status(400).send({ message: "Didn't exist data" });
        } else {
            try {
                res.status(200).send(zapierData);
            } catch (err) {
                res.status(500).send({ err });
            }
        }
    };

    setZapierUrl = async (req, res) => {
        let zapierData = req.body
        const currentZapierData = await AdminModel.findOne();
        if (currentZapierData) {
            const zapier = await AdminModel.findByIdAndUpdate(currentZapierData._id, zapierData);
            res.status(200).send(zapier);
        } else {
            try {
                const zapier = new AdminModel(zapierData);
                const updatedData = await zapier.save();
                res.status(200).send(updatedData);
            } catch (err) {
                res.status(500).send({ err });
            }
        }
    };

}

const Admin = new AdminController()

let router = express.Router();
router.get('/getZapierUrl', Admin.getZapierUrl);
router.post('/setZapierUrl', Admin.setZapierUrl);

export default router;