import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {
  About,
  ActionPosting,
  Home,
  Login,
  PagePosting,
  Posting,
  Register,
} from './pages';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="main-page container-fluid">
      <Routes>
        <Route path="" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
