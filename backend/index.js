 
 if(process.env.NODE_ENV === 'development'){
    require('dotenv').config();
 }
 
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path')
const router = require('./routes/books.routes')
const cors  = require('cors');


// inicilizar la app

const app = express();

// configuraciones.
const port = process.env.PORT || 3000;
require('./database')

// middlewares
app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
});

app.use(multer({storage}).single('image'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Archivos Estáticos.
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
//Routes

app.use('/', router);


app.listen(port, () => {
    console.log(`server on port ${port}`)
});