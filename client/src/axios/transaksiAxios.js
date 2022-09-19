import axios from 'axios';
import Swal from 'sweetalert2';

const URL = 'http://localhost:4001/transaksi';

const getTransaksi = async (cb) => {
  try {
    let user = await axios({
      method: 'GET',
      url: URL,
    });
    cb(user.data);
  } catch (error) {
    console.log(error);
  }
};

const addTransaksi = async (data) => {
  try {
    let result = await axios({
      method: 'POST',
      url: URL + '/create',
      data: data,
    });
    Swal.fire(
      'Add Transaksi',
      'Transaksi atas Nama ' + result.data.name + ' has been added',
      'success'
    );
  } catch (error) {
    console.log(error);
  }
};

const editTransaksi = async (id, data) => {
  try {
    await axios({
      method: 'PUT',
      url: URL + '/update/' + id,
      data: data,
    });
    Swal.fire(
      'Edit Transaksi ',
      'Data dengan Id : ' + data.id + ' has been update',
      'success'
    );
  } catch (error) {
    console.log(error);
  }
};

const deleteTransaksi = async (id) => {
  try {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // di routenya /delete from "get" to "delete" karena udh pake axios
        let result = await axios({
          method: 'DELETE',
          url: URL + '/delete/' + id,
        });
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        // window.location.reload();
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const informationTransaksi = async (id, cb) => {
  try {
    let result = await axios({
      method: 'GET',
      url: URL + '/information/' + id,
    });
    cb(result.data);
  } catch (error) {
    console.log(error);
  }
};

export {
  getTransaksi,
  addTransaksi,
  editTransaksi,
  deleteTransaksi,
  informationTransaksi,
};
