import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import moment from 'moment';
import '../../App.css';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addItem, editItem, informationItem } from '../../axios/itemAxios';
import { getBrand } from '../../axios/brandAxios';
import { getDetailListItemWarna, getWarna } from '../../axios/warnaAxios';

const ActionItem = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    harga: '',
    gambar: '',
    deskripsi: '',
    tanggal: moment().format('YYYY-MM-DD'),
    stok: '',
    brandId: '',
  });
  const [brand, setBrand] = useState([]);
  const [warna, setWarna] = useState([]);
  const [kodewarna, setKodeWarna] = useState([]);
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    getBrand((result_brand) => setBrand(result_brand));
    getWarna((result_warna) => setWarna(result_warna));
    if (id) {
      getDetailListItemWarna(+id, (result_kode_warna) =>
        //   setKodeWarna(result_kode_warna)
        // );

        result_kode_warna.forEach((data) => {
          listColorKode(data.warnaId);
        })
      );
      informationItem(+id, (result) => {
        setForm({
          name: result.name,
          harga: result.harga,
          deksripsi: result.deksripsi,
          tanggal: result.tanggal,
          stok: result.stok,
          brandId: result.brandId,
        });
      });
    }
  }, []);
  const [img, setImg] = useState();
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg({ preview: URL.createObjectURL(file), file: file });
    setForm({ ...form, gambar: e.target.files[0] });
  };

  const listColorKode = (id) => {
    let arrayColor = [];
    arrayColor = kodewarna;
    arrayColor.push(id);

    setKodeWarna({ warna: arrayColor });
  };

  const listColor = (e, id) => {
    let arrayColor = [];
    if (e) {
      if (form.warna === undefined) {
        form.warna = [];
      }
      arrayColor = form.warna;
      arrayColor.push(id);
      setForm({ ...form, warna: arrayColor });
    } else {
      if (form.warna !== undefined) {
        arrayColor = form.warna.filter((data) => data !== id);
        setForm({ ...form, warna: arrayColor });
      } else {
        arrayColor = kodewarna.warna.filter((data) => data !== id);
        setKodeWarna({ warna: arrayColor });
      }
    }
  };
  const submitHandler = () => {
    // buat redirect
    console.log(kodewarna.warna);
    console.log(form.warna);
    if (form.warna === undefined) {
      form.warna = [];
    }
    let mix = form.warna.concat(kodewarna.warna);
    let removeDuplicate = mix.filter(function (item, pos) {
      return mix.indexOf(item) == pos;
    });
    form.warna = removeDuplicate;
    console.log(form);
    id
      ? editItem(id, form, localStorage.access_token, (result) => {
          if (result.data.message === 'success') {
            Swal.fire('Success', 'Pembaharuan berhasil', 'success').then(() => {
              navigate('/item');
            });
          } else {
            console.log(result);
          }
        })
      : addItem(form, localStorage.access_token, (result) => {
          if (result.data.message === 'success') {
            Swal.fire('Success', 'Berhasil ditambahkan', 'success').then(() => {
              navigate('/item');
            });
          } else {
            console.log(result);
          }
        });
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card my-5">
              <div className="card-body cardbody-color p-lg-5">
                <div className="text-center">
                  <h3>Item</h3>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    value={form.name}
                    placeholder="Name..."
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, harga: e.target.value })
                    }
                    value={form.harga}
                    placeholder="Harga..."
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, deskripsi: e.target.value })
                    }
                    value={form.deskripsi}
                    placeholder="Deskripsi..."
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, tanggal: e.target.value })
                    }
                    value={form.tanggal}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setForm({ ...form, stok: e.target.value })}
                    value={form.stok}
                    placeholder="Stok..."
                  />
                </div>
                <div className="mb-3">
                  <label>Brand :</label>
                  <select
                    className="form-select"
                    onChange={(e) =>
                      setForm({ ...form, brandId: e.target.value })
                    }
                    value={form.brandId}
                  >
                    <option value="">-Pilih Brand-</option>
                    {brand.map((brands, i) => {
                      const { id, nama } = brands;
                      return (
                        <option value={id} key={id}>
                          {nama}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <label className="mb-3">Warna yang dimiliki :</label>
                {warna.map((warnas, i) => {
                  warnas.check = false;
                  const { id, nama_warna } = warnas;
                  const changeCheck = (e) => {
                    warnas.check = !warnas.check;
                    listColor(e, id);
                  };
                  if (kodewarna.warna !== undefined) {
                    let status = kodewarna.warna.filter((data) => data === id);
                    if (status.length > 0) {
                      warnas.check = !warnas.check;
                      // listColor(true, id);
                      // changeCheck(true)
                    }
                  }
                  return (
                    <div className="mb-3" key={id}>
                      <input
                        style={{
                          backgroundColor:
                            nama_warna !== '#ffffff' ? nama_warna : '',
                        }}
                        onChange={(e) => changeCheck(e.target.checked)}
                        type="checkbox"
                        defaultChecked={warnas.check}
                        className="form-check-input"
                      />

                      <label className="form-check-label"> {nama_warna}</label>
                    </div>
                  );
                })}
                <div className="mb-3">
                  <label>Gambar :</label>
                  <input
                    onChange={onImageChange}
                    type="file"
                    className="form-control"
                  />
                  <img
                    src={img ? img.preview : ''}
                    className="img-thumbnail"
                    width={img ? '200' : 0}
                    height={img ? '200' : 0}
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={() => submitHandler()}
                    className="btn btn-color px-5 mb-5 w-100"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionItem;
