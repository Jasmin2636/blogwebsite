var mongoose=require('mongoose');



var personSchema = mongoose.Schema({
    name: String,
    id: String,
    password:String,
    confirmpassword:String,
    status: Number,
    position:String
        

 });
 var person = mongoose.model("person", personSchema);

 module.exports=person;