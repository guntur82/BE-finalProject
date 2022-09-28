import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import LoadingBar from '../../helpers/LoadingBar';
import { Link } from 'react-router-dom';
import { FiPlusSquare } from 'react-icons/fi';
import { deleteItem, getItem, historyItem } from '../../axios/itemAxios';
import { getListItemWarna } from '../../axios/warnaAxios';

const Item = () => {
  const API_img = 'http://localhost:3000/uploads/';
  const [item, setItem] = useState([]);
  const [listWarna, setListWarna] = useState([]);
  const [history, setHistory] = useState([]);
  const [sorting, setSorting] = useState({
    data: '',
  });
  useEffect(() => {
    getListItemWarna((result) => setListWarna(result));
    historyItem((result) => setHistory(result));
    getItem((result) => setItem(result));
  }, []);
  const deleteHandler = (id) => {
    deleteItem(id);
  };

  return (
    <>
      <Navbar></Navbar>
      <h3 className="mb-3 text-center">Item</h3>

      <div className="row my-3 text-center">
        <div className="col-9 mx-auto">
          <div className="w-100 text-center my-3">
            <div className="row justify-content-end">
              <div className="col-">
                <Link to="/item/create" className="btn btn-sm btn-primary my-2">
                  <span className="me-2">
                    <FiPlusSquare></FiPlusSquare>
                  </span>
                  Tambah item
                </Link>
              </div>
            </div>
            <select
              className="form-select"
              style={{ width: 'auto' }}
              onChange={(e) => setSorting({ ...sorting, data: e.target.value })}
            >
              <option value="">Item</option>
              <option value="history">History Penambahan Item</option>
            </select>
          </div>
          <div className="w-100">
            <table className="table table-border">
              <thead>
                {sorting.data ? (
                  <tr className="table-primary">
                    <th>No</th>
                    <th>Nama User</th>
                    <th>Nama Barang</th>
                    <th>Jumlah</th>
                    <th>Tanggal</th>
                  </tr>
                ) : (
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
                )}
              </thead>
              <tbody>
                {sorting.data ? (
                  history.length > 0 ? (
                    history.map((historys, key) => {
                      const { id, jumlah, tanggal } = historys;
                      return (
                        <tr key={id}>
                          <td>{key + 1}</td>
                          <td>{historys.user.name}</td>
                          <td>{historys.item.name}</td>
                          <td>{historys.jumlah}</td>
                          <td>{historys.tanggal}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <LoadingBar />
                  )
                ) : item.length > 0 ? (
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
                        <td>
                          Rp.
                          {new Intl.NumberFormat('de-DE', {
                            prefix: 'Rp',
                            centsLimit: 0,
                            thousandsSeparator: '.',
                          }).format(harga)}
                        </td>
                        <td>{deskripsi}</td>
                        <td>{tanggal}</td>
                        <td>{stok}</td>
                        <td>{userId ? items.user.name : ' - '}</td>
                        <td>{brandId ? items.brand.nama : ' - '}</td>
                        <td>
                          {/* {listWarna.map((data, i) => {
                            const { itemId } = data;
                            if (id === itemId) {
                              return (
                                <div className="pallete" key={i}>
                                  <div className="kotak">
                                    <div
                                      className="box"
                                      style={{
                                        backgroundColor: data.warna.nama_warna,
                                        borderColor: "black",
                                      }}
                                    >
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          })} */}
                          <select>
                            {listWarna.map((data, i) => {
                              const { itemId } = data;
                              if (id === itemId) {
                                return (
                                  <option>
                                    <p>{data.warna.nama_warna}</p>
                                  </option>
                                );
                              }
                            })}
                          </select>
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
                          <div
                            style={{
                              paddingRight: '10px',
                              paddingBottom: '10px',
                            }}
                          >
                            <Link
                              to={`/item/edit/${id}`}
                              className="btn btn-sm btn-info"
                              style={{ width: '100px' }}
                            >
                              Edit
                            </Link>
                          </div>
                          <div
                            style={{
                              paddingRight: '10px',
                              paddingBottom: '10px',
                            }}
                          >
                            <Link
                              to={`/item/add/${id}`}
                              className="btn btn-sm btn-success"
                              style={{ width: '100px' }}
                            >
                              Tambah
                            </Link>
                          </div>
                          <div
                            style={{
                              paddingRight: '10px',
                              paddingBottom: '10px',
                            }}
                          >
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

export default Item;
