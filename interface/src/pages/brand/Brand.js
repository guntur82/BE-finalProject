import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import LoadingBar from "../../helpers/LoadingBar";
import { Link } from "react-router-dom";
import { FiPlusSquare } from "react-icons/fi";
import { deleteBrand, getBrand } from "../../axios/brandAxios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Brand = () => {
  const API_img = "http://localhost:3000/uploads/";
  const [brand, setBrand] = useState([]);
  useEffect(() => {
    getBrand((result) => setBrand(result));
  }, []);
  const deleteHandler = (id) => {
    deleteBrand(id);
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
      <h3 className="mb-3 text-center">Brand</h3>
      <div className="row my-3 text-center">
        <div className="col-9 mx-auto">
          <div className="w-100">
            <div className="row justify-content-end">
              <div className="col-2">
                <Link
                  to="/brand/create"
                  className="btn btn-sm btn-primary my-2"
                >
                  <span className="me-2">
                    <FiPlusSquare></FiPlusSquare>
                  </span>
                  Tambah Brand
                </Link>
              </div>
            </div>
          </div>
          <div className="w-100">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 750 }} aria-label="simple table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="center">No.</StyledTableCell>
                    <StyledTableCell align="center">Nama Brand</StyledTableCell>
                    <StyledTableCell align="center">Logo</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {brand.length > 0 ? (
                    brand.map((brands, key) => {
                      const { id, nama, logo } = brands;
                      return (
                        <StyledTableRow key={id}>
                          <StyledTableCell align="center">
                            {key + 1}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {nama}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <img
                              alt="gambar"
                              src={logo ? API_img + logo : ""}
                              className="img-thumbnail"
                              width={logo ? "100" : 0}
                              height={logo ? "100" : 0}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <div
                              style={{
                                paddingRight: "10px",
                                paddingRight: "10px",
                                paddingBottom: "10px",
                              }}
                            >
                              <Link
                                to={`/brand/edit/${id}`}
                                className="btn btn-sm btn-primary"
                                style={{ width: "100px" }}
                              >
                                Edit
                              </Link>
                            </div>
                            <div style={{ paddingRight: "10px" }}>
                              <button
                                onClick={() => deleteHandler(+id)}
                                className="btn btn-sm btn-danger"
                                style={{ width: "100px" }}
                              >
                                Delete
                              </button>
                            </div>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
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

export default Brand;
