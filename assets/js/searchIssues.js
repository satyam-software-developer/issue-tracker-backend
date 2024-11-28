// Get the form element where the search functionality is provided
let searchIssueForm = document.getElementById("search-issue-form");

// Get the project issue data stored as a JSON string in the hidden div
let searchJson = document.getElementById("issue-data").getAttribute("data");

// Parse the JSON string into a JavaScript object (array of issues)
let searchIssues = JSON.parse(searchJson);

// Get the element where the search results will be displayed (a container div)
let searchList = document.getElementById("issues-list");

// Add an event listener to the search form that triggers when the form is submitted
searchIssueForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission behavior (page reload)

  // Clear any previously displayed search results in the search list container
  searchList.innerHTML = "";

  // Get the value entered in the title input field (case-sensitive search)
  let titleValue = searchIssueForm
    .querySelector('input[name="tie"]')
    ?.value.trim();

  // Get the value entered in the description input field (case-sensitive search)
  let descriptionValue = searchIssueForm
    .querySelector('input[name="des"]')
    ?.value.trim();

  // Check if at least one of the inputs has a value (either title or description)
  if (!titleValue && !descriptionValue) {
    // If neither title nor description is entered, show a message and return
    let noInputDiv = document.createElement("div");
    noInputDiv.innerHTML = `
      <p style="color: #ff5555; font-size: 1.2rem; text-align: center; margin-top: 20px;">
       ⚠️ Please enter at least one title or description to search issues.
      </p>
    `;
    searchList.appendChild(noInputDiv);
    return; // Exit the function if no input is provided
  }

  // Filter issues based on the exact title or description match (case-sensitive)
  let searchedIssues = searchIssues.filter((el) => {
    const matchesTitle = titleValue
      ? el.title === titleValue // Exact match (case-sensitive) for title
      : false;
    const matchesDescription = descriptionValue
      ? el.description === descriptionValue // Exact match (case-sensitive) for description
      : false;

    // Return true if either the title or description exactly matches the search input
    return matchesTitle || matchesDescription;
  });

  // If no issues match the search criteria, display a "No Results" message
  if (searchedIssues.length === 0) {
    let noResultsDiv = document.createElement("div");
    noResultsDiv.innerHTML = `
      <p style="color: #ff5555; font-size: 1.2rem; text-align: center; margin-top: 20px;">
        ⚠️ Please enter a correct title or description to search issues.
      </p>
    `;
    searchList.appendChild(noResultsDiv);
    return;
  }

  // Loop through the searched issues and create a visual card for each one
  searchedIssues.forEach((issue) => {
    // Create a new div element for each issue to display it
    let Div = document.createElement("div");

    // Add the class "issue-card" to the div for potential custom styles
    Div.classList.add("issue-card");

    // Set the inner HTML of the div to display the issue details, styled with a gradient background
    Div.innerHTML = `
      <div class="card w-100" style="
          background: linear-gradient(120deg, #1e3c72, #2a5298);  /* Gradient background color */
          color: #ffffff;  /* White text color */
          padding: 20px;  /* Padding around the content */
          margin-bottom: 20px;  /* Space between cards */
          border-radius: 12px;  /* Rounded corners */
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);  /* Subtle shadow for the card */
          transition: transform 0.3s ease, box-shadow 0.3s ease;  /* Smooth transition for hover effects */
        ">
        <div class="card-body">
          <h4 class="card-title" style="font-size: 1.4rem; font-weight: bold; color: #ffc107;">Title: ${issue.title}</h4>
          <h5 class="card-title" style="font-size: 1.2rem; color: #00d1b2;">Author: ${issue.author}</h5>
          <h6 class="card-subtitle mb-2" style="font-size: 1rem; color: #b2bec3;">
            Description: ${issue.description}
          </h6>
        </div>
      </div>
    `;

    // Add a hover effect when the user hovers over the card (to enlarge the card and add shadow)
    Div.querySelector(".card").onmouseover = function () {
      this.style.transform = "scale(1.05)"; // Slightly increase the card size
      this.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.4)"; // Increase shadow intensity for hover effect
    };

    // Add the reverse hover effect when the mouse leaves the card (to return to the original size and shadow)
    Div.querySelector(".card").onmouseout = function () {
      this.style.transform = "scale(1)"; // Return the card to its original size
      this.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)"; // Restore the original shadow
    };

    // Append the newly created issue card to the search list container
    searchList.appendChild(Div);
  });
});
