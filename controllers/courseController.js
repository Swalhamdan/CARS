const Course = require('../model/course');
const User = require('../model/user');
const { setCurrentUser, getCurrentUser} = require('../public/globals');

var ERROR = "";

const getCourses = (request, response) => {
  Course.find()
    .then( (result) => {
      response.render('courses', {title: "Courses", courses: result, error: ERROR});
      ERROR = "";
    })
    .catch( (err) => {
      ERROR = "Data Couldn't be loaded!";
      response.render('courses', {title: "Courses", courses: [], error: ERROR});
    });
}

const getMyCourses = (req, res) => {
  let courses = [];
  Course.find()
    .then((result) => {
      courses = result;

      const currentUserCourses = getCurrentUser().courses;
      const myCourses = [];

      courses.forEach((course) => {
        if (currentUserCourses.includes(course.course)) {
          myCourses.push(course);
        }
      });
      if(getCurrentUser().role === 'instructor'){
        res.render('instructorCourses', { title: 'My Courses', courses: myCourses, error: ERROR });
      }
      if(getCurrentUser().role === 'student'){
        res.render('studentCourses', { title: 'My Courses', courses: myCourses, error: ERROR });
      }
      
    })
    .catch((error) => {
      console.error('Error fetching courses:', error);
      res.status(500).send('Internal Server Error');
    });
};

const openAddCourseForm = (request, response) => {
    response.render('addCourse')
}

const openAddGradeForm = (request, response) => {
    const grade = request.body.grade;
    Course.find()
    .then( (result) => {

      courses = result;

      const currentUserCourses = getCurrentUser().courses;
      const myCourses = [];

      courses.forEach((course) => {
        if (currentUserCourses.includes(course.course)) {
          myCourses.push(course);
        }
      });
      console.log(grade);
      response.render('instructorAddGrades', {title: "Adding Grades", courses: myCourses, grade, error: ERROR});
      ERROR = "";
    })
    .catch( (err) => {
      ERROR = "Data Couldn't be loaded!";
      response.render('instructorAddGrades', {title: "Adding Grades", courses: myCourses, grade, error: ERROR});
    });
}

const openAdminAddGradeForm = (request, response) => {
    const grade = request.body.grade;
    Course.find()
    .then( (result) => {
      response.render('addGrades', {title: "Adding Grades", courses: result, grade, error: ERROR});
      ERROR = "";
    })
    .catch( (err) => {
      ERROR = "Data Couldn't be loaded!";
      response.render('addGrades', {title: "Adding Grades", courses: [], grade, error: ERROR});
    });
}

const addCourse = (request, response) => {
  // get the data from the POST request
  let course = request.body.course;
  let description = request.body.description;
  let averageGrade = request.body.averageGrade;
  // Create an object with that data
  let newCourse = new Course({course: course, description: description, averageGrade: averageGrade});

  // Save the object to the database
  newCourse.save()
    .then( (result) => {
      ERROR = "";
      response.redirect('/');
    })
    .catch( (err) => {
      ERROR = "Data Couldn't be Added!";
      response.redirect('/');
    });
}

const deleteCourse = (req, res) => {
    const id = req.params.id;

    Course.findByIdAndDelete(id)
        .then((result) => {
            console.log(`Course deleted from database id: ${result._id}`);
            res.redirect('/courses');
        })
        .catch( (err) => {console.log(err)})
};

const addGrade = (req, res) => {
    const id = req.params.id.replace('id=', '');
    const grade = req.body.grade;
    console.log(id);
    console.log(grade);

    Course.findByIdAndUpdate(
        { _id: id },
        { $push: { averageGrade: grade } },
        { new: true } // To return the updated document
    )
        .then((updatedCourse) => {
            if (!updatedCourse) {
                console.log('Course not found');
                res.redirect('/addGrades'); // Redirect to a suitable URL
            } else {
                console.log(`Course grade updated in the database, id: ${updatedCourse._id}`);
                res.redirect('/addGrades'); // Redirect to a suitable URL
            }
        })
        .catch((err) => {
            console.error(err);
            res.redirect('/addGrades'); // Redirect to a suitable URL in case of an error
        });
};
const adminAddGrade = (req, res) => {
    const id = req.params.id.replace('id=', '');
    const grade = req.body.grade;
    console.log(id);
    console.log(grade);

    Course.findByIdAndUpdate(
        { _id: id },
        { $push: { averageGrade: grade } },
        { new: true } // To return the updated document
    )
        .then((updatedCourse) => {
            if (!updatedCourse) {
                console.log('Course not found');
                res.redirect('/adminAddGrades'); // Redirect to a suitable URL
            } else {
                console.log(`Course grade updated in the database, id: ${updatedCourse._id}`);
                res.redirect('/adminAddGrades'); // Redirect to a suitable URL
            }
        })
        .catch((err) => {
            console.error(err);
            res.redirect('/adminAddGrades'); // Redirect to a suitable URL in case of an error
        });
};
module.exports = {getCourses, addCourse, openAdminAddGradeForm, openAddCourseForm, deleteCourse,
   addGrade, openAddGradeForm, getMyCourses, adminAddGrade};