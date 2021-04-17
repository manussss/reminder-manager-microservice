const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')
const app = express();
app.use(bodyParser.json())

//base de dados inicialmente volátil
const lembretes = {}

contador = 0

app.get('/lembretes', (req, res) => {
    res.send(lembretes)
})

app.put('/lembretes', async (req, res) => {
    try{
        contador++
        const {texto} = req.body
        lembretes[contador] = {
            contador, texto
        }
        
    await axios.post('http://localhost:10000/eventos', {
        tipo: "LembreteCriado",
        dados: {
            contador, texto
        }
    })
    }catch(err){
        console.log(err)
    }
    res.status(201).send(lembretes[contador])
}) 

app.post('/eventos', (req, res) =>{
    console.log(req.body)
    res.status(200).send({msg: 'ok'})
})

app.listen(4000, () => {
    console.log('Lembretes up and runinng 4000')
})