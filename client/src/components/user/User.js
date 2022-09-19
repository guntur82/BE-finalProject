import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavbarMenuUser, BannerUser } from '../index';
import {
  AddUserPage,
  BrandListUserPage,
  BrandUserPage,
  UserPage,
} from '../../pages';
const User = () => {
  return (
    <>
      {/* <BannerUser /> */}
      <NavbarMenuUser />
      <Routes>
        <Route path="" element={<UserPage />}></Route>
        <Route path="brand" element={<BrandListUserPage />}></Route>
        <Route path="brand">
          <Route path="z">
            <Route path=":id" element={<BrandUserPage />}></Route>
          </Route>
        </Route>
        <Route path="brand">
          <Route path=":name" element={<BrandListUserPage />}></Route>
          <Route path=":id">
            <Route path=":name" element={<BrandUserPage />}></Route>
          </Route>
        </Route>
        <Route path=":name" element={<UserPage />}></Route>
        <Route path=":name">
          <Route path="add">
            <Route path=":id" element={<AddUserPage />}></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default User;
