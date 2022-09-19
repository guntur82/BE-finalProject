require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//cors
const cors = require('cors');
app.use(cors());

//requirment for uploading in react
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        '-' +
        path.parse(file.originalname).name +
        path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });
// upload image
app.post('/upload', upload.single('picture'), (req, res) => {
  let finalImageUrl =
    req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
  res.json({
    status: 'success',
    image: finalImageUrl,
    name: req.file.filename,
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes');
app.use(routes);

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
