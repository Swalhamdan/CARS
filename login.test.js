

// Import the necessary libraries for testing
const { JSDOM } = require('jsdom');

// Load the HTML content of the login page into a JSDOM instance
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>...</head>
<body class="bg-gradient-primary">...</body>
</html>
`;

const dom = new JSDOM(htmlContent);
const { window } = dom;

// Function to test login functionality
function login(username, password) {
  const emailInput = window.document.querySelector('#exampleInputEmail');

  const passwordInput = window.document.querySelector('#exampleInputPassword');
  //const loginButton = window.document.querySelector('.btn-primary');

  emailInput.value = username;
  passwordInput.value = password;

  loginButton.click();
}

// Jest test case
test('Login with valid credentials', () => {
  // Mock an alert function to capture the success message
  const alertMock = jest.fn();
  window.alert = alertMock;

  // Perform a login with valid credentials
  login('your@email.com', 'yourpassword');

  // Check if the success message is displayed
  expect(alertMock).toHaveBeenCalledWith('Login successful');
});

test('Login with invalid credentials', () => {
  // Mock an alert function to capture the error message
  const alertMock = jest.fn();
  window.alert = alertMock;

  // Perform a login with invalid credentials
  login('invalid@email.com', 'wrongpassword');

  // Check if the error message is displayed
  expect(alertMock).toHaveBeenCalledWith('Invalid credentials');
});