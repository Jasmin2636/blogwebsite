var express = require('express');
var router = express.Router();


var topic=require('./models/topic');
var person=require('./models/person');
var manager=require('./models/manager');
var art=require('./models/article');
router.use(function(req, res, next) { res.setHeader('Cache-Control', 'no-cache,private,no-Store,must-revalidate,max-stale=0,post-check=0,pre-check=0');
next();
  });
 

function checkSignIn(req, res,next){
   if(req.session.admin){
      next();    
   } else {
     res.render('interface');
      console.log(req.session.admin);
      next(err);  
   }
}

router.get('/approve/:id',checkSignIn,function(req, res){
    console.log('approved:',req.params.id)
    person.findByIdAndUpdate({_id:req.params.id},{status:1},(err,response)=>{
       if(err){
          console.log('error')
       }else{
           res.redirect('/datas/?msg=ok')
          }
       })
       });
router.get('/reject/:id',checkSignIn,function(req, res){
 console.log('rejected:',req.params.id)
 person.findByIdAndUpdate({_id:req.params.id},{status:0},(err,response)=>{
    if(err){
       console.log('error')
    }else{
        res.redirect('/datas/?msg=gone')
       }
    })
    });
    router.get('/viewprofiles/:id',checkSignIn, (req, res) => {
       var userId = req.params.id;
     
       
       person.findById(userId, (err, user) => {
         if (err) {
           console.error(err);
           res.status(500).send('Internal Server Error');
         } else {
           res.render('viewprofile', { user });
         }
       });
     });
 
 router.get('/datas',checkSignIn, function(req, res){
    person.find(function(err, response){
       if (err) {
           console.error(err);
           res.status(500).send('Internal Server Error');
       } else {
          res.render('datas',{
             data:response
          })
       }
    })
 });
 /*router.get('/manager',checkSignIn, function(req, res){
    res.render('manager',{
       message:" "
    });
    });*/

    router.get('/manager',checkSignIn, function (req, res) {
      topic.find(function (err, topic) {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          manager.find(function (err, response) {
            if (err) {
              console.error(err);
              res.status(500).send('Internal Server Error');
            } else {
              res.render('manager', {
                manager: response,
                category: topic 
              });
            }
          });
        }
      });
    });
 router.get('/managerdash',checkSignIn, function(req, res){
   topic.find(function (err, topic) {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
    manager.find(function(err, response){
       if (err) {
           console.error(err);
           res.status(500).send('Internal Server Error');
       } else {
          res.render('managerdash',{
             data:response,
             category:topic
          })
       }
    }) }
 });
});
 router.get('/approve_manager/:id',checkSignIn,function(req, res){
    console.log('approved:',req.params.id)
    manager.findByIdAndUpdate({_id:req.params.id},{status:1},(err,response)=>{
       if(err){
          console.log('error')
       }else{
           res.redirect('/managerdash/?msg=approved')
          }
       })
       });
router.get('/reject_manager/:id',checkSignIn,function(req, res){
 console.log('rejected:',req.params.id)
 manager.findByIdAndUpdate({_id:req.params.id},{status:0},(err,response)=>{
    if(err){
       console.log('error')
    }else{
        res.redirect('/managerdash/?msg=rejected')
       }
    })
    });

   
  
    router.get('/managetopic',checkSignIn,function(req, res){
  
        topic.find( function (err, topic) {
            if (err) {
              console.error(err);
              res.status(500).send('Internal Server Error');
            } else {
              // Fetch articles
              art.find( function (err, response) {
                if (err) {
                  console.error(err);
                  res.status(500).send('Internal Server Error');
                } else {
                  res.render('managetopic', {
                    article: response,
                    category: topic  // Pass the list of topics to the template
                  });
                }
              });
            }
        })})

 module.exports=router; 