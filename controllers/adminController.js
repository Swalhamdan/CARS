const User = require('../model/user');

var ERROR = "";

const openCreationForm = (req, res) => {
    res.render('addUser')
}

const addUser = async (request, response) => {
    try {
      // Get the data from the POST request
      let id = request.body.id;
      let password = request.body.password;
      let role = request.body.role;
      let courses = [];
  
      // Create an object with that data
      let newUser = new User({ id, password, role, courses });
  
      console.log(newUser);
  
      // Save the object to the database
      const result = await newUser.save();
  
      console.log('done');
      ERROR = "";
      response.redirect('/addUser');
    } catch (err) {
      console.error('Error adding user:', err);
      ERROR = "Data Couldn't be Added!";
      response.redirect('/addUser');
    }
  };

  const addCoursesToUser = async (request, response) => {
    try {
      const id = request.body.id;
      const course = request.body.course;

      console.log(id)
      console.log(course)
  
      // Find the user by ID
      const user = await User.findOne({id: id});
      console.log(user)
      if (!user) {
        return response.status(404).json({ error: 'User not found' });
      }
  
      // Add courses to the user's courses array
      user.courses.push(course);
      
      // Save the updated user
      const updatedUser = await user.save();
  
      response.redirect('/addCourseToUserForm')
    } catch (error) {
      console.error('Error adding courses to user:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  };  

module.exports = {addUser, openCreationForm, addCoursesToUser};