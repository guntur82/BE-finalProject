import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import LoadingBar from '../../helpers/LoadingBar';
import { Link } from 'react-router-dom';
import { FiPlusSquare } from 'react-icons/fi';
import { deleteUser, getUsers } from '../../axios/userAxios';

const User = () => {
  const API_img = 'http://localhost:3000/uploads/';
  const [user, setUser] = useState([]);
  useEffect(() => {
    getUsers((result) => setUser(result));
  }, []);
  const deleteHandler = (id) => {
    deleteUser(id);
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="row my-3 text-center">
        <div className="col-9 mx-auto">
          <div className="w-100">
            <Link to="/user/create" className="btn btn-sm btn-primary my-2">
              <span className="me-2">
                <FiPlusSquare></FiPlusSquare>
              </span>
              Tambah user
            </Link>
          </div>
          <div className="w-100">
            <table className="table table-border">
              <thead>
                <tr className="table-primary">
                  <th>No</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>No Hp</th>
                  <th>Alamat</th>
                  <th>Level</th>
                  <th>Gambar</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {user.length > 0 ? (
                  user.map((users, key) => {
                    const { id, email, name, no_hp, alamat, level, gambar } =
                      users;
                    return (
                      <tr key={id}>
                        <td>{key + 1}</td>
                        <td>{email}</td>
                        <td>{name}</td>
                        <td>{no_hp}</td>
                        <td>{alamat}</td>
                        <td>{level}</td>
                        <td>
                          <img
                            alt="gambar"
                            src={gambar ? API_img + gambar : ''}
                            className="img-thumbnail"
                            width={gambar ? '100' : 0}
                            height={gambar ? '100' : 0}
                          />
                        </td>
                        <td>
                          <Link
                            to={`/user/edit/${id}`}
                            className="btn btn-sm btn-info"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteHandler(+id)}
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>
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

export default User;
