import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {
  Home,
  Login,
  Register,
  User,
  ActionUser,
  Brand,
  ActionBrand,
  Item,
  ActionItem,
  Warna,
  ActionWarna,
} from './pages';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="main-page container-fluid">
      <Routes>
        <Route path="" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="user">
          <Route path="" element={<User />}></Route>
          <Route path="create" element={<ActionUser />}></Route>
          <Route path="edit">
            <Route path=":id" element={<ActionUser />}></Route>
          </Route>
        </Route>
        <Route path="brand">
          <Route path="" element={<Brand />}></Route>
          <Route path="create" element={<ActionBrand />}></Route>
          <Route path="edit">
            <Route path=":id" element={<ActionBrand />}></Route>
          </Route>
        </Route>
        <Route path="item">
          <Route path="" element={<Item />}></Route>
          <Route path="create" element={<ActionItem />}></Route>
          <Route path="edit">
            <Route path=":id" element={<ActionItem />}></Route>
          </Route>
        </Route>
        <Route path="warna">
          <Route path="" element={<Warna />}></Route>
          <Route path="create" element={<ActionWarna />}></Route>
          <Route path="edit">
            <Route path=":id" element={<ActionWarna />}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
