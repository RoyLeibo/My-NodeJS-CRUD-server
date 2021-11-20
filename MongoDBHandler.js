const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://leibo:Roy123!@playersapp.sue7y.mongodb.net/playersDb?retryWrites=true&w=majority";
const mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const connectionName = "players";
const databaseName = "NBAPlayers";

async function addPlayer(body) {
  const mongoClient = await getMongoClient();
  const bodyAsJson = JSON.parse(body);
  mongoClient
    .collection(connectionName)
    .insertOne(bodyAsJson, function (err, res) {
      if (err) throw err;
      console.log(
        "The following player has been added successfully:\n",
        bodyAsJson
      );
    });
}

async function getPlayer(id) {
  const mongoClient = await getMongoClient();
  const getPlayerQuery = { _id: parseInt(id) };
  console.log("Query: ", getPlayerQuery);
  return new Promise((resolve, reject) => {
    mongoClient
      .collection(connectionName)
      .findOne(getPlayerQuery, function (err, res) {
        if (err) reject(err);
        else if (res == null) reject(`No player with ID ${id} was found`);
        else {
          console.log("Result: ", res);
          resolve(res);
        }
      });
  });
}

async function getAllPlayers() {
  const mongoClient = await getMongoClient();
  console.log("Getting all players");
  return new Promise(async (resolve, reject) => {
    var res = await mongoClient.collection(connectionName).find().toArray();
    res.sort(
      (a, b) =>
        JSON.parse(JSON.stringify(a))._id - JSON.parse(JSON.stringify(b))._id
    );
    if (res == null) reject(`No players were found`);
    else {
      console.log("Result: ", res);
      resolve(res);
    }
  });
}

function getMongoClient() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(uri, mongoClientOptions, function (err, client) {
      if (err) reject(err);
      resolve(client.db(databaseName));
    });
  });
}

module.exports = {
  addPlayerFunction: addPlayer,
  getPlayerFunction: getPlayer,
  getAllPlayersFunction: getAllPlayers,
};
