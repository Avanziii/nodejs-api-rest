module.exports = app => {
  app.get('/atendimentos', (req, res) => res.send('Atendimentos GET'))

  app.post('/atendimentos', (req, res) => {
    console.log(req.body)

    res.send('Atendimentos POST ')
  })
} 