import React, { useState, useEffect } from 'react';
import { FiPlusSquare } from 'react-icons/fi';
import LoadingBar from '../../helpers/LoadingBar';
import { Link } from 'react-router-dom';
import { deleteTransaksi, getTransaksi } from '../../axios/transaksiAxios';

const ListDistributor = () => {
  const [Transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    getTransaksi((result) => setTransaksi(result));
  }, []);

  const deleteHandler = (id) => {
    deleteTransaksi(id);
  };

  return (
    <div className="row my-3 text-center">
      <div className="col-9 mx-auto">
        <div className="w-100">
          {/* <Link
            to="/main/Transaction/create"
            className="btn btn-sm btn-primary my-2"
          >
            <span className="me-2">
              <FiPlusSquare></FiPlusSquare>
            </span>
            Add Transaction
          </Link> */}
        </div>
        <div className="w-100">
          <table className="table table-border">
            <thead>
              <tr className="table-primary">
                <th>No</th>
                <th>Name</th>
                <th>Alamat</th>
                <th>Tanggal</th>
                <th>Jumlah</th>
                <th>Total Harga</th>
                <th>Id Handphone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Transaksi.length > 0 ? (
                Transaksi.map((transaksis, key) => {
                  const {
                    id,
                    name,
                    alamat,
                    tanggal,
                    jumlah,
                    total_harga,
                    itemId,
                  } = transaksis;
                  return (
                    <tr key={id}>
                      <td>{key + 1}</td>
                      <td>{name}</td>
                      <td>{alamat}</td>
                      <td>{jumlah}</td>
                      <td>{tanggal}</td>
                      <td>
                        Rp.
                        {new Intl.NumberFormat('de-DE', {
                          prefix: 'Rp',
                          centsLimit: 0,
                          thousandsSeparator: '.',
                        }).format(total_harga)}
                      </td>
                      <td>{itemId}</td>
                      <td>
                        {/* <Link
                          to={`/main/transaction/edit/${id}`}
                          className="btn btn-sm btn-info"
                        >
                          Edit
                        </Link> */}
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
  );
};

export default ListDistributor;
