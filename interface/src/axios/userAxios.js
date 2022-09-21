import axios from 'axios';
import Swal from 'sweetalert2';

const URL = 'http://localhost:3000/api/user';

const registerUser = async (data) => {
  try {
    console.log(data);
    let result = await axios({
      method: 'POST',
      url: URL,
      data: data,
      headers: { 'content-type': 'multipart/form-data' },
    });
    Swal.fire(
      'Add User',
      'User ' + result.data.name + ' has been add',
      'success'
    );
  } catch (error) {
    console.log(error);
  }
};

const detailUser = async (form, cb) => {
  try {
    let result = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/user/account',
      data: form,
    });
    cb(result.data);
  } catch (error) {
    console.log(error);
  }
};

export { registerUser, detailUser };
