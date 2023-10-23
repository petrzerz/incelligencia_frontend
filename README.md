# EFO Term data in paginated table

## Stack

This project is built using the following technologies:

- **Frontend**: React.js
- **State Management**: React Hooks
- **UI Component Library**: Ant Design
- **Styling**: CSS

## Setup

To set up and run the project in a new development environment, follow these steps:

1. **Clone the repository**
2. **Navigate to the project directory:**
   cd ols-table
3. **Install the dependencies:** npm install
4. **Start the development server:** npm start

5. **Open a web browser and visit** `http://localhost:3000` to view the application.

## Table Functionality

The table in this application displays data fetched from a paginated API endpoint. The following functionalities are available:

- View data related to different terms.
- Click on the "View Parents" link to view the parent terms associated with a specific term.
- Click on the "View Children" link to view the child terms associated with a specific term.
- The "Clear Data" button clears the currently displayed data and resets the table to its initial state.
- The "Load More" button fetches the next set of paginated api data and appends it to the current table data.
- If a term has no parents, the message "This is a root term, no parents available. Click the clear button." is displayed.
- If a term has no children, the message "No children terms for this term. Click the clear button" is displayed.
