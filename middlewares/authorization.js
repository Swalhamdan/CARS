const { setCurrentUser, getCurrentUser} = require('../public/globals');
const User = require('../model/user');


const authPage = (permissions) => {
    return (req, res, next) => {
        const userRole = req.body.role;
        if(permissions.includes(userRole)){
            next();
        } else{
            return res.status(401).send('<h1>Error 401: You do not have permission to access this page</h1>');
        }
    }
}

const auth = (permissions) => {
    return (req, res, next) => {
        const user = User.findOne({ id: getCurrentUser() });
        
    }
}


module.exports = {authPage};