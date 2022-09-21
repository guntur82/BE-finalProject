import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../axios/userAxios';
import Swal from 'sweetalert2';

const Register = () => {
  const navigation = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password2nd: '',
    no_hp: 0,
    level: 'admin',
    gambar: '',
    alamat: '',
  });
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const [img, setImg] = useState();
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg({ preview: URL.createObjectURL(file), file: file });
    setForm({ ...form, gambar: e.target.files[0] });
  };

  const submitHandler = () => {
    // buat redirect

    if (isValidEmail(form.email)) {
      if (form.password === form.password2nd) {
        registerUser(form, (result) => {
          if (result.data.name) {
            Swal.fire(
              'Add User',
              'User ' + result.data.email + ' berhasil ditambahkan',
              'success'
            );
            navigation('/');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: result.data,
            });
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Password tidak sama',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Pastikan email anda benar',
      });
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card my-5">
              <div className="card-body cardbody-color p-lg-5">
                <div className="text-center">
                  <h3>Register</h3>
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
                    type="text"
                    className="form-control"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Name..."
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
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, password2nd: e.target.value })
                    }
                    placeholder="Confirm Password..."
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, no_hp: e.target.value })
                    }
                    placeholder="Phone..."
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, alamat: e.target.value })
                    }
                    placeholder="Alamat..."
                  />
                </div>
                <div className="mb-3">
                  <label>Gambar :</label>
                  <input
                    onChange={onImageChange}
                    type="file"
                    className="form-control"
                  />
                  <img
                    src={img ? img.preview : ''}
                    className="img-thumbnail"
                    width={img ? '200' : 0}
                    height={img ? '200' : 0}
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={() => submitHandler()}
                    className="btn btn-color px-5 mb-5 w-100"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
