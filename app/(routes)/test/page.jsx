'use client'


import React, { useState } from 'react';
import { fromBlob, blobToURL } from 'image-resize-compress';
import Image from 'next/image';


const App = () => {
  const [beforeSize, setBeforeSize] = useState(null); // Original image size
  const [afterSize, setAfterSize] = useState(null); // Resized image size
  const [imageUrl, setImageUrl] = useState(null); // For displaying the resized image

  const handleBlob = async (blobFile) => {
    const quality = 80; // For webp and jpeg formats
    const width = '150'; // Original width
    const height = 'auto'; // Original height
    const format = 'jpg'; // Output format

    try {
      // Get the original size of the image in bytes
      console.log(blobFile.size)
      setBeforeSize(blobFile.size);

      // Resize and compress the blob
      const resizedBlob = await fromBlob(blobFile, quality, width, height, format);

      // Get the size of the resized image in bytes
      setAfterSize(resizedBlob.size);
      console.log(resizedBlob.size)

      // Convert the resized Blob to a URL for display
      const url = await blobToURL(resizedBlob);
      console.log(url)
      setImageUrl(url);
    } catch (error) {
      console.error('Error processing the Blob:', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file (blobFile)
    if (file) {
      handleBlob(file); // Pass the file to the handleBlob function
    }
  };

  return (
    <div>
      <h1>Image Resize and Compress</h1>
      {/* File Input */}
      <input type="file" accept="image/*" onChange={handleFileChange} />
      
      {/* Display original and resized image sizes */}
      {beforeSize !== null && <p>Original Image Size: {(beforeSize / 1024).toFixed(2)} KB</p>}
      {afterSize !== null && <p>Resized Image Size: {(afterSize / 1024).toFixed(2)} KB</p>}
      
      {/* Display the resized image */}
      {imageUrl && (
        <div className='block'>
          <h2>Resized Image</h2>
          <img src={imageUrl} alt="Resized" />
        </div>
      )}
      
    </div>
  );
};

export default App;
