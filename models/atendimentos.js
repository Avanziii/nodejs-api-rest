const moment = require("moment");
const axios = require('axios')
const atendimentos = require("../controllers/atendimentos");
const conexao = require("../infra/conexao");

class Atendimentos {
  adicionar(atendimento, res) {
    const dataCriacao = moment().format("YYYY-MM-DD HH:mm:ss");
    const data = moment(atendimento.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:mm:ss"
    );

    const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
    const clienteEhValido = atendimento.cliente.length >= 5;

    const validacoes = [
      {
        nome: "data",
        valido: dataEhValida,
        mensagem: "Data deve ser maior ou igual a data atual",
      },
      {
        nome: "cliente",
        valido: clienteEhValido,
        mensagem: "Cliente deve ter pelo menos cinco caracteres",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      res.status(400).json(erros);
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data };

      /* the escaping char '?' you can search how it works in   https://www.npmjs.com/package/mysql */
      const sql = "INSERT INTO Atendimentos SET ?";

      /* atendimento é um objeto */
      conexao.query(sql, atendimentoDatado, (erro, resultados) => {
        if (erro) {
          res.status(400).json(erro);
        } else {
          res.status(201).json(atendimento);
        }
      });
    }
  }

  listar(res) {
    const sql = "SELECT * FROM Atendimentos";

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  buscaPorId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id =${id}`;

    conexao.query(sql, async (erro, resultado) => {
      const atendimento = resultado[0];
      const cpf = atendimento.cliente

      if (erro) {
        res.status(400).json(erro);
      } else {
        const {data} = await axios.get(`http://localhost:8082/${cpf}`)

        atendimento.cliente = data

        res.status(200).json(atendimento);
      }
    });
  }

  alterar(id, valores, res) {
    if (valores.data) {
      valores.data = moment(valores.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }

    const sql = "UPDATE Atendimentos SET ? WHERE ID=?";

    conexao.query(sql, [valores, id], (erro, resultado) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ ...valores, id });
      }
    });
  }

  remover(id, res) {
    const sql = `DELETE FROM Atendimentos WHERE id=${id}`;

    conexao.query(sql, (erro, resultado) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ id });
      }
    });
  }
}

module.exports = new Atendimentos();
