// Import the Project model to interact with the "projects" collection in MongoDB
const Project = require("../models/project");

module.exports.home = async function (req, res) {
  try {
    // Fetch all projects from the database, sorted by 'createdAt' field in descending order (most recent first)
    let projects = await Project.find({}).sort("-createdAt");

    // Render the home page and pass the fetched projects to the view template (home.ejs)
    // 'title' is a title for the page, and 'projects' is the data to be displayed on the page
    return res.render("home", {
      title: "Issue/Bug Tracker | Home", // Title for the page (displayed in the browser tab)
      projects, // Pass the list of projects to the view template
    });
  } catch (err) {
    // Log any error that occurs while fetching the projects for debugging purposes
    console.error("Error fetching projects:", err);

    // Send a response with an internal server error status (500) and render the error page
    // 'message' is displayed to inform the user that something went wrong
    return res.status(500).render("error", {
      title: "Error", // Title for the error page
      message: "An error occurred while fetching the projects.", // Error message to be displayed
    });
  }
};
