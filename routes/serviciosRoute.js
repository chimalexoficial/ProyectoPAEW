const express = require('express');
const router = express.Router();
const serviciosModel = require('../models/serviciosModel');


router.get('/', async (req, res) => {
  try {
    const obtenerServicio = await serviciosModel.find();
    res.json(obtenerServicio);
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
  const nuevoServicio = new serviciosModel({
    uid: req.body.uid,
    profesionista: req.body.profesionista,
    usuario: req.body.usuario,
    fecha: req.body.fecha,
    tipo: req.body.tipo
  });

  try {
    const servicioGuardado = await nuevoServicio.save();
    res.json(servicioGuardado);
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
    const servicioEncontrado = await serviciosModel.findById(req.params.uid);
    res.json(servicioEncontrado);
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
    const servicioBorrado = await serviciosModel.deleteOne({
      uid: req.params.uid
    });
    res.json(servicioBorrado);
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
    const servicioActualizado = await serviciosModel.updateOne({
      uid: req.params.uid
    }, {
      $set: {
        profesionista: req.body.profesionista,
        usuario: req.body.usuario,
        fecha: req.body.fecha,
        tipo: req.body.tipo
      }
    })
    res.json(servicioActualizado);
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