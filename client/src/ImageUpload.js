import React, { useState } from 'react';

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // 미리보기용 URL 생성
    const previewUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(previewUrl);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Upload a Face Image</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && <img src={previewUrl} alt="Preview" style={{ width: '200px', marginTop: '10px' }} />}
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
}

export default ImageUpload;