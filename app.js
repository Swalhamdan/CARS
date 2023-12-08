/* 
    Dependinces
*/
const express = require('express');
const dotenv = require('dotenv');

// const mongoose = require('mongoose');
// const methodOverride = require('method-override');

const app = express();
dotenv.config();

app.set('view engine', 'ejs');
app.use(express.static('public')); 

const accountRouter = require('./routes/account.router');



/* 
    Database 
*/

// mongoose.connect('mongodb+srv://EventFull:hcMz3DRTxoaR2oF4@eventfull.ztptx4c.mongodb.net/?retryWrites=true')

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });

// const serviceRouter = require('./routes/service');

/* 
    app config 
*/
app.use(express.urlencoded({ extended: true }));

// app.use(methodOverride('_method'));

// app.use(express.static('views')); 
// app.set('view engine', 'ejs');

// app.use('/service', serviceRouter);

// const Service = require('./model/service');
app.use('/account', accountRouter);


app.get('', async (request, response) => {
    return response.render("landing")
});

app.get('/dashboard', async (request, response) => {
    return response.render("dashboard/coursesList")
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Started on port ' + PORT);
});
