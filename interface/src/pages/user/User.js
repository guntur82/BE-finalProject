import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import LoadingBar from '../../helpers/LoadingBar';
import { Link } from 'react-router-dom';
import { FiPlusSquare } from 'react-icons/fi';
import { deleteUser, getUsers } from '../../axios/userAxios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const User = () => {
  const API_img = 'http://localhost:3000/uploads/';
  const [user, setUser] = useState([]);
  useEffect(() => {
    getUsers((result) => setUser(result));
  }, []);
  const deleteHandler = (id) => {
    deleteUser(id);
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      fontSize: 20,
      backgroundColor: '#bfd1ec',
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
  return (
    <>
      <Navbar></Navbar>
      <h3 className="mb-3 text-center">User</h3>
      <div className="row my-3 text-center">
        <div className="col-9 mx-auto">
          <div className="row justify-content-end">
            <div className="col-2">
              <Link to="/user/create" className="btn btn-sm btn-primary my-2">
                <span className="me-2">
                  <FiPlusSquare></FiPlusSquare>
                </span>
                Tambah User
              </Link>
            </div>
          </div>
          <div className="w-100">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 750 }} aria-label="simple table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="center">No.</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">No Hp</StyledTableCell>
                    <StyledTableCell align="center">Alamat</StyledTableCell>
                    <StyledTableCell align="center">Level</StyledTableCell>
                    <StyledTableCell align="center">Gambar</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {user.length > 0 ? (
                    user.map((users, key) => {
                      const { id, email, name, no_hp, alamat, level, gambar } =
                        users;
                      return (
                        <StyledTableRow key={id}>
                          <TableCell align="center">{key + 1}</TableCell>
                          <TableCell align="center">{email}</TableCell>
                          <TableCell align="center">{name}</TableCell>
                          <TableCell align="center">{no_hp}</TableCell>
                          <TableCell align="center">{alamat}</TableCell>
                          <TableCell align="center">{level}</TableCell>
                          <TableCell align="center">
                            <img
                              alt="gambar"
                              src={gambar ? API_img + gambar : ''}
                              className="img-thumbnail"
                              width={gambar ? '100' : 0}
                              height={gambar ? '100' : 0}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <div
                              style={{
                                paddingRight: '10px',
                                paddingBottom: '10px',
                              }}
                            >
                              <Link
                                to={`/user/edit/${id}`}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
