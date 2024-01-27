// routes/index.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  let { quote, attributed, source } = req.body;
  res.render("index", { quote, attributed, source });
});

router.get("/", (req, res) => {
  res.render("index")
})

module.exports = router;
