import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { MainContent, Home, User } from './components';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="main-page container-fluid">
      <Routes>
        <Route path="" element={<User />}>
          <Route path="brand">
            <Route path="z">
              <Route path=":id"></Route>
            </Route>
          </Route>
        </Route>
        <Route path="home" element={<Home />}>
          <Route path=":status"></Route>
        </Route>
        <Route path="main" element={<MainContent />}>
          <Route path="distributor">
            <Route path="create"></Route>
            <Route path="edit">
              <Route path=":id"></Route>
            </Route>
          </Route>
          <Route path="brand">
            <Route path="create"></Route>
            <Route path="edit">
              <Route path=":id"></Route>
            </Route>
          </Route>
          <Route path="item">
            <Route path="create"></Route>
            <Route path="edit">
              <Route path=":id"></Route>
            </Route>
          </Route>
          <Route path="Transaction">
            <Route path="create"></Route>
            <Route path="edit">
              <Route path=":id"></Route>
            </Route>
          </Route>
        </Route>
        <Route path="user" element={<User />}>
          <Route path=":name">
            <Route path="add">
              <Route path=":id"></Route>
            </Route>
          </Route>
          <Route path="brand">
            <Route path=":name"></Route>
            <Route path=":id">
              <Route path=":name"></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
