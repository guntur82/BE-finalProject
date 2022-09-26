import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import '../../App.css';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addItemStock, informationItem } from '../../axios/itemAxios';
const AddItem = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [form, setForm] = useState({
    id: '',
    name: '',
    tanggal: '',
    stok: '',
  });

  const { id } = params;
  useEffect(() => {
    informationItem(+id, (result) => {
      setForm({
        id: result.id,
        stok: result.stok,
        name: result.name,
        tanggal: moment().format('YYYY-MM-DD h:mm:ss'),
      });
    });
  }, []);

  const submitHandler = () => {
    // buat redirect
    addItemStock(form, localStorage.access_token, (result) => {
      if (result.message === 'success') {
        Swal.fire('Success', 'Tambah data berhasil', 'success').then(() => {
          navigate('/item');
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
                  <h3>Tambah Stok</h3>
                </div>
                <div className="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    Nama
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    value={form.name}
                    placeholder="Name..."
                    disabled
                  />
                </div>
                <div className="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    Stok
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    value={form.stok}
                    placeholder="Stok..."
                    disabled
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    className="form-control"
                    onChange={(e) => setForm({ ...form, stok: e.target.value })}
                    placeholder="Tambah Stok..."
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

export default AddItem;
