import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LoadingBar from "../helpers/LoadingBar";
import { useNavigate } from "react-router-dom";
import { AiOutlineQuestion } from "react-icons/ai";
import { FiCheck } from "react-icons/fi";
import Swal from "sweetalert2";
import { deleteCart, editCart, getCart } from "../axios/cartAxios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

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
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#bfd1ec",
      color: theme.palette.common.black,
      fontStyle: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  return (
    <>
      <Navbar></Navbar>
      <h3 className="mb-3 text-center">Home</h3>
      <div className="row my-3 text-center">
        <div className="col-9 mx-auto">
          <div className="w-100">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 750 }} aria-label="simple table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="center">No.</StyledTableCell>
                    <StyledTableCell align="center">Nama User</StyledTableCell>
                    <StyledTableCell align="center">
                      Nama Barang
                    </StyledTableCell>
                    <StyledTableCell align="center">Tanggal</StyledTableCell>
                    <StyledTableCell align="center">Jumlah</StyledTableCell>
                    <StyledTableCell align="center">
                      Status Barang
                    </StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
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
                          <StyledTableRow key={id}>
                            <StyledTableCell>{key + 1}</StyledTableCell>
                            <StyledTableCell>{carts.user.name}</StyledTableCell>
                            <StyledTableCell>{carts.item.name}</StyledTableCell>
                            <StyledTableCell>{tanggal}</StyledTableCell>
                            <StyledTableCell>{jumlah}</StyledTableCell>
                            <StyledTableCell>
                              {status_pengiriman === 0 ? (
                                <AiOutlineQuestion />
                              ) : (
                                <FiCheck />
                              )}
                            </StyledTableCell>
                            <StyledTableCell>
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
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      }
                    })
                  ) : (
                    <LoadingBar />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
