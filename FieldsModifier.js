const spaceRejex = "/(s+)/";

function modifyFields(body) {
  return splitPlayerName(body);
}

function splitPlayerName(body) {
  const fullName = body.name;
  body.firstName = fullName.slice(0, fullName.indexOf(" ")).trim();
  body.lastName = fullName.slice(fullName.indexOf(" "), fullName.length).trim();
  delete body["name"];
  return body;
}

module.exports = { modifyFields };
