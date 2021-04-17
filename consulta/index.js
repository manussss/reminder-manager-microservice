const express = require('express')
const app = express()
app.use(express.json())

//base de dados volátil inicialmente
const baseConsulta = {}

const funcoes = {
    LembreteCriado: (lembrete) =>{
        baseConsulta[lembrete.contador] = lembrete;
    },
    ObservacaoCriada: (observacao) =>{
        const observacoes = baseConsulta[observacao.lembreteId]["observacoes"] || []
        observacoes.push(observacao)
        baseConsulta[observacao.lembreteId]["observacoes"] = observacoes
    }
}

app.get('/lembretes', (req, res) =>{
    res.status(200).send(baseConsulta)
})

app.post('/eventos', (req, res) =>{
    try{
        funcoes[req.body.tipo](req.body.dados)
    }catch(err) {
        console.log(err)
    }
    res.status(200).send(baseConsulta)
})

app.listen(6000, () =>{
    console.log('Consulta up and running on 6000')
})