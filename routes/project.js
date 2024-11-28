// Importing the express module to work with routing in an Express.js application
const express = require("express");

// Create a new router instance to define routes for project-related requests
const router = express.Router();

// Importing the projectController to handle the logic for the project routes
const projectController = require("../controllers/project_controller");

// Route to create a new project:
// This route handles POST requests to "/project/create" to create a new project.
// The "create" method from the projectController is used to process the request and create the project.
router.post("/create", projectController.create);

// Route to get details of a specific project by its ID:
// This route handles GET requests to "/project/:id" where ":id" is a placeholder for the project ID.
// The "project" method from the projectController is used to fetch and render details of the project with the given ID.
router.get("/:id", projectController.project);

// Route to create an issue for a specific project by its ID:
// This route handles POST requests to "/project/:id" where ":id" is a placeholder for the project ID.
// The "createIssue" method from the projectController is used to create an issue for the specified project.
router.post("/:id", projectController.createIssue);

// Export the router so it can be used in other parts of the application (e.g., app.js or server.js)
module.exports = router;
