import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

interface File {
  name: string;
  data: string;
}

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result as string;
        setSelectedFile({ name: file.name, data: fileData });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    try {
      const response = await axios.post('http://localhost:3000/zip-file', { file: selectedFile?.data });
      setDownloadUrl(URL.createObjectURL(new Blob([response.data])));
      setError(null);
    } catch (error) {
      setError('An error occurred while uploading the file');
    }
  };

  return (
    <div>

    </div>
  );
}

export default App;

