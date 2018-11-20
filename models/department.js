var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DepartmentSchema = new Schema(
  {
    department_code:{type:String, required:true, max:10, unique:true},
    department_name: {type: String, required: true, max: 100},
    department_description: {type: String, max:100}
  }
);

// Virtual for Department's Detail
DepartmentSchema
.virtual('departmentDetails')
.get(function () {
  return ('Department Code:'+this._id + ' Department Name:' + this.department_name + ' Department Description:' + this.department_description);
});

// Virtual for Department's URL
DepartmentSchema
.virtual('url')
.get(function () {
  return '/department/' + this._id;
});

//Export model
module.exports = mongoose.model('Department', DepartmentSchema);