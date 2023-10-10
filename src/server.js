const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

// Directorio de destino fuera de la carpeta de Angular
const destinationDirectory = path.join('assets/', 'products');

// Configurar multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destinationDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(bodyParser.json());

// Habilitar CORS
app.use(cors());

// Ruta para la carga de archivos
app.post('/api/upload', upload.array('file', 3), (req, res) => {
  console.log('Archivos recibidos:', req.files);
  res.status(200).send('Archivos subidos con éxito.');
});

// Servir archivos estáticos desde el directorio de destino
app.use('/uploads', express.static(destinationDirectory));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
