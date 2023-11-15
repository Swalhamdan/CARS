const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const bodyParser = require('body-parser');

const coursesRouter = require('./routers/coursesRouter');
const userRouter = require('./routers/userRouter');
const adminRouter = require('./routers/adminRouter')

const coursesController = require('./controllers/courseController');
const userController = require('./routers/userRouter');
const adminController = require('./controllers/adminController');

const { authPage } = require('./middlewares/authorization');

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
    res.render('home');
})

app.use('/login', userRouter);

app.use('/courses', coursesRouter);


app.use('/courses/delete/:id', coursesController.deleteCourse);

app.use('/courses/addGrades/:id/:grade', coursesController.addGrade);

app.use('/myCourses', coursesController.getMyCourses);

app.use('/addUser', adminRouter)
app.use('/addCourseToUserForm', (req, res) => {
  res.render('addCoursesToUser');
});

app.post('/addCourseToUser', adminController.addCoursesToUser);


app.use((req,res) =>{
    res.status(404).send('<h1>Error 404: source not found</h1>');
})