import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // buat redirect
import { addBrand, informationBrand, editBrand } from '../../axios/brandAxios';

const ActionBrand = () => {
  const [form, setForm] = useState({
    name: '',
    homepage: '',
    logo: '',
  });
  const params = useParams();
  const [img, setImg] = useState();
  const onImageChange = (e) => {
    const [file] = e.target.files;
    file.isUploading = true;
    setImg({ preview: URL.createObjectURL(file), file: file });
    setForm({ ...form, logo: file.name });
  };
  const { id } = params;
  useEffect(() => {
    if (id) {
      informationBrand(+id, (result) => {
        setForm({
          name: result.name,
          homepage: result.homepage,
          logo: result.logo,
        });
      });
    }
  }, []);
  const navigation = useNavigate();
  let picture = img ? img.file : '';
  const submitHandler = () => {
    id ? editBrand(id, form, picture) : addBrand(form, picture);
    navigation('/main/brand');
  };
  return (
    <>
      <div className="row my-3">
        <div className="w-100 text-center">
          <h5>{id ? 'Edit Brand' : 'Create Brand'}</h5>
        </div>
        <div className="w-50 mx-auto">
          <hr />
          <div className="mb-3">
            <label>Name :</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Homepage :</label>
            <input
              value={form.homepage}
              onChange={(e) => setForm({ ...form, homepage: e.target.value })}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>logo :</label>
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
          <div>
            <div className="mb-3">
              <button
                onClick={() => submitHandler()}
                className="btn btn-block btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionBrand;
