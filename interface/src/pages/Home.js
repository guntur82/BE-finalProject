import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <Navbar></Navbar>
      Home
    </>
  );
};

export default Home;
