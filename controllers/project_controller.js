// Import the Project and Issue models to interact with their corresponding collections in MongoDB
const Project = require("../models/project");
const Issue = require("../models/issue");

// Controller to create a new project
module.exports.create = async function (req, res) {
  try {
    // Extract 'name', 'description', and 'author' from the request body (data sent from the client)
    const { name, description, author } = req.body;

    // Validate that all required fields are provided
    if (!name || !description || !author) {
      // If any field is missing, redirect back to the previous page or home (if no referer is available)
      return res.redirect(req.get("Referer") || "/");
    }

    // Create a new project document in the database with the provided data
    await Project.create({
      name,
      description,
      author,
    });

    // After successfully creating the project, redirect back to the previous page or home
    return res.redirect(req.get("Referer") || "/");
  } catch (err) {
    // Handle any errors that occur during project creation
    console.error("Error creating project:", err);

    // Redirect back to the previous page or home in case of an error
    return res.redirect(req.get("Referer") || "/");
  }
};

// Controller to fetch and display a specific project by its ID
module.exports.project = async function (req, res) {
  try {
    // Find the project in the database using its ID, including its associated issues
    const project = await Project.findById(req.params.id).populate("issues");

    // Check if the project exists
    if (project) {
      // If the project is found, render the project page and pass the project data to the view
      return res.render("project_page", {
        title: "Project Page", // Title for the webpage
        project, // Project data to be displayed
      });
    } else {
      // If the project is not found, redirect back to the previous page or home
      return res.redirect(req.get("Referer") || "/");
    }
  } catch (err) {
    // Handle any errors that occur while fetching the project
    console.error("Error fetching project:", err);

    // Redirect back to the previous page or home in case of an error
    return res.redirect(req.get("Referer") || "/");
  }
};

// Controller to create a new issue for a specific project
module.exports.createIssue = async function (req, res) {
  try {
    // Find the project by its ID to associate the issue with it
    const project = await Project.findById(req.params.id);

    // Check if the project exists
    if (!project) {
      // If the project does not exist, redirect back to the previous page or home
      return res.redirect(req.get("Referer") || "/");
    }

    // Extract 'title', 'description', 'labels', and 'author' from the request body
    const { title, description, labels, author } = req.body;

    // Create a new issue document in the database with the provided data
    const issue = await Issue.create({
      title,
      description,
      labels,
      author,
    });

    // Add the newly created issue's reference to the project's 'issues' array
    project.issues.push(issue);

    // Ensure that the labels associated with the issue are added to the project's labels array
    // Convert 'labels' to an array if it is not already one
    const labelsToAdd = Array.isArray(labels) ? labels : [labels];
    for (const label of labelsToAdd) {
      // Add the label to the project's 'labels' array if it is not already present
      if (!project.labels.includes(label)) {
        project.labels.push(label);
      }
    }

    // Save the updated project document in the database
    await project.save();

    // After successfully creating the issue, redirect back to the previous page or home
    return res.redirect(req.get("Referer") || "/");
  } catch (err) {
    // Handle any errors that occur while creating the issue
    console.error("Error creating issue:", err);

    // Redirect back to the previous page or home in case of an error
    return res.redirect(req.get("Referer") || "/");
  }
};
