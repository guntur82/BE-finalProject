import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // buat redirect
import { addUser, informationUser, editUser } from '../../axios/distributorAxios';

const ActionDistributor = () => {
  const [form, setForm] = useState({
    name: '',
    no_hp: '',
    alamat: '',
  });
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    if (id) {
      informationUser(+id, (result) => {
        setForm({
          name: result.name,
          no_hp: result.no_hp,
          alamat: result.alamat,
        });
      });
    }
  }, []);
  const navigation = useNavigate();
  const submitHandler = () => {
    id ? editUser(id, form) : addUser(form);
    navigation('/main/distributor');
  };
  return (
    <>
      <div className="row my-3">
        <div className="w-100 text-center">
          <h5>{id ? 'Edit User' : 'Create User'}</h5>
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
            <label>No HP:</label>
            <input
              value={form.no_hp}
              onChange={(e) => setForm({ ...form, no_hp: e.target.value })}
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

export default ActionDistributor;
