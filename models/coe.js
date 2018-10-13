var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var COESchema = new Schema(
  {
    _id:{type:String, required:true, max:10, unique:true},
    COE_name: {type: String, required: true, max: 100},
    password: {type:password,required:true, default : FacultySchema.passwordfn },
    question_paper: {type: Schema.Types.ObjectId, ref :'Question_Paper', required:true} 
  }
);

// Virtual for COE's full name
COESchema
.virtual('coeDetails')
.get(function () {
  return ('COE ID:'+this._id + ' COE Name:' + this.COE_name);
});

// Virtual for COE's URL
COESchema
.virtual('url')
.get(function () {
  return '/coe/' + this._id;
});

//Export model
module.exports = mongoose.model('COE', COESchema);