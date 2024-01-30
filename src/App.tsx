import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ViewTableDataComponent from './Components/ViewTableDataComponent/ViewTableDataComponent';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/view" element={<ViewTableDataComponent />} />

        </>
      </Routes>
    </div>
  );
}

export default App;
