const moment = require('moment')
const atendimentos = require('../controllers/atendimentos')
const conexao = require('../infra/conexao')

class Atendimentos {
    adicionar(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const atendimentoDatado = {...atendimento, dataCriacao, data}

        /* the escaping char '?' you can search how it works in   https://www.npmjs.com/package/mysql */
        const sql = 'INSERT INTO Atendimentos SET ?'

        /* atendimento é um objeto */
        conexao.query(sql, atendimentoDatado, (erro, resultados) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log(resultados)
            }
        })
    }
}

module.exports = new Atendimentos