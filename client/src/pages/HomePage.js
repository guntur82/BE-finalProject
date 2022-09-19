import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../App.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // buat redirect

const HomePage = () => {
  const [form, setForm] = useState({
    name: '',
  });
  const enterAction = (event) => {
    if (event.keyCode === 13) {
      submitHandler();
    }
  };
  const navigation = useNavigate();
  const params = useParams();
  const { status } = params;
  if (status === 'error') {
    Swal.fire(`Don't have name!`, 'Please input ur name?', 'question').then(
      function () {
        navigation(`/home`);
      }
    );
  }
  const submitHandler = () => {
    // buat redirect
    if (form.name) {
      navigation(`/user/${form.name}`);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please input ur name',
      });
    }
  };
  const mainHandler = () => {
    // buat redirect
    navigation('/main/');
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-dark mt-5">Login Form</h2>
          <div className="card my-5">
            <form className="card-body cardbody-color p-lg-5">
              <div className="text-center">
                <h3>Keltwoe Ponsel Apps</h3>
                <p>Welcome to my Apps.</p>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onKeyDown={(action) => enterAction(action)}
                  placeholder="Nama Pelanggan..."
                />
              </div>
              <div className="text-center">
                <button
                  onClick={() => submitHandler()}
                  className="btn btn-color px-5 mb-5 w-100"
                >
                  Login
                </button>
              </div>
              <div className="form-text text-center mb-5 text-dark">
                <button onClick={() => mainHandler()} className="btn btn-light">
                  Staff
                </button>
              </div>
              <Link className="text-dark fw-bold" to="/">
                Back to Dashboard
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
    // <div className="my-5">
    //   <div className="w-100 text-center my-3">
    //     <h3>HomePage</h3>
    //     <p>Welcome to my Apps.</p>
    //   </div>
    //   <div className="row my-3 text-center">
    //     <div className="col-3 mx-auto">
    //       <div className="row">
    //         <div className="card">
    //           <div className="card-body">
    //             <div className="home-title">
    //               <h5>Keltwoe Ponsel Apps</h5>
    //             </div>
    //             <div className="form-group">
    //               <input
    //                 type="text"
    //                 className="form-control"
    //                 onChange={(e) => setForm({ ...form, name: e.target.value })}
    //                 onKeyDown={(action) => enterAction(action)}
    //                 placeholder="Nama Pelanggan..."
    //               />
    //             </div>
    //             <button
    //               onClick={() => submitHandler()}
    //               className="my-3 btn btn-primary btn-user btn-block"
    //             >
    //               Pesan
    //             </button>
    //             <hr />
    //             <div className="text-center mb-3">
    //               <button onClick={() => mainHandler()} className="small">
    //                 Masuk sebagai staff
    //               </button>
    //             </div>
    //             <div className="text-center">
    //               <Link className="small" to="/">
    //                 Back to Dashboard
    //               </Link>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default HomePage;
