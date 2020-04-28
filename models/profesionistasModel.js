const mongoose = require('mongoose');

const ProfesionistasSchema = mongoose.Schema({
    uid: {
        type: Number,
        unique: true,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    trabajosRealizados: {
        type: Number,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    celular: {
        type:String,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    profesionista: {
        type: Boolean,
        required: true
    },
    calificacion: {
        type: Number,
        required: true,
        default: 1
    },
    precioPorHora: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('profesionistas', ProfesionistasSchema);