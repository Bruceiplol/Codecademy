const express = require("express");
const minionsRouter = express.Router();

const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

minionsRouter.param("minionId", (req, res, next, id) => {
  const minion = getFromDatabaseById("minions", id);
  if (!minion) {
    res.sendStatus(404);
  } else {
    req.minion = minion;
    next();
  }
});

minionsRouter.get("/", (req, res) => {
  res.send(getAllFromDatabase("minions"));
});

minionsRouter.post("/", (req, res) => {
  let newMinion = addToDatabase("minions", req.body);
  res.status(201).send(newMinion);
});

minionsRouter.get("/:minionId", (req, res) => {
  res.send(req.minion);
});

minionsRouter.put("/:minionId", (req, res) => {
  let updatedMinion = updateInstanceInDatabase("minions", req.body);
  res.send(updatedMinion);
});

minionsRouter.delete("/:minionId", (req, res) => {
  let deletedMinion = deleteFromDatabasebyId("minions", req.params.minionId);
  if (deletedMinion) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

minionsRouter.get("/:minionId/work", (req, res) => {
  const work = getAllFromDatabase("work").filter((singleWork) => {
    return singleWork.id === req.params.id;
  });
  res.send(work);
});

minionsRouter.post("/:minionId/work", (req, res) => {
  const workToAdd = req.body;
  workToAdd.id = req.params.id;
  const createdWork = addToDatabase("work", workToAdd);
  res.status(201).send(createdWork);
});

minionsRouter.param("workId", (req, res, next, id) => {
  const work = getFromDatabaseById("work", id);
  if (!work) {
    res.status(404).send();
  } else {
    req.work = work;
    next();
  }
});

minionsRouter.put("/:minionId/work/:workId", (req, res) => {
  if (req.params.minionId !== req.body.minionId) {
    res.sendStatus(400);
  } else {
    updatedWork = updateInstanceInDatabase("work", req.body);
    res.send(updatedWork);
  }
});

minionsRouter.delete("/:minionId/work/:workId", (req, res) => {
  const deletedWork = deleteFromDatabasebyId("work", req.params.workId);
  if (deletedWork) {
    res.sendStatus(204);
  } else {
    res.sendStatus(500);
  }
});

module.exports = minionsRouter;
