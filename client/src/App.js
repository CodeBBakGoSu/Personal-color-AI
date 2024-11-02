import logo from './logo.svg';
import './App.css';
import HelloWorld from './HelloWorld';
import React,{ useState , useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/data")  // FastAPI 엔드포인트 URL
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      <div>
      <h1>React + FastAPI</h1>
      <p>{data ? data.message : "Loading..."}</p>
    </div>
      <HelloWorld />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
