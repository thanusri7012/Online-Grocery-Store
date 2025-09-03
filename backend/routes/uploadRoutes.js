import express from 'express';
import upload from '../config/upload.js';

const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
  // On successful upload, Multer adds a 'file' object to the request.
  // We send back the path where the file was saved.
  res.send({
    message: 'Image Uploaded',
    image: `/${req.file.path.replace(/\\/g, "/")}`, // Format path for web
  });
});

export default router;