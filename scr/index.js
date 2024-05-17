const express = require('express')
const app = express()
require('dotenv').config()
        const mongoose = require('mongoose')
        const PORT = 3000

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`)
    .then(() => console.log('Conectado ao mongoDB'))
    .catch(err => console.log('Falha ao conectar ao MongoDB', err))
        
        app.use(express.json())

        const Pessoa = mongoose.model('pessoa', {nome: String})

app.get('/pessoas', async(req, res) =>{
    const pessoas = await Pessoa.find()
    res.json(pessoas)
})

app.get('/pessoas/:id', async(req, res) => {
const pessoaS = await Pessoa.findById(req.params.id)
res.json(pessoaS)
})

app.post('/pessoas', async (req,res) =>{
    const pessoa =  new Pessoa(req.body)
    const pessoaCriada = await pessoa.save()
    res.status(201).json(pessoaCriada) 
})

        app.delete('/pessoas/:id', async(req,res) =>{
         await Pessoa.findByIdAndDelete(req.params.id)
            res.json({mensagem:"Pessoa excluida com sucesso!"}) 
})

app.put('/pessoas/:id', async(req,res) =>{
    const pessoasUpdate = await Pessoa.findByIdAndUpdate(req.params.id, req.body, {new: true})
res.json(pessoasUpdate)
})

        app.listen(PORT,() =>{
            console.log(`http://localhost:${PORT}`)
        })