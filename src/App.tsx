import React, { useState } from 'react';
import Dropzone, { DropzoneState } from 'react-dropzone';
import axios from 'axios';
import './styles/app.scss';

interface File extends Blob {
  name: string;
  data?: string;
  lastModified?: number;
  webkitRelativePath?: string;
}

function App() {
  const [fileData, setFileData] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  
  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result as string;
        setFileData(fileData);
        setFileName(file.name);
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleUpload = async () => {
    try {
      // Check if file data exists
      if (!fileData) {
        throw new Error('No file selected');
      }

      // Post file data to the server
      const response = await axios.post('http://localhost:3000/zip-file', { file: fileData });

      // Check if the response is valid
      if (!response.data) {
        throw new Error('Invalid response');
      }

      // Create blob from response data and set download URL
      const blob = new Blob([response.data], { type: 'application/zip' });
      setDownloadUrl(URL.createObjectURL(blob));
      setError(null);
    } catch (error) {
      setError('An error occurred while uploading the file');
    }
  };

  return (
    <div>
      <div className='zip-container'>
        <h1 className='header'> Welcome to the Zip App</h1>
        <div className='dropzone'>
          <Dropzone onDrop={(acceptedFiles: File[]) => handleDrop(acceptedFiles)}>
            {({ getRootProps, getInputProps, isDragActive }: DropzoneState) => (
              <div {...getRootProps()} className={isDragActive ? "dropzone-active" : ""}>
                <input {...getInputProps()} />
                {fileName ? (
                  <div>{fileName}</div>
                ) : (
                  <div className='text'>Drag and drop or click here to select a file</div>
                )}
              </div>
            )}
          </Dropzone>
        </div>
      

      <button className='btn' disabled={!fileName} onClick={handleUpload}>
        Upload and zip file
      </button>
      {error && <div>{error}</div>}
      {downloadUrl && (
        <div className='download'>
          <a href={downloadUrl} download>
            Download zipped file
          </a>
          <div>Transfer complete with no errors. Please enjoy the zipped file.</div>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;
