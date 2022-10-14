import axios from 'axios';
import Swal from 'sweetalert2';

const URL = 'http://localhost:3000/api/cart';

const getCart = async (cb) => {
  try {
    let result = await axios({
      method: 'GET',
      url: URL + '/all',
    });
    cb(result.data);
  } catch (error) {
    console.log(error);
  }
};

const editCart = async (id, data, cb) => {
  try {
    let result = await axios({
      method: 'PUT',
      url: URL + '/update/' + id,
      data: data,
    });
    cb(result);
  } catch (error) {
    console.log(error);
  }
};

const deleteCart = async (id) => {
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
          url: URL + '/delete/' + id,
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

export { getCart, editCart, deleteCart };
