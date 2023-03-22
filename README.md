# File Zipping React App

This React app allows users to upload a file, zip it on the server, and download the zipped file.

## Prerequisites

- Node.js installed on your local machine
- Dependencies installed:
  - react
  - react-dom
  - react-dropzone
  - axios
  - typescript
  - sass (if using SCSS for styling)

## Installation

1. Create a new directory for your project, navigate to it, and run `npm init -y` to generate a `package.json` file.
2. Install the required dependencies by running the following command:

3. Set up your TypeScript project by running `tsc --init` to generate a `tsconfig.json` file.
4. Create a `src` folder in your project directory and create an `App.tsx` file within it. Copy the provided TypeScript code into the `App.tsx` file.
5. If you're using SCSS for styling, create a `styles` folder inside the `src` folder, and create an `app.scss` file within it. Copy the provided SCSS code into the `app.scss` file.

## Running the app locally

1. In your terminal, navigate to the project directory and run the following command to start the development server:

2. The app will run on `http://localhost:3000` (or another port, depending on your setup). Open this URL in your browser to interact with the app.

## How it works

- The app uses the `react`, `react-dropzone`, and `axios` packages.
- A `Dropzone` component is used to handle file selection through drag and drop or file picker.
- When a file is selected, it is stored in the `file` state.
- When the "Upload and zip file" button is clicked, a `multipart/form-data` request is sent to the server (at `http://localhost:6060`) containing the selected file.
- If the request is successful, the app receives a JSON object containing the download URL for the zipped file and displays it as a clickable link.
- If an error occurs, an error message is displayed.
