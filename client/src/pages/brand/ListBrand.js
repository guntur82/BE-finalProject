import React, { useState, useEffect } from 'react';
import { FiPlusSquare } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import LoadingBar from '../../helpers/LoadingBar';
import { getData, deleteBrand } from '../../axios/brandAxios';

const ListBrand = () => {
  const API_img = 'http://localhost:4001/uploads/';
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    getData((result) => setBrands(result));
  });
  const deleteHandler = (id) => {
    deleteBrand(id);
  };
  return (
    <>
      <div className="row my-3 text-center">
        <div className="col-9 mx-auto">
          <div className="w-100">
            <Link
              to="/main/brand/create"
              className="btn btn-sm btn-primary my-2"
            >
              <span className="me-2">
                <FiPlusSquare></FiPlusSquare>
              </span>
              Add Brand
            </Link>
          </div>
          <div className="w-100">
            <table className="table table-border">
              <thead>
                <tr className="table-primary">
                  <th>No</th>
                  <th>Name</th>
                  <th>HomePage</th>
                  <th>Logo</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {brands.length > 0 ? (
                  brands.map((brand, key) => {
                    const { id, name, homepage, logo } = brand;
                    return (
                      <tr key={id}>
                        <td>{key + 1}</td>
                        <td>{name}</td>
                        <td>{homepage}</td>
                        <td>
                          <img
                            src={logo ? API_img + logo : ''}
                            className="img-thumbnail"
                            width={logo ? '100' : 0}
                            height={logo ? '100' : 0}
                          />
                        </td>
                        <td>
                          <Link
                            to={`/main/brand/edit/${id}`}
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

export default ListBrand;
