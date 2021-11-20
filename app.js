const controller = require(`./MyServer`);
const addPlayerMongoFunction = require(`./MongoDBHandler`).addPlayerFunction;
const getPlayerMongoFunction = require(`./MongoDBHandler`).getPlayerFunction;
const getAllPlayersMongoFunction =
  require(`./MongoDBHandler`).getAllPlayersFunction;

const addPlayerFsFunction = require(`./FileHandler`).addPlayerFunction;
const getPlayerFsFunction = require(`./FileHandler`).getPlayerFunction;
const getAllPlayersFsFunction = require(`./FileHandler`).getAllPlayersFunction;

const addPlayerKeyword = require(`./constants`).addPlayerKeyword;
const getPlayerByIdKeyword = require(`./constants`).getPlayerByIdKeyword;
const getAllPlayersKeyword = require(`./constants`).getAllPlayersKeyword;

var mongoHandlerFunctionsObject = {
  getAllPlayersKeyword: getAllPlayersMongoFunction,
  addPlayerKeyword: addPlayerMongoFunction,
  getPlayerByIdKeyword: getPlayerMongoFunction,
};
var fileHandlerFunctionsObject = {
  getAllPlayersKeyword: getAllPlayersFsFunction,
  addPlayerKeyword: addPlayerFsFunction,
  getPlayerByIdKeyword: getPlayerFsFunction,
};

switch (process.argv[2]) {
  case "fs":
    console.log("Fs is chosen");
    controller.init(fileHandlerFunctionsObject);
    break;
  case "mongo":
    console.log("Mongo is chosen");
    controller.init(mongoHandlerFunctionsObject);
    break;
}
