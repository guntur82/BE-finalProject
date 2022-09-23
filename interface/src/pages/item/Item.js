import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import LoadingBar from '../../helpers/LoadingBar';
import { Link } from 'react-router-dom';
import { FiPlusSquare } from 'react-icons/fi';
import { deleteItem, getItem } from '../../axios/itemAxios';
import { getListItemWarna, getWarna } from '../../axios/warnaAxios';

const Item = () => {
  const API_img = 'http://localhost:3000/uploads/';
  const [item, setItem] = useState([]);
  const [listWarna, setListWarna] = useState([]);
  useEffect(() => {
    getListItemWarna((result) => setListWarna(result));
    getItem((result) => setItem(result));
  }, []);

  const deleteHandler = (id) => {
    deleteItem(id);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="row my-3 text-center">
        <div className="col-9 mx-auto">
          <div className="w-100">
            <Link to="/item/create" className="btn btn-sm btn-primary my-2">
              <span className="me-2">
                <FiPlusSquare></FiPlusSquare>
              </span>
              Tambah item
            </Link>
          </div>
          <div className="w-100">
            <table className="table table-border">
              <thead>
                <tr className="table-primary">
                  <th>No</th>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Deksripsi</th>
                  <th>Tanggal</th>
                  <th>Stok</th>
                  <th>Penjual</th>
                  <th>Brand</th>
                  <th>Warna</th>
                  <th>Gambar</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {item.length > 0 ? (
                  item.map((items, key) => {
                    const {
                      id,
                      name,
                      harga,
                      gambar,
                      deskripsi,
                      tanggal,
                      stok,
                      userId,
                      brandId,
                    } = items;
                    return (
                      <tr key={id}>
                        <td>{key + 1}</td>
                        <td>{name}</td>
                        <td>{harga}</td>
                        <td>{deskripsi}</td>
                        <td>{tanggal}</td>
                        <td>{stok}</td>
                        <td>{userId ? items.user.name : ' - '}</td>
                        <td>{brandId ? items.brand.nama : ' - '}</td>
                        <td>
                          {listWarna.map((data, i) => {
                            const { itemId, warnaId } = data;
                            if (id === itemId) {
                              return (
                                <div className="pallete" key={i}>
                                  <div className="kotak">
                                    <div
                                      className="box"
                                      style={{
                                        backgroundColor: data.warna.nama_warna,
                                        borderColor: 'black',
                                      }}
                                    >
                                      {/* <input
                                      style={{
                                        backgroundColor: data.warna.nama_warna,
                                        borderColor: 'black',
                                      }}
                                      type="checkbox"
                                      className="form-check-input"
                                    /> */}
                                      {/* <p>{data.warna.nama_warna}</p> */}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          })}
                        </td>
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
                            to={`/item/edit/${id}`}
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

export default Item;
