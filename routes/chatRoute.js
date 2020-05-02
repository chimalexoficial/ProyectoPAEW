const express = require('express');
const router = express.Router();
const chatModel = require('../models/chatModel');

router.get('/', async (req, res) => {
    try{
        const getChat = await chatModel.find({uidUsuario: req.body.uidUsuario, uidProfesionista: req.body.uidProfesionista});
        res.json(getChat);
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
    const newChat = new chatModel({
        id: req.body.id,
        uidUsuario: req.body.uidUsuario,
        uidProfesionista: req.body.uidProfesionista,
        mensaje: req.body.mensaje
    });

    try {
        const savedChat = await newChat.save();
        res.json(savedChat);
    } catch (err) {
        if (res.status == 400){
            res.status(400).json({
                message: "No se puede procesar tu solicitud",
                error: err
            });
        } else if (err.status == 401) {
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

router.put('/:id', async (req, res) => {
    const newMessage = {senderId: req.body.senderId, message: req.body.message};
    try {
        const updatedChat = await chatModel.updateOne({
            id: req.params.id
        }, {
            $push: {message: newMessage}
        })
        res.json(updatedChat);
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

module.exports = router;