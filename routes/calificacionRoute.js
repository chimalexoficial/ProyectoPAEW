const express = require('express');
const router = express.Router();
const calificacionModel = require('../models/calificacionModel');


router.get('/', async (req, res) => {
  try {
    const obtenerCalif = await calificacionModel.find();
    res.json(obtenerCalif);

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

router.post('/', async (req, res) => {
  const nuevaCalif = new calificacionModel({
    uid: req.body.uid,
    uidUsuario: req.body.uidUsuario,
    uidProfesionista: req.body.uidProfesionista,
    calificacion: req.body.calificacion,
    comentario: req.body.comentario
  });

  try {
    const califGuardada = await nuevaCalif.save();
    res.json(califGuardada);
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
    const califEncontrada = await calificacionModel.findById(req.params.uid);
    res.json(califEncontrada);
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
    const califBorrada = await calificacionModel.deleteOne({
      uid: req.params.uid
    });
    res.json(califBorrada);
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
    const califActualizada = await calificacionModel.updateOne({
      uid: req.params.uid
    }, {
      $set: {
        uidUsuario: req.body.uidUsuario,
        uidProfesionista: req.body.uidProfesionista,
        calificacion: req.body.calificacion,
        comentario: req.body.comentario
      }
    })
    res.json(califActualizada);
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