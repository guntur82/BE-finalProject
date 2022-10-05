import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import LoadingBar from '../../helpers/LoadingBar';
import { Link } from 'react-router-dom';
import { FiBold, FiPlusSquare } from 'react-icons/fi';
import { deleteWarna, getWarna } from '../../axios/warnaAxios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';

const Warna = () => {
  const [warna, setWarna] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  useEffect(() => {
    getWarna((result) => setWarna(result));
  }, []);
  const deleteHandler = (id) => {
    deleteWarna(id);
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#bfd1ec',
      fontSize: 20,
      color: theme.palette.common.black,
      fontStyle: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <Navbar></Navbar>
      <h3 className="mb-3 text-center">Warna</h3>
      <div className="row my-3 text-center">
        <div className="col-9 mx-auto">
          <div className="w-100">
            <div className="row justify-content-end">
              <div className="col-2">
                <Link
                  to="/warna/create"
                  className="btn btn-sm btn-primary my-2"
                >
                  <span className="me-2">
                    <FiPlusSquare></FiPlusSquare>
                  </span>
                  Tambah Warna
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
                    <StyledTableCell align="center">Warna</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {warna.length > 0 ? (
                    warna
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((warnas, key) => {
                        const { id, nama_warna } = warnas;
                        return (
                          <StyledTableRow key={id}>
                            <TableCell align="center">
                              {key + 1 + page * 5}
                            </TableCell>
                            <TableCell>
                              <div className="pallete" align="center">
                                <div className="kotak">
                                  <div
                                    className="box"
                                    style={{
                                      backgroundColor: nama_warna,
                                      borderColor: 'black',
                                    }}
                                  >
                                    <p>{nama_warna}</p>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell align="center">
                              <div
                                style={{
                                  paddingRight: '10px',
                                  paddingRight: '10px',
                                  paddingRight: '10px',
                                  paddingBottom: '10px',
                                }}
                              >
                                <Link
                                  to={`/warna/edit/${id}`}
                                  className="btn btn-sm btn-primary"
                                  style={{ width: '100px' }}
                                >
                                  Edit
                                </Link>
                              </div>
                              <div style={{ paddingRight: '10px' }}>
                                <button
                                  onClick={() => deleteHandler(+id)}
                                  className="btn btn-sm btn-danger"
                                  style={{ width: '100px' }}
                                >
                                  Delete
                                </button>
                              </div>
                            </TableCell>
                          </StyledTableRow>
                        );
                      })
                  ) : (
                    <LoadingBar />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={warna.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Warna;
