var mongoose=require('mongoose');



var managerSchema = mongoose.Schema({
    name: String,
    id: String,
    password:String,
    topic:String,
    status:Number

 });
 var manager = mongoose.model("manager", managerSchema);

 module.exports=manager;