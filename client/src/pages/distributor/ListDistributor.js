import React,{useState, useEffect} from 'react';
import { FiPlusSquare } from 'react-icons/fi';
import LoadingBar from '../../helpers/LoadingBar';
import { Link } from 'react-router-dom';
import { deleteUser, getUser,} from '../../axios/distributorAxios';

const ListDistributor = () => {
  const [user, setUser] = useState([])

  useEffect(() => {
    getUser((result) => setUser(result))
  }, [])

  const deleteHandler = (id) => {
    deleteUser(id);
  };
  
  return (
    <div className="row my-3 text-center">
      <div className="col-9 mx-auto">
        <div className="w-100">
            <Link
              to="/main/distributor/create"
              className="btn btn-sm btn-primary my-2"
            >
              <span className="me-2">
                <FiPlusSquare></FiPlusSquare>
              </span>
              Add user
            </Link>
        
        </div>
        <div className="w-100">
          <table className="table table-border">
            <thead>
              <tr className="table-primary">
                <th>No</th>
                <th>Name</th>
                <th>No Hp</th>
                <th>Alamat</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {user.length > 0 ? (
                  user.map((users, key) => {
                    const { id, name, no_hp, alamat,} = users;
                    return (
                      <tr key={id}>
                        <td>{key + 1}</td>
                        <td>{name}</td>
                        <td>{no_hp}</td>
                        <td>{alamat}</td>
                        <td>
                          <Link
                            to={`/main/distributor/edit/${id}`}
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

export default ListDistributor;
