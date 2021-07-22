const moment = require("moment");
const axios = require('axios')
const atendimentos = require("../controllers/atendimentos");
const repositorio = require("../repositorios/atendimento")
const conexao = require("../infra/database/conexao");

class Atendimentos {
        constructor() {
                this.dataEhValida = ({ data, dataCriacao }) => moment(data).isSameOrAfter(dataCriacao);
                this.clienteEhValido = ({ tamanho }) => tamanho >= 5;

                this.valida = parametros => {
                        return this.validacoes.filter(campo => {
                                const { nome } = campo
                                const parametro = parametros[nome]

                                console.log('valor parametroo ', campo.valido(parametro))
                                return !campo.valido(parametro)
                        })
                }

                this.validacoes = [
                        {
                                nome: "data",
                                valido: this.dataEhValida,
                                mensagem: "Data deve ser maior ou igual a data atual",
                        },
                        {
                                nome: "cliente",
                                valido: this.clienteEhValido,
                                mensagem: "Cliente deve ter pelo menos cinco caracteres",
                        },
                ];
        }

        adicionar(atendimento) {
                const dataCriacao = moment().format("YYYY-MM-DD HH:mm:ss");
                const data = moment(atendimento.data, "DD/MM/YYYY").format(
                        "YYYY-MM-DD HH:mm:ss"
                );

                const parametros = {
                        data: { data, dataCriacao },
                        cliente: { tamanho: atendimento.cliente.length }
                }

                const erros = this.valida(parametros)
                console.log('erros: ', erros)
                const existemErros = erros.length

                if (existemErros) {
                        return new Promisse((resolve, reject) => reject(erros))
                } else {
                        const atendimentoDatado = { ...atendimento, dataCriacao, data };

                        return repositorio.adiciona(atendimentoDatado).then(resultados => {
                                const id = resultados.insertId
                                return ({ ...atendimento, id })
                        })
                }
        }

        listar() {       
                return repositorio.lista()
        }

        buscaPorId(id, res) {
                const sql = `SELECT * FROM Atendimentos WHERE id =${id}`;

                conexao.query(sql, async (erro, resultado) => {
                        const atendimento = resultado[0];
                        const cpf = atendimento.cliente

                        if (erro) {
                                res.status(400).json(erro);
                        } else {
                                const { data } = await axios.get(`http://localhost:8082/${cpf}`)

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
