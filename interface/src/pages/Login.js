import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const URL = 'http://localhost:3000/api/user';
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const [loginStatus, setLoginStatus] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setLoginStatus(true);
      navigate('/home');
    } else {
      setLoginStatus(false);
    }
  }, [loginStatus]);
  const loginUser = async () => {
    try {
      if (!isValidEmail(form.email)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Pastikan email anda benar',
        });
      } else {
        let result = await axios({
          method: 'POST',
          url: URL + '/loginadmin',
          data: form,
        });
        localStorage.setItem('access_token', result.data.access_token);
        Swal.fire('Login Berhasil', '', 'success');
        navigate('/home');
      }
    } catch (error) {
      if (error.message === 'Request failed with status code 404') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email tidak ditemukan!',
        });
      } else if (error.message === 'Request failed with status code 403') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Pastikan password anda benar!',
        });
      }
      console.log(error);
    }
  };

  const submitHandler = () => {
    loginUser();
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card my-5">
              <div className="card-body cardbody-color p-lg-5">
                <div className="text-center">
                  <h3>Login Page</h3>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="Email..."
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    placeholder="Password..."
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={() => submitHandler()}
                    className="btn btn-color px-5 mb-5 w-100"
                  >
                    Login
                  </button>
                  <Link className="text-dark fw-bold" to={'/register'}>
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
