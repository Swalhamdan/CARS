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
const { setCurrentUser, resetCurrentUser } = require('./public/globals');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
  .then( (result) => {
    console.log("Connected to database...");
    app.listen(process.env.PORT, () => {
      console.log(`Server listening at port ${process.env.PORT}`);
      resetCurrentUser();
    });
  })
  .catch( (err) => {
    console.log(err);
  });



app.get('/', resetCurrentUser(), (req, res) =>{
    res.render('home');
})

app.use('/login',authPage(['not logged in']), userRouter);

app.use('/courses', authPage(['admin']), coursesRouter);

app.get('/addGrades', authPage(['instructor']), coursesController.openAddGradeForm)

app.get('/adminAddGrades', authPage(['admin']), coursesController.openAdminAddGradeForm)


app.use('/courses/delete/:id', authPage(['admin']), coursesController.deleteCourse);

app.post('/addGrades/:id/:grade', authPage(['instructor']), coursesController.addGrade);

app.post('/adminAddGrades/:id/:grade', authPage(['admin']), coursesController.adminAddGrade);

app.use('/myCourses', authPage(['admin', 'instructor', 'student']), coursesController.getMyCourses);

app.use('/addUser', authPage(['admin']), adminRouter)
app.use('/addCourseToUserForm', authPage(['admin']), (req, res) => {
  res.render('addCoursesToUser');
});

app.post('/addCourseToUser', authPage(['admin']), adminController.addCoursesToUser);


app.use((req,res) =>{
    res.status(404).send('<h1>Error 404: source not found</h1>');
})