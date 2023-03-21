// Importing React, useState hook from react, Dropzone component from react-dropzone, and axios
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

// Defining a File interface to hold the name and data of the uploaded file
interface File {
  name: string;
  data: string;
}

function App() {
  // Defining selectedFile, error and downloadUrl states using useState hook and initializing them with null
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // handleDrop function takes an array of acceptedFiles as an argument
  const handleDrop = (acceptedFiles: File[]) => {
    // Checking if there is at least one file in the array
    if (acceptedFiles.length > 0) {
      // Selecting the first file in the array
      const file = acceptedFiles[0];
      // Creating a new FileReader object
      const reader = new FileReader();
      // Setting onload function to be executed when reading is successful
      reader.onload = () => {
        // Getting the result of reading as a string
        const fileData = reader.result as string;
        // Storing the file name and data in the selectedFile state
        setSelectedFile({ name: file.name, data: fileData });
      };
      // Starting the reading process by calling readAsDataURL function with the selected file
      reader.readAsDataURL(file);
    }
  };

  // handleUpload function handles the uploading and zipping of the file
  const handleUpload = async () => {
    try {
      // Making a post request to the backend service with the selected file data
      const response = await axios.post('http://localhost:3000/zip-file', { file: selectedFile?.data });
      const blob = new Blob([selectedFile?.data], { type: 'application/zip' });
      setDownloadUrl(URL.createObjectURL(blob));
      // Clearing the error state if there was any
      setError(null);
    } catch (error) {
      // Setting the error state if there was an error in uploading and zipping the file
      setError('An error occurred while uploading the file');
    }
  };
  

  // Rendering the Dropzone component and displaying the selected file name or a prompt to select a file
  // The handleUpload function is called when the Upload and zip file button is clicked
  // The error and downloadUrl states are displayed based on their respective conditions
  return (
    <div>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {selectedFile ? (
              <div>{selectedFile.name}</div>
            ) : (
              <div>Drag and drop or click here to select a file</div>
            )}
          </div>
        )}
      </Dropzone>
      <button disabled={!selectedFile} onClick={handleUpload}>
        Upload and zip file
      </button>
      {error && <div>{error}</div>}
      {downloadUrl && (
        <div>
          <a href={downloadUrl} download>
            Download zipped file
          </a>
          <div>Transfer complete with no errors. Please enjoy the zipped file.</div>
        </div>
      )}
    </div>
  );
}

// Exporting the App component as the default export
export default App;
