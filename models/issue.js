// Import mongoose to interact with the MongoDB database
const mongoose = require("mongoose");

// Define the schema for the Issue collection
const issueSchema = new mongoose.Schema(
  {
    // Title field for the issue, it is required and trimmed (removes leading/trailing spaces)
    title: {
      type: String, // Data type is String
      required: [true, "Title is required"], // Custom error message if title is missing
      trim: true, // Automatically removes leading/trailing whitespace from the title
    },

    // Description field for the issue, it is required and trimmed
    description: {
      type: String, // Data type is String
      required: [true, "Description is required"], // Custom error message if description is missing
      trim: true, // Automatically removes leading/trailing whitespace from the description
    },

    // Author field for the issue, it is required and trimmed
    author: {
      type: String, // Data type is String
      required: [true, "Author is required"], // Custom error message if author is missing
      trim: true, // Automatically removes leading/trailing whitespace from the author name
    },

    // Labels field for the issue, an array of strings, it is required and validated
    labels: {
      type: [String], // Data type is an array of strings
      required: [true, "At least one label is required"], // Custom error message if no labels are provided
      validate: {
        validator: function (value) {
          // Ensure there is at least one label if labels are provided
          return value.length > 0; // Validates that the array has at least one element
        },
        message: "Labels cannot be empty", // Custom error message if the labels array is empty
      },
    },
  },
  {
    // Automatically add `createdAt` and `updatedAt` fields to the schema
    timestamps: true, // Enables automatic handling of creation and modification timestamps
  }
);

// Create and export the Issue model based on the defined schema
const Issue = mongoose.model("Issue", issueSchema);
module.exports = Issue; // Export the Issue model to be used elsewhere in the application
