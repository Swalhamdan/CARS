const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

const bodyParser = require('body-parser');

const coursesRouter = require('./routers/coursesRouter');

const coursesController = require('./controllers/courseController');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
  .then( (result) => {
    console.log("Connected to database...");
    app.listen(process.env.PORT, () => {
      console.log(`Server listening at port ${process.env.PORT}`);
    });
  })
  .catch( (err) => {
    console.log(err);
  });



app.get('/', (req, res) =>{
    res.render('home')
})

app.use('/courses', coursesRouter);


app.use('/courses/delete/:id', coursesController.deleteCourse);

app.use('/courses/addGrades/:id/:grade', coursesController.addGrade)


app.use((req,res) =>{
    res.status(404).send('<h1>Error 404: source not found</h1>');
})