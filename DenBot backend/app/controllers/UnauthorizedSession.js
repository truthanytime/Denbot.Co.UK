const express = require('express');
const { SessionModel } = require("../models");

export class UnAuthorizedSessionController {
  readOne = async (req, res) => {
    try {
      let { id } = req.params;
      let sessionNotes = await SessionModel.findById(id);
      res.send({ data: sessionNotes });
    } catch (err) {
      res.status(500).send({ err });
    }
  };
}
const sessionNotes = new UnAuthorizedSessionController();

let router = express.Router();
router.get("/details/:id", sessionNotes.readOne);
export default router;
