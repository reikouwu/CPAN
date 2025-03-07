import express from 'express';
import cors from 'cors';
import _ from 'lodash';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.static('uploads'));

const images = [
  // Add paths or URLs to your images here
  path.join(__dirname, 'uploads', 'image1.jpg'),
  path.join(__dirname, 'uploads', 'image2.jpg'),
  path.join(__dirname, 'uploads', 'image3.jpg'),
  path.join(__dirname, 'uploads', 'image4.jpg'),
  path.join(__dirname, 'uploads', 'image5.jpg'),
];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.get('/fetch/single', (req, res) => {
  const randomImage = _.sample(images);
  res.sendFile(randomImage);
});

app.get('/fetch/multiple', (req, res) => {
  const randomImages = _.sampleSize(images, 3);
  const imageUrls = randomImages.map(image => `/uploads/${path.basename(image)}`);
  res.json({ images: imageUrls });
});

app.post('/save/single', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});