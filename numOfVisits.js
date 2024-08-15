// Import required modules
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

// Use the cookie-parser middleware
app.use(cookieParser());

// Define a route for the root URL '/'
app.get('/', (req, res) => {
  // Get the number of visits from cookies or default to 0
  let visits = parseInt(req.cookies.visits) || 0;

  // Increment the number of visits
  visits += 1;

  // Set the updated visits count in the cookies
  res.cookie('visits', visits, { httpOnly: true });

  // Determine the response message based on visits count
  let responseMessage;
  if (visits === 1) {
    responseMessage = 'Welcome to my webpage! It is your first time that you are here.';
  } else {
    responseMessage = `Hello, this is the ${visits} time that you are visiting my webpage.`;
  }

  // Get the current date and time
  const lastVisitDate = new Date().toString();

  // Add the last visit date and time to the response message
  responseMessage += `\nLast time you visited my webpage on: ${lastVisitDate}`;

  // Send the response message to the client
  res.send(responseMessage);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
