const express = require("express");
const ideasRouter = express.Router();
const checkMillionDollarIdea = require("./checkMillionDollarIdea");

const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

ideasRouter.param("ideaId", (req, res, next, id) => {
  const idea = getFromDatabaseById("ideas", id);
  if (!idea) {
    res.sendStatus(404);
  } else {
    req.idea = idea;
    next();
  }
});

ideasRouter.get("/", (req, res) => {
  res.send(getAllFromDatabase("ideas"));
});

ideasRouter.post("/", checkMillionDollarIdea, (req, res) => {
  let newIdea = addToDatabase("ideas", req.body);
  res.status(201).send(newIdea);
});

ideasRouter.get("/:ideaId", (req, res) => {
  res.send(req.idea);
});

ideasRouter.put("/:ideaId", checkMillionDollarIdea, (req, res) => {
  let updatedIdea = updateInstanceInDatabase("ideas", req.body);
  res.send(updatedIdea);
});

ideasRouter.delete("/:ideaId", (req, res) => {
  let deletedIdea = deleteFromDatabasebyId("ideas", req.params.ideaId);
  if (deletedIdea) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

module.exports = ideasRouter;
