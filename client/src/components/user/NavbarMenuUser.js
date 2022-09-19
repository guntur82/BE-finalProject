import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // buat redirect

const NavbarMenuUser = () => {
  const params = useParams();
  const { name } = params;
  return (
    <>
      <nav className="main-navbar navbar navbar-expand-lg">
        <div className="container">
          <Link
            className="navbar-brand"
            to={name === undefined ? '/' : '/user/' + name}
          >
            Home
          </Link>
          <Link
            className="navbar-brand"
            to={name === undefined ? '/brand' : '/user/brand/' + name}
          >
            Find Brand
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  {name === undefined ? 'Login' : 'Exit'}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarMenuUser;
