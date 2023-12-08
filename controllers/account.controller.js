const postLogin = async (request, response) => {
	// let { email, password } = request.body;

	// if (!email || !password) {
	// 	return response.status(400).send('Request missing username and/or password param')
	// }
	// try {
	// 	let userObject = await User.findOne({ where: { email: email, status: 'active' } });

	// 	if (!checkPassword(password, userObject.password))
	// 		throw "Incorrect email or password"
	// 	// return response.status(200).send({ access_token: { token: generateAccessToken({ userId: user.id }), tokenOptions } });
	// 	return response.redirect('/dashboard');

	// } catch (error) {
	// 	console.error(error);
	// 	return response.status(400).send({ message: 'Authentication unsuccessful' });
	// }
    return response.send("hi1")
}

const getLogin = async (request, response) => {
	// let { email, password } = request.body;

	// if (!email || !password) {
	// 	return response.status(400).send('Request missing username and/or password param')
	// }
	// try {
	// 	let userObject = await User.findOne({ where: { email: email, status: 'active' } });

	// 	if (!checkPassword(password, userObject.password))
	// 		throw "Incorrect email or password"
	// 	// return response.status(200).send({ access_token: { token: generateAccessToken({ userId: user.id }), tokenOptions } });
	// 	return response.redirect('/dashboard');

	// } catch (error) {
	// 	console.error(error);
	// 	return response.status(400).send({ message: 'Authentication unsuccessful' });
	// }
    return response.render("account/pages-login")
}

module.exports = {postLogin, getLogin}