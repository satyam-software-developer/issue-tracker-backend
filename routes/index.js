// Importing the express module to work with routing in an Express.js application
const express = require("express");

// Create a new router instance to define routes for the application
const router = express.Router();

// Importing the homeController to handle the logic for the home route
const homeController = require("../controllers/home_controller");

// Log message to confirm the router has been successfully loaded
console.log("Router loaded successfully");

// Define the route for the home page (root route "/")
router.get("/", homeController.home);

// Routes for project-related requests:
// The "/project" route will delegate the handling of all project-related requests to the "project" router
// This means all requests starting with "/project" will be handled by the routes defined in the "project" router file.
router.use("/project", require("./project"));

// Define a fallback for undefined routes (i.e., routes that do not match any of the above)
// If a request does not match any defined route, a 404 error is sent back with a custom message "404: Route Not Found"
router.use((req, res) => {
  res.status(404).send("404: Route Not Found");
});

// Export the router so it can be used in the main application (usually in the app.js or server.js file)
module.exports = router;
