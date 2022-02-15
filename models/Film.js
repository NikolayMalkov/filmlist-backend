const {Schema, model} = require('mongoose');

const schema = new Schema({
    title: { type: String, unique: true }
})

module.exports = model('Film', schema)