import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import '../../App.css';
import { dataUser, registerUser, updateUser } from '../../axios/userAxios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const ActionUser = () => {
  const navigation = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password2nd: '',
    no_hp: '',
    gambar: '',
    level: '',
    alamat: '',
  });

  const params = useParams();
  const { id } = params;
  useEffect(() => {
    if (id) {
      dataUser(+id, (result) => {
        setForm({
          name: result.name,
          email: result.email,
          no_hp: result.no_hp,
          level: result.level,
          alamat: result.alamat,
        });
      });
    }
  }, []);
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
        id
          ? updateUser(id, form, (result) => {
              if (result.data.message === 'success') {
                Swal.fire('Success', 'Pembaharuan berhasil', 'success').then(
                  () => {
                    navigation('/user');
                  }
                );
              } else {
                console.log(result);
              }
            })
          : registerUser(form, (result) => {
              if (result.data.name) {
                Swal.fire('Success', 'Berhasil membuat akun', 'success').then(
                  () => {
                    navigation('/user');
                  }
                );
              } else if (result.data === 'email') {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Email sudah digunakan!',
                });
              } else {
                console.log(result);
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
      <Navbar></Navbar>
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
                    value={form.email}
                    placeholder="Email..."
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    value={form.name}
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
                    value={form.no_hp}
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
                    value={form.alamat}
                    placeholder="Alamat..."
                  />
                </div>
                <div className="mb-3">
                  <label>Level :</label>
                  <select
                    className="form-select"
                    onChange={(e) =>
                      setForm({ ...form, level: e.target.value })
                    }
                    value={form.level}
                  >
                    <option value="">-Pilih Level-</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
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

export default ActionUser;
