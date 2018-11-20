var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SubjectSchema = new Schema(
  {
    subject_code:{type:String, required:true, max:10, unique:true},
    subject_name: {type: String, required: true, max: 100},
    department : [{type:String , ref:'Department', required: true}]
  }
);
//  note ** Schema uses string as id instead of default objectId of mongodb;

// Virtual for Subject's full name
SubjectSchema
.virtual('subjectDetails')
.get(function () {
  return ('Subject Code:'+this.subject_code + ' Subject Name:' + this.subject_name + ' Departments:'+ this.department.get('dept_name'));
});

// Virtual for Subject's URL
SubjectSchema
.virtual('url')
.get(function () {
  return '/subject/' + this._id;
});

//Export model
module.exports = mongoose.model('Subject', SubjectSchema);