import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import "../../App.css";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { addBrand, editBrand, informationBrand } from "../../axios/brandAxios";
import TextField from "@mui/material/TextField";

const ActionBrand = () => {
  const navigation = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    gambar: "",
  });

  const params = useParams();
  const { id } = params;
  useEffect(() => {
    if (id) {
      informationBrand(+id, (result) => {
        setForm({
          nama: result.nama,
        });
      });
    }
  }, []);
  const [img, setImg] = useState();
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg({ preview: URL.createObjectURL(file), file: file });
    setForm({ ...form, gambar: e.target.files[0] });
  };
  const submitHandler = () => {
    // console.log(form);
    // buat redirect
    id
      ? editBrand(id, form, (result) => {
          if (result.data.message === "success") {
            Swal.fire("Success", "Pembaharuan berhasil", "success").then(() => {
              navigation("/brand");
            });
          } else {
            console.log(result);
          }
        })
      : addBrand(form, (result) => {
          if (result.data.nama) {
            Swal.fire("Success", "Berhasil membuat akun", "success").then(
              () => {
                navigation("/brand");
              }
            );
          } else if (result.data === "logo") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Nama logo sudah digunakan!",
            });
          } else {
            console.log(result);
          }
        });
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
                  <h3>Add Brand</h3>
                </div>
                <div className="mb-3">
                  {/* <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setForm({ ...form, nama: e.target.value })}
                    value={form.nama}
                    placeholder="Name..."
                  /> */}
                  <TextField
                    className="form-control"
                    required
                    id="outlined-password-input"
                    label="Name"
                    type="text"
                    value={form.nama}
                    onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label>Logo :</label>
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

export default ActionBrand;
