import axios from 'axios';
import Swal from 'sweetalert2';

const URL = 'http://localhost:4000/user';

const getUser = async (cb) => {
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

const addUser = async (data) => {
  try {
    let result = await axios({
      method: 'POST',
      url: URL + '/create',
      data: data,
    });
    Swal.fire(
      'Add user',
      'User ' + result.data.name + ' has been addes',
      'success'
    );
  } catch (error) {
    console.log(error);
  }
};

const editUser = async (id, data) => {
  try {
    await axios({
      method: 'PUT',
      url: URL + '/update/' + id,
      data: data,
    });
    Swal.fire('Edit user', 'User ' + data.name + ' has been update', 'success');
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
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
        await axios({
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

const informationUser = async (id, cb) => {
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

export { getUser, addUser, editUser, deleteUser, informationUser };
