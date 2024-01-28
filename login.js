var express = require('express');
var router = express.Router();
var person = require('./models/person.js');
var art=require('./models/article')
var topic=require('./models/topic')


router.get('/login', function(req, res){
    res.render('login', {
        message: " "
    });
});

router.post('/login',function (req, res, next) {
	person.findOne({name:req.body.name,id:req.body.id},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				req.session.person = {
                    name: data.name,
                    id: data.id,
                    position: data.position,
                    status: data.status,
                };
				if(data.position=='Admin'){
					req.session.admin=data;
					res.redirect('/datas')
				 
				}else if(data.position=='Basic' && data.status === 1){
					req.session.person=data;
					res.redirect('articles')
				}
			}else{
				res.render('login',{
					message:"invalid password"
				})
			}
		}else{
			res.render('login',{message:" something wrong"});
		} 
	}); });





module.exports=router;
