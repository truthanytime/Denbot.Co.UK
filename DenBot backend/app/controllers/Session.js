const mongoose = require('mongoose');
const express = require('express');
const { SessionModel } = require("../models");

export class SessionController {
  readOne = async (req, res) => {
    try {
      let { id } = req.params;
      let sessionNotes = await SessionModel.findById(id);
      res.send({ data: sessionNotes });
    } catch (err) {
      res.status(500).send({ err });
    }
  };

  readMany = async (req, res) => {
    try {
      let sessionNotes = await SessionModel.find({ createdBy: req.user.id });
      res.send({ data: sessionNotes });
      console.log(sessionNotes);
    } catch (error) {
      res.status(500).send({ error });
    }
  };

  create = async (req, res) => {
    let sessionData = req.body;
    console.log(sessionData);
    try {
      let sessionNotes = new SessionModel(sessionData);
      sessionNotes.createdBy = req.user.id;
      await sessionNotes.save();
      res.send({ data: sessionNotes });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: "Something went wrong. Please try again",
      });
    }
  };

  update = async (req, res) => {
    let sessionData = req.body;
    try {
      let sessionNotes = await SessionModel.findByIdAndUpdate(req.params.id, sessionData);
      console.log('Updated Session: ', sessionNotes);
      res.send({ data: sessionNotes });
    } catch (err) {
      res.status(500).send({ err });
    }
  };

  delete = async (req, res) => {
    try {
      let sessionNotes = await SessionModel.findById(req.params.id);
      if (!sessionNotes) {
        return res
          .status(401)
          .send({ message: "Session Notes doesn't exist" });
      }
      sessionNotes = await SessionModel.deleteOne({_id: req.params.id});
      res.send({ message: "Session Notes deleted Successfully" });
    } catch (err) {
      res.status(500).send({ err });
    }
  };
}
const sessionNotes = new SessionController();

let router = express.Router();
router.patch("/:id", sessionNotes.update);
router.get("/details/:id", sessionNotes.readOne);
router.get("/", sessionNotes.readMany);
router.post("/", sessionNotes.create);
router.delete("/:id", sessionNotes.delete);

export default router;
