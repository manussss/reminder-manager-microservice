const express = require('express')
const bodyParser = require('body-parser')
const {v4: uuidv4} = require('uuid')
const app = express()

app.use(bodyParser.json())

//base inicialmente volátil
const observacoesPorLembreteId = {}

//id é um placeholder
app.put('/lembretes/:id/observacoes', (req, res) => {
    const idObs = uuidv4()
    const {texto} = req.body

    //req.params da acesso a lista de parametros da url
    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || []

    observacoesDoLembrete.push({id: idObs, texto})

    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete

    res.status(201).send(observacoesDoLembrete)

})

app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || [])
})

app.listen(5000, (() => {
    console.log('Observacoes up and runinng 5000')
}))