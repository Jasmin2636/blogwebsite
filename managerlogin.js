var express = require('express');
var router = express.Router();
var manager= require('./models/manager');

var art= require('./models/article');



router.use(function(req, res, next) { res.setHeader('Cache-Control', 'no-cache,private,no-Store,must-revalidate,max-stale=0,post-check=0,pre-check=0');
next();
  });
 

function checkSignIn(req, res,next){
   if(req.session.manager){
      next();    
   } else {
     res.render('interface');
      console.log(req.session.manager);
      next(err);  
   }
}


router.get('/managerpage',checkSignIn,function(req,res){
  art.find(function(request,respose){
    manager.find({topic:req.session.manager.topic},function(err,manager){
     
        res.render('managerpage',{article:respose,category:manager});
     
 
 }) })})




 


router.get('/managerlogin',function (req, res) {
  art.find(function(request,respose){
     manager.find(function(err,manager){
        console.log('Managers:', manager)
 res.render('managerlogin',{article:respose,
    category:manager,req:req.session.topic,
    message:''});
})
})
})

router.post('/managerlogin', function (req, res) {
  var loginInfo = req.body;
  if (!loginInfo.id || !loginInfo.password) {
    res.render('managerlogin', {
      message: 'Please provide both email ID and password.',
      type: 'error'
    }); 
  } else {
    manager.findOne({ id: loginInfo.id, password: loginInfo.password,status:1 }, function (err, manager) {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else if (!manager) {
        res.render('managerlogin', {
          message: 'Invalid email ID or password.',
          type: 'error'
        });
      } else {
        req.session.manager = manager;
        res.redirect('/managerpage/?msg=ok'); 
      }
    });
  }
});
router.get('/approve_topic/:id',checkSignIn,function(req, res){
  console.log('approved:',req.params.id)
  art.findByIdAndUpdate({_id:req.params.id},{status:1},(err,response)=>{
     if(err){
        console.log('error')
     }else{
         res.redirect('/managerpage/?msg=approved')
        }
     })
     });
router.get('/reject_topic/:id',checkSignIn,function(req, res){
console.log('rejected:',req.params.id)
art.findByIdAndUpdate({_id:req.params.id},{status:0},(err,response)=>{
  if(err){
     console.log('error')
  }else{
      res.redirect('/managerpage/?msg=rejected')
     }
  })
  });
  router.get('/logout', function(req, res){
    req.session.destroy(function(){
       console.log("user logged out.")
    });
    res.redirect('login');
 });
 
module.exports=router;