const express = require("express");
const meetingsRouter = express.Router();

const {
  addToDatabase,
  getAllFromDatabase,
  createMeeting,
  deleteAllFromDatabase,
} = require("./db");

meetingsRouter.get("/", (req, res) => {
  res.send(getAllFromDatabase("meetings"));
});

meetingsRouter.post("/", (req, res) => {
  const newMeeting = addToDatabase("meetings", createMeeting());
  res.status(201).send(newMeeting);
});

meetingsRouter.delete("/", (req, res) => {
  deleteAllFromDatabase("meetings");
  res.sendStatus(204);
});

module.exports = meetingsRouter;
