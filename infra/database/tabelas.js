class Tabelas {
  init(conexao) {
    this.conexao = conexao

    this.criarAtendimentos()
    this.criarPets()
  }

  criarAtendimentos() {
    const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(11) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'

    /* ALTER TABLE `agenda-petshop`.atendimentos ADD data datetime NOT NULL, ADD dataCriacao datetime NOT NULL */

    this.conexao.query(sql, erro => {
      if(erro){
        console.log(erro)
      } else {
        console.log('tabela atendimentos criada com sucesso')
      }
    })
  }

  criarPets() {

    /* Coluna imagem ira armazenar o caminho referente onde a imagem realmente está armazenada */
    const sql = 'CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, nome varchar(50), imagem varchar(200), PRIMARY KEY (id))'

    this.conexao.query(sql, erro => {
        if(erro){
            console.log(erro)
        } else {
            console.log('tabela pets criada com sucesso')
        }
        
    })
  }
}

module.exports = new Tabelas