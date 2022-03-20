const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    task : {
        type: String,
        require: true,
    },
    status: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('task', taskSchema);