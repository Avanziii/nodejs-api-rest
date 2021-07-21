const uploadDeArquivos = require("../infra/arquivos/uploadDeArquivos");
const conexao = require("../infra/conexao");

class Pet {
  adicionar(pet, res) {
    const sql = "INSERT INTO Pets SET ?";

    uploadDeArquivos(pet.imagem, pet.nome, (erro, caminhoEscrita) => {
      if (erro) {
        res.status(400).json({ erro });
      } else {
        const novoPet = { nome: pet.nome, imagem: caminhoEscrita };

        conexao.query(sql, novoPet, (erro) => {
          if (erro) {
            res.status(400).json(erro);
          } else {
            res.status(200).json(novoPet);
          }
        });
      }
    });
  }
}

module.exports = new Pet();
