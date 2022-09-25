import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import '../../App.css';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addWarna, editWarna, informationWarna } from '../../axios/warnaAxios';

const ActionWarna = () => {
  const navigation = useNavigate();
  const [form, setForm] = useState({
    nama_warna: '#000000',
  });
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    if (id) {
      informationWarna(+id, (result) => {
        setForm({
          nama_warna: result.nama_warna,
        });
      });
    }
  }, []);
  const submitHandler = () => {
    // buat redirect
    id
      ? editWarna(id, form, (result) => {
          if (result.data.message === 'success') {
            Swal.fire('Success', 'Pembaharuan berhasil', 'success').then(() => {
              navigation('/warna');
            });
          } else {
            console.log(result);
          }
        })
      : addWarna(form, (result) => {
          if (result.data.message === 'success') {
            Swal.fire('Success', 'Berhasil menambahkan', 'success').then(() => {
              navigation('/warna');
            });
          } else if (result.data === 'warna') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Warna sudah tersedia!',
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
                  <h3>Warna</h3>
                </div>
                <div className="input-group mb-3">
                  <input
                    className="input-group-text form-control-lg"
                    id="basic-addon1"
                    type="color"
                    onChange={(e) =>
                      setForm({ ...form, nama_warna: e.target.value })
                    }
                    value={form.nama_warna}
                  />
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, nama_warna: e.target.value })
                    }
                    value={form.nama_warna}
                    placeholder="Name..."
                    maxLength="7"
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

export default ActionWarna;
