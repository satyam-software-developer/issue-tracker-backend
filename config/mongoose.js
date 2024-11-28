// Import the mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Connection URI (Uniform Resource Identifier) which includes credentials and other connection options
const DB_URI =
  "mongodb+srv://krsatyam0506:bKswIB13YuDxvynL@cluster0.bsuur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Establish a connection to MongoDB using mongoose.connect() method with the URI
mongoose
  .connect(DB_URI) // Connect to MongoDB using the provided connection URI
  .then(() => {
    console.log("Connected to MongoDB successfully"); // If the connection is successful, log success message
  })
  .catch((error) => {
    // If an error occurs during the connection, log the error message
    console.error("Error connecting to MongoDB:", error.message);
  });

// Export the current database connection so it can be reused in other parts of the application
module.exports = mongoose.connection;
