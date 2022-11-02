// config inicial
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const DB_USER = process.env.DB_USER;
const DB_PASS = encodeURIComponent(process.env.DB_PASS);


//  forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

//  rotas da API
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);


//  rota inicial / endpoint
app.get('/', (req, res) => {
    
    //  mostra req
    res.json({message: 'Oi Express!' });
    
});


//  entregar uma porta para operar
mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@apicluster.02v6jdt.mongodb.net/?retryWrites=true&w=majority`)
    .then(() =>{
        console.log('Conectamos ao MongoDB')
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    })