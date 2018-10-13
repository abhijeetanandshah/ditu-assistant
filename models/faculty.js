var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FacultySchema = new Schema(
  {
    _id:{type:number,required:true,minlength:10,maxlength:10,unique:true},
    first_name: {type: String, required: true, max: 100},
    last_name: {type: String, required: true, max: 100},
    password: {type:password, required:true, default : FacultySchema.passwordfn },
    date_of_birth: {type: Date, required:true},
    department : {type:Schema.Types.ObjectId, ref: 'Department', required: true},
    subjects: [{type:Schema.Types.ObjectId, ref:'Subject', required:true}]
  }
);

// Virtual for Faculty's full name
FacultySchema
.virtual('fullname')
.get(function () {
  return this.first_name + ' ' + this.last_name;
});

// Virtual for Faculty's age
FacultySchema
.virtual('age')
.get(function () {
  return (Date.now.getYear() - this.date_of_birth.getYear()).toString();
});

// Virtual for default password
FacultySchema
.virtual('passwordfn')
.get(function () {
  return (this.first_name.toLowerCase()+this.date_of_birth.getYear()).toString();
});

// Virtual for Faculty's URL
FacultySchema
.virtual('url')
.get(function () {
  return '/faculty/' + this._id;
});

//Export model
module.exports = mongoose.model('Faculty', FacultySchema);