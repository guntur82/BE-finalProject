import React, { useState, useEffect } from 'react';
import * as moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom'; // buat redirect
import { informationItem } from '../../axios/itemAxios';
import Swal from 'sweetalert2';
import { addTransaksi } from '../../axios/transaksiAxios';

const AddUserPage = () => {
  const API_img = 'http://localhost:4001/uploads/';
  const params = useParams();
  const { name, id } = params;
  let date = moment(new Date()).format('DD/MM/YYYY hh:mm:ss').split('T')[0];
  const [form, setForm] = useState({
    name: '',
    alamat: '',
    tanggal: '',
    jumlah: '',
    total_harga: '',
    itemId: '',
  });
  const [item, setItem] = useState([]);
  useEffect(() => {
    if (id) {
      informationItem(+id, (result) => {
        setForm({
          name: name,
          alamat: '',
          tanggal: date,
          jumlah: 1,
          total_harga: result.harga * 1,
          itemId: id,
        });
        setItem({
          name: result.name,
          harga: result.harga,
          gambar: result.gambar,
          stock: result.stock,
          userId: result.userId,
          brandId: result.brandId,
        });
      });
    }
  }, []);
  const navigation = useNavigate();
  const submitHandler = () => {
    if (form.jumlah > item.stock) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There is not enough stock',
      });
    } else {
      addTransaksi(form);
      navigation('/user/' + name);
    }
  };

  return (
    <div className="my-3">
      <div className="w-100 text-center my-3">
        <h3>Welcome {name}</h3>
      </div>
      <div
        className="card mb-3 mx-auto"
        style={{ width: '700px', height: '300px' }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={item.gambar ? API_img + item.gambar : ''}
              className="img-fluid rounded-start"
              alt="hp"
              width={item.gambar ? '300px' : 0}
              height={item.gambar ? '300px' : 0}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h1>{item.name}</h1>
              <h1>
                Rp.
                {new Intl.NumberFormat('de-DE', {
                  prefix: 'Rp',
                  centsLimit: 0,
                  thousandsSeparator: '.',
                }).format(item.harga)}
              </h1>
              <p className="card-text">
                <big className="text-muted">Stock : {item.stock}</big>
              </p>
              <input
                value={form.jumlah}
                onChange={(e) =>
                  setForm({
                    ...form,
                    jumlah: e.target.value,
                    total_harga: e.target.value * item.harga,
                  })
                }
                type="number"
                className="form-control mb-3"
                placeholder="Qty"
              />
              <div className="form-floating mb-3">
                <textarea
                  onChange={(e) => setForm({ ...form, alamat: e.target.value })}
                  className="form-control"
                  placeholder="Address"
                  id="floatingTextarea"
                ></textarea>
                <label>Address</label>
              </div>
              <div>
                <div className="mb-3">
                  <button
                    onClick={() => submitHandler()}
                    className="btn btn-block btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserPage;
