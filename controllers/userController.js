const User = require('../model/user');
const { setCurrentUser, getCurrentUser} = require('../public/globals')

const openLoginForm = (req ,res) => {
    res.render('login');
}

// const log = (req, res) => {
//     res.render('mainMenu')
// }

const login = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.body.id });
        if (!user) {
            return res.status(400).send('Cannot find user');
        }

        if (user.password === req.body.password && user.role === req.body.role) {
            setCurrentUser(user);
            if(user.role === 'admin'){
                res.render('adminMainMenu');
            }
            if(user.role === 'instructor'){
                res.render('instructorMainMenu');
            }
            if(user.role === 'student'){
                res.render('studentMainMenu');
            }
        } else {
            res.send('Something is incorrect');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
// const login = (req, res) => {
//     const user = User.find((user) => user.id = req.body.id)
//     if (user == null){
//         return res.status(400).send('Cannot find user');
//     }
//     try{
//         if(user.password === req.body.password){
//             setCurrentUser(user.id)
//             res.render('mainMenu');
//         }else{
//             res.send('wrong password')
//         }
//     }catch{
//         res.status(500).send()
//     }
// }

module.exports = {openLoginForm, login}