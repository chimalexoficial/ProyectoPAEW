const mongoose = require('mongoose');

const ServiciosSchema = mongoose.Schema({
    uid: {
        type: Number,
        unique: true,
        required: true
    },
    profesionista: {
        type: Number,
        required: true
    },
    usuario: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    tipo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('servicios', ServiciosSchema);