const Pets = require("../models/pets");

module.exports = (app) => {
  app.post("/pet", (req, res) => {
    const pet = req.body;

    Pets.adicionar(pet, res);
  });
};
