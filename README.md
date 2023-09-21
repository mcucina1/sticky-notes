# Sticky Notes


## Project Description

This sticky notes app is a simple yet handy application that allows users to create and manage virtual sticky notes directly in their web browser. The project provides an interface for adding, customizing, and organizing digital sticky notes, making it easy to jot down quick reminders, to-do lists, or important information without the need for physical sticky notes cluttering your workspace.

## Table of Contents

- [How to Install and Run the Project](#how-to-install-and-run-the-project)
- [How to Use the Project](#how-to-use-the-project)

## How to Install and Run the Project

To get the application up and running on your local machine, follow these simple steps:

1. **Clone the Repository:**

*git clone https://github.com/mcucina1/sticky-notes.git*

2. **Navigate to the Project Directory:**

*cd sticky-notes*

3. **Install Dependencies:**

For the frontend and backend, you'll need to use `npm` to install the required dependencies.

For the frontend:

*cd frontend* </br>
*npm install*

For the backend:

*cd backend* </br>
*npm install*

4. **Start the Frontend and Backend Servers:**

In separate terminal windows, start both the frontend and backend servers using `npm start`.

For the frontend:

*cd frontend*</br>
*npm start*

For the backend:

*cd backend*</br>
*npm start*


The application should now be accessible locally at [http://localhost:3000](http://localhost:3000).

## How to Use the Project

Using the application is straightforward:

1. **Create a Sticky Note:**

- Click the "Add Note" button to create a new sticky note.
- Enter your text on the note.

2. **Customize Sticky Notes:**

- Change the color of a note by selecting a color option in the dropdown.
- Resize notes by clicking and dragging the bottom-right corner.
- Move notes around by clicking and dragging them.

3. **Edit and Delete Notes:**

- Click the "pen" icon on a note to edit its content.
- Click the "trash" icon to remove a note.

4. **Save Your Notes:**

- Your notes are automatically saved via a MongoDB database, so you can return to them later.
