const fs = require("fs");
const directoryPrefix = __dirname + "/players/";

function getPlayer(id) {
  console.log("Reading file " + id);
  return JSON.parse(fs.readFileSync(directoryPrefix + id + ".json", "utf-8"));
}

function addPlayer(body) {
  fs.writeFileSync(
    directoryPrefix + JSON.parse(body)._id + ".json",
    body,
    "utf-8"
  );
}

function getAllPlayers() {
  console.log("Getting all players");
  var playersArray = [];
  const files = fs.readdirSync(directoryPrefix);
  files.forEach((file) =>
    playersArray.push(getPlayer(file.slice(0, file.indexOf("."))))
  );
  return playersArray;
}

module.exports = {
  addPlayerFunction: addPlayer,
  getPlayerFunction: getPlayer,
  getAllPlayersFunction: getAllPlayers,
};
