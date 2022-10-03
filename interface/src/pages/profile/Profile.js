import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { dataUser, registerUser, updateUser } from "../../axios/userAxios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FiX } from "react-icons/fi";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Profile = () => {
  const navigation = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password2nd: "",
    no_hp: "",
    gambar: "",
    level: "",
    alamat: "",
  });
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    if (id) {
      dataUser(+id, (result) => {
        setForm({
          name: result.name ?? "",
          email: result.email ?? "",
          no_hp: result.no_hp ?? "",
          level: result.level ?? "",
          alamat: result.alamat ?? "",
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
              if (result.data.message === "success") {
                Swal.fire("Success", "Pembaharuan berhasil", "success").then(
                  () => {
                    navigation("/user");
                  }
                );
              } else {
                console.log(result);
              }
            })
          : registerUser(form, (result) => {
              if (result.data.name) {
                Swal.fire("Success", "Berhasil membuat akun", "success").then(
                  () => {
                    navigation("/user");
                  }
                );
              } else if (result.data === "email") {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Email sudah digunakan!",
                });
              } else {
                console.log(result);
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
      <Navbar></Navbar>
      <div className="container bootstrap snippet">
        <div className="row">
          <div className="col-sm-10 text-center">
            <h1>Edit Profile</h1>
          </div>
        </div>
        <div className="row cardbody-color p-lg-5">
          <div className="col-sm-3">
            <div className="text-center">
              <img
                src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                className="avatar img-circle img-thumbnail"
                alt="avatar"
              />
              <h6>Upload a different photo...</h6>
              <input
                type="file"
                className="text-center center-block file-upload"
              />
            </div>
            <hr />
            <br />
          </div>
          <div className="col-sm-9">
            <div className="tab-content">
              <div className="tab-pane active" id="home">
                <hr />
                <form
                  className="form"
                  action="##"
                  method="post"
                  id="registrationForm"
                >
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
                    value={form.email}
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
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      value={form.name}
                    />
                    {/* <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    value={form.name}
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
                      type="number"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      onChange={(e) =>
                        setForm({ ...form, no_hp: e.target.value })
                      }
                      value={form.no_hp}
                    />
                    {/* <input
                    type="text"
                    className="form-control"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={(e) =>
                      setForm({ ...form, no_hp: e.target.value })
                    }
                    value={form.no_hp}
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
                    value={form.alamat}
                    placeholder="Alamat..."
                  /> */}
                  </div>
                  <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="success">
                      Save
                    </Button>
                    <Button variant="outlined" color="error">
                      Reset
                    </Button>
                  </Stack>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Profile;
