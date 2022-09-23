import axios from 'axios';
import Swal from 'sweetalert2';

const URL = 'http://localhost:3000/api/warna';
const URL_item_warna = 'http://localhost:3000/api/kodewarna';

const getWarna = async (cb) => {
  try {
    let warna = await axios({
      method: 'GET',
      url: URL,
    });
    cb(warna.data);
  } catch (error) {
    console.log(error);
  }
};

const addWarna = async (data, cb) => {
  try {
    let result = await axios({
      method: 'POST',
      url: URL,
      data: data,
    });
    cb(result);
  } catch (error) {
    console.log(error);
  }
};

const editWarna = async (id, data, cb) => {
  try {
    let result = await axios({
      method: 'PUT',
      url: URL + '/' + id,
      data: data,
    });
    cb(result);
  } catch (error) {
    console.log(error);
  }
};

const deleteWarna = async (id) => {
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

const informationWarna = async (id, cb) => {
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

const getListItemWarna = async (cb) => {
  try {
    let warna = await axios({
      method: 'GET',
      url: URL_item_warna,
    });
    cb(warna.data);
  } catch (error) {
    console.log(error);
  }
};

const getDetailListItemWarna = async (id, cb) => {
  try {
    let warna = await axios({
      method: 'GET',
      url: URL_item_warna + '/' + id,
    });
    cb(warna.data);
  } catch (error) {
    console.log(error);
  }
};

export {
  getWarna,
  addWarna,
  editWarna,
  deleteWarna,
  informationWarna,
  getListItemWarna,
  getDetailListItemWarna,
};
