var express = require('express');
var router = express.Router();

var manager=require('./models/manager');


  
   
   
                   
      router.post('/manager', function (req, res) {
         var managerInfo = req.body;
      
         if(!managerInfo.name || !managerInfo.id || !managerInfo.password||!managerInfo.topic){
             res.render('manager');
         } else {
                var newmanager = new manager({
                  name: managerInfo.name,
                  id: managerInfo.id,
                  password: managerInfo.password,
                  status:1,
                  topic:managerInfo.topic
             });
      
             newmanager.save(function (err, manager) {
                 if (err) {
                     res.render('manager', {
                         message: "database Error",
                         type: 'error'
                     });

                 } else
                 req.session.manager = newmanager;
                     res.redirect('/managerdash/?msg=added');
      
             });
         }
      });
 
      
      module.exports=router;