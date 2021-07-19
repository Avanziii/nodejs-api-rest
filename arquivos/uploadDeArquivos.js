const fs = require('fs')
const path = require('path')

// fs.readFile('./assets/salsicha.jpg', (erro, buffer) => {
//     console.log('imagem foi bufferizada')
//     console.log(buffer)

//     fs.writeFile('./assets/salsicha2.jpg', buffer, (erro) =>{
//         console.log('imagem foi escrita')
//     })
// })

module.exports = (caminhoLeitura, nomeDoArquivo, callbackImagemCriada) => {
    const tiposValidos = ['jpg', 'png', 'jpeg']
    const tipo = path.extname(caminhoLeitura)
    const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !== -1

    if(tipoEhValido) {
        const caminhoEscrita = `./assets/image/${nomeDoArquivo}${tipo}`

        fs.createReadStream(caminhoLeitura)
            .pipe(fs.createWriteStream(caminhoEscrita))
            .on('finish', () => callbackImagemCriada(false, caminhoEscrita))
    } else {
        const erro = 'Tipo de imagem inválida'
        console.log('Erro! Tipo inválido')
        callbackImagemCriada(erro)
    }
}

