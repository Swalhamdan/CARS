/* 
    Dependinces
*/
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();

/* 
    Database 
*/

mongoose.connect('mongodb+srv://EventFull:hcMz3DRTxoaR2oF4@eventfull.ztptx4c.mongodb.net/?retryWrites=true')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const serviceRouter = require('./routes/service');

/* 
    app config 
*/
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.use(express.static('views')); 
app.set('view engine', 'ejs');

app.use('/service', serviceRouter);

const Service = require('./model/service');

app.get('/', async (request, response) => {
    const services = await Service.find({});
    response.render('index', {services});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Started on port ' + PORT);
});
