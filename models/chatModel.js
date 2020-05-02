const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    id: {
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
    mensaje: {
        type: [{senderId: Number, message: String}],
        required: false
    }
});

module.exports = mongoose.model('chat', ChatSchema);