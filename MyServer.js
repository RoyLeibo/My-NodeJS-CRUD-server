const express = require("express");
const validationManager = require("./ValidationManager");
const fieldsModifier = require("./FieldsModifier");

const addPlayerKeyword = require(`./constants`).addPlayerKeyword;
const getPlayerByIdKeyword = require(`./constants`).getPlayerByIdKeyword;
const getAllPlayersKeyword = require(`./constants`).getAllPlayersKeyword;

const app = express();
app.use(express.json());

function init(dbObject) {
  db = dbObject;
  console.log("Chosen DB: \n", db);
}

app.get("/getplayer/:id", async function (req, res) {
  console.log(`Received getplayer request: ${req.url}`);
  try {
    res.json(await db.getPlayerByIdKeyword(req.params.id));
  } catch (err) {
    res.end(err);
  }
});

app.get("/getallplayers", async function (req, res) {
  console.log(`Received getallplayers request: ${req.url}`);
  try {
    res.json(await db.getAllPlayersKeyword());
  } catch (err) {
    res.end("There was an error getting all the players");
  }
});

app.post("/addplayer/:id", async function (req, res) {
  console.log(`Received addplayer request: ${req.url}`);
  try {
    validationManager.validateRequest(req.params.id, req.body);
    await db.addPlayerKeyword(
      JSON.stringify(fieldsModifier.modifyFields(req.body))
    );
    res.end(`Player with ID ${req.params.id} has been added successfully`);
  } catch (err) {
    console.log(err);
    res.end(`Player with ID ${req.params.id} cannot be added`);
  }
});

app.listen(4242, () => {
  console.log("Server is running on port 4242...");
});

module.exports = { init };
