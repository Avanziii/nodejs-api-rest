const Atendimentos = require('../models/atendimentos')

module.exports = app => {
  app.get('/atendimentos', (req, res) => res.send('Atendimentos GET'))

  app.post('/atendimentos', (req, res) => {
    const atendimento = req.body
    // console.log(atendimento)
    Atendimentos.adicionar(atendimento)

    res.send('Atendimentos POST ')
  })
} 