import axios from 'axios';
import Swal from 'sweetalert2';

const URL = 'http://localhost:3000/api/user';

const getUsers = async (cb) => {
  try {
    let users = await axios({
      method: 'GET',
      url: URL,
    });
    cb(users.data);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    Swal.fire({
      title: 'Apa anda yakin?',
      text: 'Anda tidak bisa mengembalikan data yang sudah dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, hapus!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios({
          method: 'DELETE',
          url: URL + '/' + id,
        });
        Swal.fire('Deleted!', 'Akun berhasil dihapus', 'success').then(() => {
          window.location.reload();
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (data, cb) => {
  try {
    let result = await axios({
      method: 'POST',
      url: URL,
      data: data,
      headers: { 'content-type': 'multipart/form-data' },
    });
    cb(result);
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (id, data, cb) => {
  try {
    let result = await axios({
      method: 'PUT',
      url: URL + '/' + id,
      data: data,
      headers: { 'content-type': 'multipart/form-data' },
    });
    cb(result);
  } catch (error) {
    console.log(error);
  }
};
const updateUserDetail = async (id, data, cb) => {
  try {
    let result = await axios({
      method: 'PUT',
      url: URL + '/userDetail/' + id,
      data: data,
      headers: { 'content-type': 'multipart/form-data' },
    });
    cb(result);
  } catch (error) {
    console.log(error);
  }
};

const dataUser = async (id, cb) => {
  try {
    let result = await axios({
      method: 'GET',
      url: URL + '/' + id,
    });
    cb(result.data);
  } catch (error) {
    console.log(error);
  }
};

const detailUser = async (form, cb) => {
  try {
    let result = await axios({
      method: 'POST',
      url: URL + '/account',
      data: form,
    });
    cb(result.data);
  } catch (error) {
    console.log(error);
  }
};

export {
  registerUser,
  detailUser,
  getUsers,
  deleteUser,
  dataUser,
  updateUser,
  updateUserDetail,
};
