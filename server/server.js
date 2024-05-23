const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public')); // Serve static files
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.post('/upload-resume', upload.single('resume'), (req, res) => {
  const password = req.body.password;
  if (password === 'upload@vyk') {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
    const targetPath = path.join(__dirname, 'public', 'resume.pdf');
    fs.rename(file.path, targetPath, (err) => {
      if (err) return res.status(500).send('Error uploading file.');
      res.send('File uploaded successfully.');
    });
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
