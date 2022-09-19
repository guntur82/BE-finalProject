import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // buat redirect
import { addTransaksi, informationTransaksi, editTransaksi } from '../../axios/transaksiAxios';

const ActionTransaction = () => {
  const [form, setForm] = useState({
    name: '',
    alamat: '',
    tanggal: '',
    jumlah: '',
    total_harga: '',
    itemId: '',
  });
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    if (id) {
      informationTransaksi(+id, (result) => {
        setForm({
          name: result.name,
          alamat: result.alamat,
          tanggal: result.tanggal,
          jumlah: result.jumlah,
          total_harga: result.total_harga,
          itemId: result.itemId,
        });
      });
    }
  }, []);
  const navigation = useNavigate();
  const submitHandler = () => {
    id ? editTransaksi(id, form) : addTransaksi(form);
    navigation('/main/Transaction');
  };
  return (
    <>
      <div className="row my-3">
        <div className="w-100 text-center">
          <h5>{id ? 'Edit Transaction' : 'Create Transaction'}</h5>
        </div>
        <div className="w-50 mx-auto">
          <hr />
          <div className="mb-3">
            <label>Name :</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Alamat :</label>
            <input
              value={form.alamat}
              //   onChange={this.onFileChange}
              onChange={(e) => setForm({ ...form, alamat: e.target.value })}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Tanggal:</label>
            <input
              value={form.tanggal}
              onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Jumlah:</label>
            <input
              value={form.jumlah}
              onChange={(e) => setForm({ ...form, jumlah: e.target.value })}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Total Harga:</label>
            <input
              value={form.total_harga}
              onChange={(e) => setForm({ ...form, total_harga: e.target.value })}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Id Hp:</label>
            <input
              value={form.itemId}
              onChange={(e) => setForm({ ...form, itemId: e.target.value })}
              type="text"
              className="form-control"
            />
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
    </>
  );
};

export default ActionTransaction;
