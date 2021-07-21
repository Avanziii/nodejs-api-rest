const mysql = require('mysql')

const conexao = mysql.createConnection({
  hosy: 'localhost',
  port: 3307,
  user: 'root',
  password: '54321av',
  database: 'agenda-petshop'
})

module.exports = conexao