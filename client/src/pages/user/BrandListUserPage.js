import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // buat redirect
import { Link } from 'react-router-dom';
import { getData } from '../../axios/brandAxios';
import { getTransaksi, deleteTransaksi } from '../../axios/transaksiAxios';

const BrandListUserPage = () => {
  const API_img = 'http://localhost:4001/uploads/';
  const params = useParams();
  const { name } = params;
  const [brands, setBrands] = useState([]);
  const [transaksis, setTransaksis] = useState([]);
  useEffect(() => {
    getData((result) => setBrands(result));
    getTransaksi((result) => setTransaksis(result));
  });
  const deleteHandler = (id) => {
    deleteTransaksi(id);
  };
  return (
    <div className="my-3">
      <div className="w-100 text-center my-3">
        <h3>Welcome {name}</h3>
        <h3>List Brand</h3>
      </div>
      <div className="row my-3 text-center">
        <div className="col-sm-9 mx-auto">
          <div className="row">
            {brands.length > 0 ? (
              brands.map((brand) => {
                const { id, logo } = brand;
                return (
                  <div className="col-4 mb-3" key={id}>
                    <div className="card">
                      <div className="card-body">
                        <div className="home-icons">
                          <Link
                            to={
                              name !== undefined
                                ? `/user/brand/${id}/${name}`
                                : `/brand/z/${id}`
                            }
                          >
                            <img
                              src={logo ? API_img + logo : ''}
                              className="img-responsive"
                              alt="hp"
                              width={logo ? '200' : 0}
                              height={logo ? '200' : 0}
                            />
                          </Link>
                        </div>
                        <div className="home-title">
                          <h5>{brand.name}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                );
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

export default BrandListUserPage;
