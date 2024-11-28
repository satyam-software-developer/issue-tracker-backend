// Import mongoose to interact with the MongoDB database
const mongoose = require("mongoose");

// Define the schema for the Project collection
const projectSchema = new mongoose.Schema(
  {
    // Name field for the project, it is required and trimmed (removes leading/trailing spaces)
    name: {
      type: String, // Data type is String
      trim: true, // Automatically removes leading/trailing whitespace from the name
      required: [true, "Project name is required"], // Custom error message if project name is missing
    },

    // Description field for the project, it is required and trimmed
    description: {
      type: String, // Data type is String
      required: [true, "Project description is required"], // Custom error message if description is missing
      trim: true, // Automatically removes leading/trailing whitespace from the description
    },

    // Author field for the project, it is required and trimmed
    author: {
      type: String, // Data type is String
      required: [true, "Author is required"], // Custom error message if author is missing
      trim: true, // Automatically removes leading/trailing whitespace from the author name
    },

    // Issues field for the project, an array of ObjectIds referencing the Issue model
    issues: [
      {
        type: mongoose.Schema.Types.ObjectId, // The field stores ObjectIds
        ref: "Issue", // Reference to the Issue model
      },
    ],

    // Labels field for the project, an array of strings
    labels: {
      type: [String], // Data type is an array of strings
      default: [], // Default to an empty array if no labels are provided
      validate: {
        validator: function (value) {
          // Ensure that all labels are strings
          return (
            Array.isArray(value) && // Check if value is an array
            value.every((label) => typeof label === "string") // Ensure every element is a string
          );
        },
        message: "Labels must be an array of strings", // Custom error message if validation fails
      },
    },
  },
  {
    // Automatically add `createdAt` and `updatedAt` fields to the schema
    timestamps: true, // Enables automatic handling of creation and modification timestamps
  }
);

// Create and export the Project model based on the defined schema
const Project = mongoose.model("Project", projectSchema);

// Export the Project model so it can be used elsewhere in the application
module.exports = Project;
