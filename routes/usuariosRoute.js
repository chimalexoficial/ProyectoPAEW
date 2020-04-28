const express = require('express');
const router = express.Router();
const usuariosModel = require('../models/usuariosModel');

router.get('/', async (req, res) => {
  try {
    const obtenerUsuarios = await usuariosModel.find();
    res.json(obtenerUsuarios);
  } catch (err) {
    res.json({
      message: err
    });
  }
});


router.post('/', async (req, res) => {
  const nuevoUsuario = new usuariosModel({
    uid: req.body.uid,
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    direccion: req.body.direccion,
    email: req.body.email,
    edad: req.body.edad,
    password: req.body.password,
    celular: req.body.celular,
    foto: req.body.foto,
    estado: req.body.estado,
    profesionista: req.body.profesionista,
    favoritos: req.body.favoritos
  });

  console.log(req.body);

  try {
    const usuarioGuardado = await nuevoUsuario.save();
    res.json(usuarioGuardado);
  } catch (err) {
    if (res.status == 400)
      res.status(400).json({
        message: "No se puede procesar tu solicitud",
        error: err
      });

    else if (err.status == 401) {
      res.status(err.status).json({
        message: "No estas autorizado",
        error: err
      });

    } else if (res.status == 403) {
      res.status(500).json({
        message: "Algo salio mal :( !!",
        error: err
      });
    }
  }
});



//por ID de MongoDB
router.get('/:uid', async (req, res) => {
  //console.log(req.params.uid); //imprime uid recibido de url
  try {
    const usuarioEncontrado = await usuariosModel.findById({
      _id: req.params.uid
    });
    res.json(usuarioEncontrado);
  } catch (err) {
    if (res.status == 400)
      res.status(400).json({
        message: "No se puede procesar tu solicitud",
        error: err
      });

    else if (err.status == 401) {
      res.status(err.status).json({
        message: "No estas autorizado",
        error: err
      });

    } else if (res.status == 403) {
      res.status(500).json({
        message: "Algo salio mal :( !!",
        error: err
      });
    }
  }
});


//por uid correcto
router.delete('/:uid', async (req, res) => {
  try {
    const usuarioBorrado = await usuariosModel.deleteOne({
      uid: req.params.uid
    });
    res.json(usuarioBorrado);
  } catch (err) {
    if (res.status == 400)
      res.status(400).json({
        message: "No se puede procesar tu solicitud",
        error: err
      });

    else if (err.status == 401) {
      res.status(err.status).json({
        message: "No estas autorizado",
        error: err
      });

    } else if (res.status == 403) {
      res.status(500).json({
        message: "Algo salio mal :( !!",
        error: err
      });
    }
  }
})


router.put('/:uid', async (req, res) => {
  try {
    const usuarioActualizado = await usuariosModel.updateOne({
      uid: req.params.uid
    }, {
      $set: {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        direccion: req.body.direccion,
        email: req.body.email,
        edad: req.body.edad,
        password: req.body.password,
        celular: req.body.celular,
        foto: req.body.foto,
        estado: req.body.foto,
        favoritos: req.body.favoritos
      }
    })
    res.json(usuarioActualizado);
  } catch (err) {
    if (res.status == 400)
      res.status(400).json({
        message: "No se puede procesar tu solicitud",
        error: err
      });

    else if (err.status == 401) {
      res.status(err.status).json({
        message: "No estas autorizado",
        error: err
      });

    } else if (res.status == 403) {
      res.status(500).json({
        message: "Algo salio mal :( !!",
        error: err
      });
    }
  }
})

module.exports = router;