// Import necessary modules
const express = require("express"); // Express framework for routing and server setup
const expressLayouts = require("express-ejs-layouts"); // Express middleware for handling EJS layouts
const db = require("./config/mongoose"); // Import the MongoDB connection setup (mongoose configuration)
const routes = require("./routes"); // Import the application's routes (defined in the routes folder)

// App setup
const app = express(); // Create an Express application instance
const port = 3000; // Define the port the server will listen on (3000)

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
// This middleware parses incoming requests with URL-encoded payloads (form data),
// and makes the data accessible through `req.body` in the request handler

// Static files
app.use(express.static("assets")); // Serve static files from the 'assets' folder (images, CSS, etc.)
app.use(express.static("public")); // Serve static files from the 'public' folder (JS files, assets, etc.)

// Enable EJS layouts
app.use(expressLayouts);
// This middleware enables the use of EJS layouts. With this, you can define a
// common layout (like headers, footers) and only pass the specific content to the views.

// Layout settings to extract styles and scripts
app.set("layout extractStyles", true); // Enable the extraction of styles from the layout into the view
app.set("layout extractScripts", true); // Enable the extraction of scripts from the layout into the view

// Set the view engine to EJS
app.set("view engine", "ejs"); // Set the view engine to EJS (Embedded JavaScript templating engine)
app.set("views", "./views"); // Set the directory where EJS templates are stored

// Use routes
app.use("/", routes);
// This sets up the application's routes. The route handler in the "routes" file will handle requests to "/"

// Start the server
app.listen(port, (err) => {
  // Start the server and listen on the specified port (3000)
  if (err) {
    console.error(`Error in running the server: ${err}`);
    // If there is an error starting the server, it is logged here
    return;
  }
  console.log(`Server is running on http://localhost:${port}`);
  // If the server starts successfully, log the URL where the server is running
});
