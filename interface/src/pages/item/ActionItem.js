import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import moment from 'moment';
import '../../App.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addItem, editItem, informationItem } from '../../axios/itemAxios';
import { getBrand } from '../../axios/brandAxios';
import { getDetailListItemWarna, getWarna } from '../../axios/warnaAxios';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { FiX } from 'react-icons/fi';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ActionItem = () => {
  const API_img = 'http://localhost:3000/uploads/';
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
        console.log(result);
        setForm({
          name: result.name,
          harga: result.harga,
          deskripsi: result.deskripsi,
          tanggal: result.tanggal,
          stok: result.stok,
          brandId: result.brandId,
          gambar: result.gambar,
        });
        setImg({ preview: API_img + result.gambar });
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
    if (kodewarna.warna !== undefined) {
      kodewarna.warna = kodewarna.warna.filter(function (item, pos) {
        return kodewarna.warna.indexOf(item) == pos;
      });
    }
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
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setWarna(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card my-5">
              <div className="row justify-content-end">
                <div className="col-2">
                  <Link to="/item">
                    <FiX></FiX>
                  </Link>
                </div>
              </div>
              <div className="card-body cardbody-color p-lg-5">
                <div className="text-center">
                  <h3>Tambah Item</h3>
                </div>
                <div className="mb-3">
                  <TextField
                    className="form-control"
                    required
                    id="outlined-password-input"
                    label="Name"
                    type="text"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    value={form.name}
                  />
                  {/* <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    value={form.name}
                    placeholder="Name..."
                  /> */}
                </div>
                <div className="mb-3">
                  <TextField
                    className="form-control"
                    required
                    id="outlined-password-input"
                    label="Harga"
                    type="number"
                    onChange={(e) =>
                      setForm({ ...form, harga: e.target.value })
                    }
                    value={form.harga}
                  />
                  {/* <input
                    type="number"
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, harga: e.target.value })
                    }
                    value={form.harga}
                    placeholder="Harga..."
                  /> */}
                </div>
                <div className="mb-3">
                  <TextField
                    required
                    className="form-control"
                    id="outlined-multiline-static"
                    label="Deskripsi"
                    multiline
                    rows={4}
                    onChange={(e) =>
                      setForm({ ...form, deskripsi: e.target.value })
                    }
                    value={form.deskripsi}
                  />
                  {/* <textarea
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, deskripsi: e.target.value })
                    }
                    value={form.deskripsi}
                    placeholder="Deskripsi..."
                  /> */}
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
                  <TextField
                    className="form-control"
                    required
                    id="outlined-password-input"
                    label="Stok"
                    type="number"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={(e) => setForm({ ...form, stok: e.target.value })}
                    value={form.stok}
                  />
                  {/* <input
                    type="text"
                    className="form-control"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={(e) => setForm({ ...form, stok: e.target.value })}
                    value={form.stok}
                    placeholder="Stok..."
                  /> */}
                </div>
                <div className="mb-3">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                    <Select
                      required
                      className="form-select"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Age"
                      placeholder="Pilih Brand"
                      onChange={(e) =>
                        setForm({ ...form, brandId: e.target.value })
                      }
                      value={form.brandId}
                    >
                      {/* <MenuItem>Pilih Brand</MenuItem> */}
                      {brand.map((brands, i) => {
                        const { id, nama } = brands;
                        return (
                          <MenuItem value={id} key={id}>
                            {nama}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  {/* <label>Brand :</label>
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
                  </select> */}
                </div>
                <label className="mb-3">Warna yang dimiliki :</label>
                {/* <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  onChange={handleChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {warna.map((warnas, i) => {
                    const { id, nama_warna } = warnas;
                    <MenuItem key={id} value={nama_warna}>
                      <Checkbox checked={warna.indexOf(warnas) > -1} />
                      <ListItemText primary={nama_warna} />
                    </MenuItem>;
                  })}
                </Select> */}

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
                        onChange={(e) => changeCheck(e.target.checked)}
                        style={{
                          backgroundColor: nama_warna,
                          borderColor: 'black',
                        }}
                        type="checkbox"
                        defaultChecked={warnas.check}
                        className="form-check-input"
                      />
                      {/* <div className="pallete">
                        <div className="kotak">
                          <div
                            className="box"
                            style={{
                              backgroundColor: nama_warna,
                              borderColor: 'black',
                            }}
                          ></div>
                        </div>
                      </div> */}

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
                    Simpan
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
