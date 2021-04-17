const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const {v4: uuidv4} = require('uuid')
const app = express()

app.use(bodyParser.json())

//base inicialmente volátil
const observacoesPorLembreteId = {}

//id é um placeholder
app.put('/lembretes/:id/observacoes', async (req, res) => {
    try{
    const idObs = uuidv4()
    const {texto} = req.body

    //req.params da acesso a lista de parametros da url
    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || []

    observacoesDoLembrete.push({id: idObs, texto})

    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete
    
    await axios.post('http://localhost:10000/eventos', {
        tipo: "ObservacaoCriada",
        dados: {
            id: idObs, texto, lembreteId: req.params.id
        }
    })
    }catch(err){
        console.log(err)
    }

    res.status(201).send(observacoesDoLembrete)

})

app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || [])
})

app.post('/eventos', (req, res) =>{
    console.log(req.body)
    res.status(200).send({msg: 'ok'})
})

app.listen(5000, (() => {
    console.log('Observacoes up and runinng 5000')
}))