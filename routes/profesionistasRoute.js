const express = require('express');
const router = express.Router();
const profesionistasModel = require('../models/profesionistasModel');


router.get('/', async (req, res) => {
  try {
    const obtenerProfesionistas = await profesionistasModel.find();
    res.json(obtenerProfesionistas);
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

router.post('/', async (req, res) => {
  const nuevoProfesionista = new profesionistasModel({
    uid: req.body.uid,
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    trabajosRealizados: req.body.trabajosRealizados,
    direccion: req.body.direccion,
    email: req.body.email,
    edad: req.body.edad,
    password: req.body.password,
    celular: req.body.celular,
    foto: req.body.foto,
    estado: req.body.foto,
    profesionista: req.body.profesionista,
    calificacion: req.body.calificacion,
    precioPorHora: req.body.precioPorHora,
    descripcion: req.body.descripcion
  });

  try {
    const profesionistaGuardado = await nuevoProfesionista.save();
    res.json(profesionistaGuardado);
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

router.get('/:uid', async (req, res) => {
  //console.log(req.params.uid); //imprime uid recibido de url
  try {
    const profesionistaEncontrado = await profesionistasModel.findById(req.params.uid);
    res.json(profesionistaEncontrado);
    console.log(profesionistaEncontrado);
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


router.delete('/:uid', async (req, res) => {
  try {
    const profesionistaBorrado = await profesionistasModel.deleteOne({
      uid: req.params.uid
    });
    res.json(profesionistaBorrado);
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
    const profesionistaActualizado = await profesionistasModel.updateOne({
      uid: req.params.uid
    }, {
      $set: {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        trabajosRealizados: req.body.trabajosRealizados,
        direccion: req.body.direccion,
        email: req.body.email,
        edad: req.body.edad,
        password: req.body.password,
        celular: req.body.celular,
        foto: req.body.foto,
        estado: req.body.foto,
        profesionista: req.body.profesionista,
        calificacion: req.body.calificacion,
        precioPorHora: req.body.precioPorHora,
        descripcion: req.body.descripcion
      }
    })
    res.json(profesionistaActualizado);
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