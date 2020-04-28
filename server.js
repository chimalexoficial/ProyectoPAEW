const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./doc/swagger.json');
var busboy = require('connect-busboy');
const fileUpload = require('express-fileupload');
const validUrl = require('valid-url');

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(bodyParser.json());
app.use(busboy());
app.use(fileUpload()); // Don't forget this line!


//importacion de routes
const usuariosRoute = require('./routes/usuariosRoute');
const profesionistasRoute = require('./routes/profesionistasRoute');
const serviciosRoute = require('./routes/serviciosRoute');
const calificacionRoute = require('./routes/calificacionRoute');
const authRoute = require('./routes/authRoute');


app.use('/usuarios', usuariosRoute);
app.use('/profesionistas', profesionistasRoute);
app.use('/servicios', serviciosRoute);
app.use('/calificacion', calificacionRoute);
app.use('/auth', authRoute);
app.use(bodyParser.urlencoded({
    extended: true
}));




//routes

app.get('/', (req, res) => {
    try {
        //console.log("ddf");
        res.render('registroUsuario');
    } catch (err) {
        if (res.status == 404)
            res.status(404).json({
                message: "Peticion no encontrada",
                error: err
            });
        else if (err.status < 500) {
            res.status(err.status).json({
                message: "Error de cliente",
                error: err
            });
        } else
            res.status(500).json({
                message: "Algo salio mal :( !!",
                error: err
            });
    }
});



// conexion de BD
mongoose.connect(
    process.env.DB_CONNECTION, {
        useUnifiedTopology: true
    }/*,
    () => console.log('Conectado a MongoDB')*/
);

const AWS = require('aws-sdk');
const Busboy = require('busboy');

const BUCKET_NAME = 'pae2020';
const IAM_USER_KEY = 'AKIAWZONVNHI3NET4KEL';
const IAM_USER_SECRET = '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';

function uploadToS3(file) {
    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME
    });
    s3bucket.createBucket(function () {
        var params = {
            Bucket: BUCKET_NAME,
            Key: file.name,
            Body: file.data
        };
        s3bucket.upload(params, function (err, data) {
            if (err) {
                console.log('error in callback');
                console.log(err);
            }
            console.log('success');
            console.log(data);
        });
    });
}


//"element1": "test", "element2": image file

app.post('/api/upload', function (req, res, next) {

    const element1 = req.body.element1;

    var busboy = new Busboy({
        headers: req.headers
    });

    busboy.on('finish', function () {
        console.log('Upload finished');


        // {
        //    element2: {
        //      data: ...contents of the file...,
        //      name: 'Example.jpg',
        //      encoding: '7bit',
        //      mimetype: 'image/png',
        //      truncated: false,
        //      size: 959480
        //    }
        // }

        // Desde request
        const file = req.files.element2;
        console.log(file);

        // SUBIR ARCHIVO A BUCKET
        uploadToS3(file);
    });

    req.pipe(busboy);
});


app.listen(port, err => {
    if (err) {
        return console.log("ERROR");
    }
    console.log(`Listening on port: ${port}`);
})

module.exports = app;