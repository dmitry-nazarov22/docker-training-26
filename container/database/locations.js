const database = require("./crudrepository");
const express = require("express");
const locationsRouter = express.Router();

locationsRouter.get("/api/locations", async (req, res) => {
  try {
    result = await database.findAll();
    res.send(result);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = locationsRouter;
