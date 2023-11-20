const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

// Ensure the uploads directory exists
const uploadsDir = './uploads';
fs.existsSync(uploadsDir) || fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir) // Save to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  // Accept JSON files only
  if (file.mimetype === 'application/json' || file.originalname.endsWith('.json')) {
    cb(null, true);
  } else {
    cb(new Error('Not a JSON file'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const app = express();
app.use(cors({
  origin: ['http://localhost:9000', 'http://localhost:44463'], // Frontend domains
  optionsSuccessStatus: 200
}));

app.post('/upload-json', upload.single('file'), (req, res) => {
  if (req.file) {
    fs.readFile(req.file.path, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading the file:', err);
        return res.status(500).json({ message: 'Error reading the file' });
      }

      // Assuming the file content is a JSON object
      const jsonData = JSON.parse(data);
      console.log(jsonData); // Print the JSON content to the server console

      // Save the JSON data to a single project data file
      fs.writeFile('./uploads/project-data.json', data, (writeErr) => {
        if (writeErr) {
          console.error('Error writing project data:', writeErr);
          return res.status(500).json({ message: 'Error writing project data' });
        }

        // Delete the uploaded file after saving project data
        fs.unlinkSync(req.file.path);

        res.json({ message: 'JSON data received', data: jsonData });
      });
    });
  } else {
    res.status(400).json({ message: 'No file received or the file is not a JSON file' });
  }
});

app.get('/get-project-data', (req, res) => {
  // Read the project data from the project data file
  fs.readFile('./uploads/project-data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading project data:', err);
      return res.status(500).json({ message: 'Error reading project data' });
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
