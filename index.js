const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const PORT = process.env.PORT || 9000;
const path = require('path');
const multer = require('multer');

const app = express();
const personaController = require('./controllers/personaController')

//Middelwares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(morgan('common'));

//Configuramos Multer
const storage = multer.diskStorage({ 
    destination: function(req, file, callback) {
        console.log(file);
        callback(null, 'uploads')
    }, 
    filename: function(req, file, callback){
        callback(null, `${file.originalname}`)
    }
});

//Pasamos la configuración a Multer
const uploads = multer({ storage: storage })

app.get('/datos', async (req, res) => {
    res.json({
        datos: await personaController.findAll()
    });
});

app.post('/crear', async (req, res) => {
    const { nombre, apellido, email } = req.body;
    console.log(`${nombre} - ${apellido} - ${email}`);

    await personaController.create(req.body)

    res.send('Persona Creada')
})

app.delete('/:id', (req, res) => {
    res.send('Persona Eliminada')
})

app.put('/:id', (req, res) => {
    res.send('Persona Actualizada')
})

app.post('/subir', uploads.single('miArchivo') , (req, res, next) => {
    const file = req.file;

    if(!file){
        const error = new Error('Error subiendo el archivo')
        error.httpStatusCode=404
        return next(error)
    }
    res.send(`Archivo <b>${file.originalname}</b> subido correctamente`)
})

app.listen(PORT, ()=>{
    console.log(`MERN trabajando en el Puerto ${PORT}`);
});

