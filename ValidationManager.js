function validateRequest(id, body) {
  if (id != body._id) {
    throw new Error("ID must be the same");
  }
}

module.exports = { validateRequest };
