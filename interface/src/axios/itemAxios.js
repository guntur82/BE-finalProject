import axios from 'axios';
import Swal from 'sweetalert2';

const URL = 'http://localhost:3000/api/item';

const getItem = async (cb) => {
  try {
    let result = await axios({
      method: 'GET',
      url: URL,
    });
    cb(result.data);
  } catch (error) {
    console.log(error);
  }
};

const addItem = async (data, access_token, cb) => {
  try {
    let result = await axios({
      method: 'POST',
      url: URL,
      data: data,
      headers: {
        'content-type': 'multipart/form-data',
        auth: access_token,
      },
    });
    cb(result);
  } catch (error) {
    console.log(error);
  }
};

const editItem = async (id, data, access_token, cb) => {
  try {
    let result = await axios({
      method: 'PUT',
      url: URL + '/' + id,
      data: data,
      headers: {
        'content-type': 'multipart/form-data',
        auth: access_token,
      },
    });
    console.log(result);
    cb(result);
  } catch (error) {
    console.log(error);
  }
};

const deleteItem = async (id) => {
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
        Swal.fire('Deleted!', 'Data berhasil dihapus', 'success').then(() => {
          window.location.reload();
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const informationItem = async (id, cb) => {
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

export { getItem, addItem, editItem, deleteItem, informationItem };
