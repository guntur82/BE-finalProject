import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getData } from '../../axios/itemAxios';
import { getTransaksi, deleteTransaksi } from '../../axios/transaksiAxios';

const BrandUserPage = () => {
  const API_img = 'http://localhost:4001/uploads/';
  const params = useParams();
  const { name, id } = params;
  const [filter, setFilter] = useState({
    data: '',
    order: '',
  });
  const [items, setItems] = useState([]);
  const [transaksis, setTransaksis] = useState([]);
  useEffect(() => {
    getData((result) => setItems(result), filter);
    getTransaksi((result) => setTransaksis(result));
  });
  const deleteHandler = (id) => {
    deleteTransaksi(id);
  };
  return (
    <div className="my-3">
      <div className="w-100 text-center my-3">
        <h3>Welcome {name}</h3>
        <select
          className="form-select"
          style={{ width: 'auto' }}
          onChange={(e, a = e.target.value.split('-')) =>
            setFilter({ ...filter, data: a[0], order: a[1] })
          }
        >
          <option value="">-Paling Sesuai-</option>
          <option value="createdAt-asc">Terbaru</option>
          <option value="harga-desc">Harga Tertinggi</option>
          <option value="harga-asc">Harga Terendah</option>
          <option value="stock-desc">Stock Terbanyak</option>
          <option value="stock-asc">Stock Terendah</option>
        </select>
      </div>
      <div className="row my-3 text-center">
        <div className="col-sm-9 mx-auto">
          <div className="row">
            {items.length > 0 ? (
              items.map((item) => {
                const { harga, gambar, stock } = item;
                if (item.brandId === +id) {
                  return (
                    <div className="col-4 mb-3" key={item.id}>
                      <div className="card">
                        <div className="card-body">
                          <div className="home-icons">
                            <Link
                              to={
                                name !== undefined
                                  ? `/user/${name}/add/${item.id}`
                                  : `/home/error`
                              }
                            >
                              <img
                                src={gambar ? API_img + gambar : ''}
                                className="img-responsive"
                                alt="hp"
                                width={gambar ? '200' : 0}
                                height={gambar ? '200' : 0}
                              />
                            </Link>
                          </div>
                          <div className="home-title">
                            <h5>{item.name}</h5>
                            <h5>
                              Rp.
                              {new Intl.NumberFormat('de-DE', {
                                prefix: 'Rp',
                                centsLimit: 0,
                                thousandsSeparator: '.',
                              }).format(harga)}
                            </h5>
                            <p className="card-text">
                              <small className="text-muted">
                                {stock !== 0
                                  ? `Stock : ${stock}`
                                  : `Out of Stock`}
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })
            ) : (
              <div>LoadingBar</div>
            )}
          </div>
        </div>
        <div className="col-sm-3 mx-auto">
          <p>Transaksi</p>
          {transaksis.length > 0 ? (
            transaksis.map((transaksi) => {
              const { id, alamat, tanggal, jumlah, total_harga } = transaksi;
              if (transaksi.name === name) {
                return (
                  <div
                    className="card mb-3 w-auto p-auto"
                    // style={{ width: '230px', height: '100px' }}
                    key={id}
                  >
                    <div className="row no-gutters">
                      <div className="col-md-4">
                        <img
                          src={
                            transaksi.item.gambar
                              ? API_img + transaksi.item.gambar
                              : ''
                          }
                          className="img-fluid rounded-start"
                          alt="hp"
                          width={transaksi.item.gambar ? '300px' : 0}
                          height={transaksi.item.gambar ? '300px' : 0}
                        />
                        {transaksi.item.name}
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <ul
                            className="list-unstyled"
                            style={{ textAlign: 'left' }}
                          >
                            <li className="card-text">
                              <b>Jumlah</b> : {jumlah}
                            </li>
                            <li className="card-text">
                              <b>Total Harga</b> : Rp.
                              {new Intl.NumberFormat('de-DE', {
                                prefix: 'Rp',
                                centsLimit: 0,
                                thousandsSeparator: '.',
                              }).format(total_harga)}
                            </li>
                            <li className="card-text">
                              <b>Alamat</b> : {alamat}
                            </li>
                            <li className="card-text">
                              <b>Tanggal</b> : {tanggal.split(' ')[0]}
                            </li>
                          </ul>
                          <button
                            onClick={() => deleteHandler(+id)}
                            className="btn btn-sm btn-danger"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <div>Don't have any transactions</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandUserPage;
