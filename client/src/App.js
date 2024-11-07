import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleFileChange = (event) => { //파일 변경 핸들러
    const file = event.target.files[0];
    setSelectedFile(file);
  
    // 파일을 Base64로 인코딩하여 저장(미리보기)
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setPreviewURL(base64String);
      localStorage.setItem('previewURL', base64String); // 미리보기 URL을 로컬 저장소에 저장
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => { //파일 업로드 핸들러
    if (!selectedFile) {
      alert('파일을 선택해주세요.');
      return;
    }

    // 백엔드 연결
    /*
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/api/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { personal_color } = response.data;
      localStorage.setItem('personalColor', personal_color); // 퍼스널 컬러 저장

      window.location.href = '/resultpage.html';
    } catch (error) {
      console.error('에러 발생:', error);
      alert('분석 요청 중 오류가 발생했습니다.');
    }
    */

    // 임시 퍼스널컬러 설정
    localStorage.setItem('personalColor', 'Winter Cool');

    // 결과 페이지로 이동
    window.location.href = '/resultpage.html';
  };

  return (
    <div className="app-container">
      <h1 className="title">퍼컬 AI</h1>
      <div className="upload-page">
        <h2>사진을 업로드하고 분석하세요</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />
        <button onClick={handleUpload} className="upload-button">사진 업로드 및 분석</button>
      </div>
    </div>
  );
}

export default App;
