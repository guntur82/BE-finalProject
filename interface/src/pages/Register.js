import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../axios/userAxios";
import "../App.css";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";

const Register = () => {
  const navigation = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password2nd: "",
    no_hp: 0,
    level: "Admin",
    gambar: "",
    alamat: "",
  });
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const [loginStatus, setLoginStatus] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setLoginStatus(true);
      navigation("/home");
    } else {
      setLoginStatus(false);
    }
  }, [loginStatus]);
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
            Swal.fire("Success", "Berhasil membuat akun", "success");
            navigation("/");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: result.data.msg,
            });
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password tidak sama",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pastikan email anda benar",
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
                  <TextField
                    className="form-control"
                    required
                    id="outlined-password-input"
                    label="Email"
                    type="email"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                  {/* <input
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="Email..."
                  /> */}
                </div>
                <div className="mb-3">
                  <TextField
                    className="form-control"
                    required
                    id="outlined-password-input"
                    label="Name"
                    type="text"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  {/* <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Name..."
                  /> */}
                </div>
                <div className="mb-3">
                  <TextField
                    className="form-control"
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                  {/* <input
                    type="password"
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    placeholder="Password..."
                  /> */}
                </div>
                <div className="mb-3">
                  <TextField
                    className="form-control"
                    required
                    id="outlined-password-input"
                    label="Confirm Password"
                    type="password"
                    onChange={(e) =>
                      setForm({ ...form, password2nd: e.target.value })
                    }
                  />
                  {/* <input
                    type="password"
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, password2nd: e.target.value })
                    }
                    placeholder="Confirm Password..."
                  /> */}
                </div>
                <div className="mb-3">
                  <TextField
                    className="form-control"
                    required
                    id="outlined-password-input"
                    label="Phone"
                    type="text"
                    onChange={(e) =>
                      setForm({ ...form, no_hp: e.target.value })
                    }
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  {/* <input
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, no_hp: e.target.value })
                    }
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    placeholder="Phone..."
                  /> */}
                </div>
                <div className="mb-3">
                  <TextField
                    required
                    className="form-control"
                    id="outlined-multiline-static"
                    label="Alamat"
                    multiline
                    rows={4}
                  />
                  {/* <textarea
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, alamat: e.target.value })
                    }
                    placeholder="Alamat..."
                  /> */}
                </div>
                <div className="mb-3">
                  <label>Gambar :</label>
                  <input
                    onChange={onImageChange}
                    type="file"
                    className="form-control"
                  />
                  <img
                    src={img ? img.preview : ""}
                    className="img-thumbnail"
                    width={img ? "200" : 0}
                    height={img ? "200" : 0}
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={() => submitHandler()}
                    className="btn  btn-success px-5 mb-5 w-100"
                  >
                    Register
                  </button>
                  <Link className="text-dark fw-bold" to={"/"}>
                    Login
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

export default Register;
