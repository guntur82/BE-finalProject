import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import LoadingBar from '../../helpers/LoadingBar';
import { Link } from 'react-router-dom';
import { FiPlusSquare } from 'react-icons/fi';
import { deleteWarna, getWarna } from '../../axios/warnaAxios';
const Warna = () => {
  const [warna, setWarna] = useState([]);
  useEffect(() => {
    getWarna((result) => setWarna(result));
  }, []);
  const deleteHandler = (id) => {
    deleteWarna(id);
  };
  return (
    <>
      <Navbar></Navbar>
      <h3 className="mb-3 text-center">Warna</h3>
      <div className="row my-3 text-center">
        <div className="col-9 mx-auto">
          <div className="w-100">
            <div className="row justify-content-end">
              <div className="col-2">
                <Link
                  to="/warna/create"
                  className="btn btn-sm btn-primary my-2"
                >
                  <span className="me-2">
                    <FiPlusSquare></FiPlusSquare>
                  </span>
                  Tambah Warna
                </Link>
              </div>
            </div>
          </div>
          <div className="w-100">
            <table className="table table-border">
              <thead>
                <tr className="table-primary">
                  <th>No</th>
                  <th>Warna</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {warna.length > 0 ? (
                  warna.map((warnas, key) => {
                    const { id, nama_warna } = warnas;
                    return (
                      <tr key={id}>
                        <td>{key + 1}</td>
                        <td>
                          {/* <input
                            style={{
                              backgroundColor: nama_warna,
                              borderColor: 'black',
                            }}
                            type="checkbox"
                            className="form-check-input"
                          /> */}
                          <div className="pallete">
                            <div className="kotak">
                              <div
                                className="box"
                                style={{
                                  backgroundColor: nama_warna,
                                  borderColor: 'black',
                                }}
                              >
                                <p>{nama_warna}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div style={{ paddingRight: '10px' }}>
                            <Link
                              to={`/warna/edit/${id}`}
                              className="btn btn-sm btn-primary"
                              style={{ width: '100px' }}
                            >
                              Edit
                            </Link>
                          </div>
                          <div style={{ paddingRight: '10px' }}>
                            <button
                              onClick={() => deleteHandler(+id)}
                              className="btn btn-sm btn-danger"
                              style={{ width: '100px' }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <LoadingBar />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Warna;
