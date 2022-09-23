import axios from 'axios';
import Swal from 'sweetalert2';

const URL = 'http://localhost:3000/api/brand';

const getBrand = async (cb) => {
  try {
    let brand = await axios({
      method: 'GET',
      url: URL,
    });
    cb(brand.data);
  } catch (error) {
    console.log(error);
  }
};

const addBrand = async (data, cb) => {
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

const editBrand = async (id, data, cb) => {
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

const deleteBrand = async (id) => {
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

const informationBrand = async (id, cb) => {
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

export { getBrand, addBrand, editBrand, deleteBrand, informationBrand };
