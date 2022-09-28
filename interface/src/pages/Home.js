import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LoadingBar from "../helpers/LoadingBar";
import { useNavigate } from "react-router-dom";
import { AiOutlineQuestion } from "react-icons/ai";
import { FiCheck } from "react-icons/fi";
import Swal from "sweetalert2";
import { deleteCart, editCart, getCart } from "../axios/cartAxios";

const Home = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/");
    }
    getCart((result) => setCart(result));
    // biar 1x load
    // }, []);
  });
  const deleteHandler = (id) => {
    deleteCart(id);
  };
  const [status, setStatus] = useState({
    status_barang: "",
    status_pengiriman: "",
  });
  const approveHandler = (id) => {
    status.status_barang = 1;
    status.status_pengiriman = 1;
    editCart(id, status, (result) => {
      if (result.data.message === "success") {
        Swal.fire("Success", "Pembaharuan berhasil", "success");
      } else {
        console.log(result);
      }
    });
  };
  return (
    <>
      <Navbar></Navbar>
      <h3 class="mb-3 text-center">Home</h3>
      <div className="row my-3 text-center">
        <div className="col-9 mx-auto">
          <div className="w-100">
            <table className="table table-border">
              <thead>
                <tr className="table-primary">
                  <th>No</th>
                  <th>Nama User</th>
                  <th>Nama Barang</th>
                  <th>Tanggal</th>
                  <th>Jumlah</th>
                  <th>Status Barang</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.length > 0 ? (
                  cart.map((carts, key) => {
                    const {
                      id,
                      jumlah,
                      tanggal,
                      status_barang,
                      status_pengiriman,
                    } = carts;
                    if (status_barang === 1) {
                      return (
                        <tr key={id}>
                          <td>{key + 1}</td>
                          <td>{carts.user.name}</td>
                          <td>{carts.item.name}</td>
                          <td>{tanggal}</td>
                          <td>{jumlah}</td>
                          <td>
                            {status_pengiriman === 0 ? (
                              <AiOutlineQuestion />
                            ) : (
                              <FiCheck />
                            )}
                          </td>
                          <td>
                            {status_pengiriman === 0 ? (
                              <>
                                <button
                                  onClick={() => approveHandler(+id)}
                                  className="btn btn-sm btn-primary"
                                >
                                  Terima
                                </button>
                                <button
                                  onClick={() => deleteHandler(+id)}
                                  className="btn btn-sm btn-danger"
                                >
                                  Tolak
                                </button>
                              </>
                            ) : (
                              <>-</>
                            )}
                          </td>
                        </tr>
                      );
                    }
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

export default Home;
