const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
  Username: {
      type: String,
      required: true
  },
  Email: {
      type: String,
      required: true,
      unique: true,
},
  Password: {
      type: String,
      required: true,
      
},
 ConfirmPassword:{
     type: String,
     required: true
 }

}, {timestamps: true});

const Register = mongoose.model('Register', RegisterSchema);
module.exports = Register;