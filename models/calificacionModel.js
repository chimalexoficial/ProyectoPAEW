const mongoose = require('mongoose');

const CalificacionSchema = mongoose.Schema({
    uid: {
        type: Number,
        unique: true,
        required: true
    },
    uidUsuario: {
        type: Number,
        required: true
    },
    uidProfesionista: {
        type: Number,
        required: true
    },
    calificacion: {
        type: Number,
        required: true
    },
    comentario: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('calificacion', CalificacionSchema);