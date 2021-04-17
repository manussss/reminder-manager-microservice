const express = require('express')
const bodyParser = require('body-parser')

//para enviar eventos para os demais microservices
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

//base de dados inicialmente volátil
const eventos = []

app.post('/eventos', (req, res) => {
    const evento = req.body
    eventos.push(evento)
    //envia o evento para o microservice de lembretes
    axios.post('http://localhost:4000/eventos', evento)
    //envia o evento para o microservice de observacoes
    axios.post('http://localhost/5000/eventos', evento)
    //envia o evento para o microservice de consulta
    axios.post('http://localhost:6000/eventos', evento)
    //envia o evento para o microservice de classificacao
    axios.post('http://localhost:7000/eventos', evento)
    res.status(200).send({msg: 'ok'})
})

app.get('/eventos', (req, res) =>{
    res.send(eventos)
})

app.listen(10000, () =>{
    console.log('Event bus up and running on 10000')
})