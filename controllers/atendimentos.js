const Atendimentos = require("../models/atendimentos");

module.exports = (app) => {
  app.get("/atendimentos", (req, res) => {
    Atendimentos.listar(res);
  });

  app.get("/atendimentos/:id", (req, res) => {
    /*  console.log(req.params.id)  --> ID vem como uma string no corpo do params e no banco está em inteiro, necessário conversão*/
    const id = parseInt(req.params.id);

    Atendimentos.buscaPorId(id, res);
  });

  app.post("/atendimentos", (req, res) => {
    const atendimento = req.body;
    Atendimentos.adicionar(atendimento, res);
  });

  app.patch("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    
    Atendimentos.alterar(id, valores, res);
  });

  app.delete("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    
    Atendimentos.remover(id, res);
  });
};
