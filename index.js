const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');

const app = express()


const PORT = config.get('port') || 5000

// Коннект к монго
async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {

        })
    }
    catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}
start();

// Корс обоссаный
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// Хрень чтобы распарсить в жсон
app.use(express.json())
app.use('/', routes)
app.use('/films', routes)

app.listen(PORT, () => console.log(`server has been started on ${PORT}`))