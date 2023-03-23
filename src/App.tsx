import React, { useState } from 'react';
import Dropzone, { DropzoneState } from 'react-dropzone';
import axios from 'axios';
import './styles/app.scss';

interface File extends Blob {
  name: string;
  data?: string;
}

function App() {
  const [file, setFile] = useState<File | null>(null); // Consolidate fileData and fileName into one state
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]); // Set the file directly
    }
  };
  
  const handleUpload = async (): Promise<void> => {
    try {
      if (!file) {
        throw new Error('No file selected');
      }

      const formData = new FormData(); // Use FormData to send the file
      formData.append('file', file);

      const response = await axios.post('http://localhost:6060', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.data) {
        throw new Error('Invalid response');
      }

      setDownloadUrl(response.data.downloadUrl); // Set the downloadUrl
    } catch (error) {
      setError('An error occurred while uploading the file');
    }
  };
    
  return (
    <div>
      <div className="zip-container">
        <h1 className="header"> Welcome to the Zip App</h1>
        <h2>README is available in the REPO for both frontend & backend</h2>
        <div className="dropzone">
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps, isDragActive }: DropzoneState) => (
              <div
                {...getRootProps()}
                className={isDragActive ? "dropzone-active" : ""}
              >
                <input {...getInputProps()} />
                {file ? (
                  <div>{file.name}</div>
                ) : (
                  <div className="text">
                    Drag and drop or click here to select a file
                  </div>
                )}
              </div>
            )}
          </Dropzone>
        </div>

        <button className="btn" disabled={!file} onClick={handleUpload}>
          Upload and zip file
        </button>
        {error && <div>{error}</div>}
        {downloadUrl && (
          <div className="download">
            <a href={downloadUrl} download>
              Download zipped file
            </a>
            <div>
              Transfer complete with no errors. Please enjoy the zipped file.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
