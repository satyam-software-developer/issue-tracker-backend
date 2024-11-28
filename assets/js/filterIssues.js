// Get the form element where the filtering options are provided
let filterIssueForm = document.getElementById("filter-issue-form");

// Get the project issue data stored as a JSON string in the hidden div
let issuesJson = document.getElementById("issue-data").getAttribute("data");

// Parse the JSON string into a JavaScript object (array of issues)
let issues = JSON.parse(issuesJson);

// Get the element where the filtered issues will be displayed (a container div)
let issueList = document.getElementById("issues-list");

// Add an event listener to the filter form that triggers when the form is submitted
filterIssueForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission behavior (page reload)

  // Get all selected label checkboxes from the form
  let selectedLabels = [
    ...filterIssueForm.querySelectorAll("input[type=checkbox]:checked"),
  ].map((checkbox) => checkbox.value);

  // Get the selected author radio button value, if any
  let selectedAuthor = filterIssueForm.querySelector(
    "input[type=radio][name=author]:checked"
  )?.value;

  // Check if neither labels nor author are selected
  if (selectedLabels.length === 0 && !selectedAuthor) {
    // Clear any previously displayed issues in the issue list container
    issueList.innerHTML = "";

    // Show an error message to the user
    issueList.innerHTML = `
      <p style="
        color:  #ff5555; 
        font-size: 1.2rem; 
        text-align: center; 
        margin-top: 20px;">
       ⚠️ Please select at least one label or author to apply filters!
      </p>
    `;
    return; // Exit the function early as filtering cannot proceed
  }

  // Filter the issues array based on the selected criteria
  let filteredIssues = issues.filter((issue) => {
    const matchesAuthor = selectedAuthor
      ? issue.author === selectedAuthor
      : true;
    const matchesLabels =
      selectedLabels.length > 0
        ? selectedLabels.some((label) => issue.labels.includes(label))
        : true;

    return matchesAuthor && matchesLabels;
  });

  // Clear any previously displayed issues in the issue list container
  issueList.innerHTML = "";

  // Display only the filtered issues
  filteredIssues.forEach((issue) => {
    // Create a new div element for each issue
    let Div = document.createElement("div");

    // Set the inner HTML of the div to display the issue details
    Div.innerHTML = `
      <div class="card w-100" style="
          background: linear-gradient(135deg, #6a11cb, #2575fc);  /* Gradient background color */
          color: #ffffff;  /* White text color */
          padding: 25px;  /* Padding around the content */
          margin-bottom: 20px;  /* Space between cards */
          border-radius: 12px;  /* Rounded corners */
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);  /* Subtle shadow for the card */
          transition: transform 0.3s ease, box-shadow 0.3s ease;  /* Smooth transition for hover effects */
        ">
        <div class="card-body">
          <h4 class="card-title" style="font-size: 1.4rem; font-weight: bold; color: #ffdd00;">Title: ${issue.title}</h4>
          <h5 class="card-title" style="font-size: 1.2rem; color: #50fa7b;">Author: ${issue.author}</h5>
          <h6 class="card-subtitle mb-2" style="font-size: 1rem; color: #f1f1f1;">
            Description: ${issue.description}
          </h6>
        </div>
      </div>
    `;

    // Add a hover effect when the mouse hovers over the card (to scale and add shadow)
    Div.querySelector(".card").onmouseover = function () {
      this.style.transform = "scale(1.05)"; // Slightly increase the card size
      this.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.4)"; // Stronger shadow for hover effect
    };

    // Add the reverse hover effect when the mouse leaves the card
    Div.querySelector(".card").onmouseout = function () {
      this.style.transform = "scale(1)"; // Return the card to its original size
      this.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)"; // Original shadow strength
    };

    // Append the newly created issue card to the issue list container
    issueList.appendChild(Div);
  });
});
