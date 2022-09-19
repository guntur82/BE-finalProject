import React, { useState, useEffect } from 'react';
import { FiPlusSquare } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import LoadingBar from '../../helpers/LoadingBar';
import { getData, deleteItem } from '../../axios/itemAxios';

const ListItem = () => {
  const API_img = 'http://localhost:4001/uploads/';
  const [items, setItems] = useState([]);
  useEffect(() => {
    getData((result) => setItems(result));
  });
  const deleteHandler = (id) => {
    deleteItem(id);
  };
  return (
    <div className="row my-3 text-center">
      <div className="col-9 mx-auto">
        <div className="w-100">
          <Link to="/main/item/create" className="btn btn-sm btn-primary my-2">
            <span className="me-2">
              <FiPlusSquare></FiPlusSquare>
            </span>
            Add Item
          </Link>
        </div>
        <div className="w-100">
          <table className="table table-border">
            <thead>
              <tr className="table-primary">
                <th>No</th>
                <th>Name</th>
                <th>Harga</th>
                <th>Gambar</th>
                <th>Stok</th>
                <th>Distributor</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item, key) => {
                  const { id, name, harga, gambar, stock } = item;
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
                      <td>
                        <img
                          src={gambar ? API_img + gambar : ''}
                          className="img-thumbnail"
                          width={gambar ? '100' : 0}
                          height={gambar ? '100' : 0}
                        />
                      </td>
                      <td>{stock}</td>
                      <td>{item.user ? item.user.name : '-'}</td>
                      <td>{item.brand ? item.brand.name : '-'}</td>
                      <td>
                        <Link
                          to={`/main/item/edit/${id}`}
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
  );
};

export default ListItem;
