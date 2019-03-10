var express = require('express');
var router = express.Router();
var request = require('request')
var config = require('../config/setting')
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'nodejs-passport-facebook-example' });
});

router.get('/auth/facebook',
  passport.authenticate('facebook',{'scope':'user_posts'}));

router.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/account');
  });

router.get('/account', ensureAuthenticated, function(req, res) {
  console.log(req.user)
  const userfield = 'feed.limit(10){message,name,picture,link}' 
  const options={
        method:'GET',
        uri:'https://graph.facebook.com/v3.2/'+req.user.id+'?fields=feed.limit(10){message,name,picture,link}',
        qs:{
            access_token: config.token,
        }

    }  
    
   request.get(options,(err,ress,body)=>{
    const name = JSON.parse(body)
    const x=name.feed.paging.next.search('feed')
    const slice= name.feed.paging.next.slice(55)

    console.log(x)

    res.render('account', {name:req.user, user:JSON.parse(body),page:slice });
    })

   

  
});
router.get('/account/:page',ensureAuthenticated,function(req,res){
  
    console.log(req.params.page)
    const options={
      method:'GET',
      uri:'https://graph.facebook.com/v3.2/'+req.user.id+"/feed?"+req.params.page,
      qs:{
          access_token: config.token,
      }

   }

   request.get(options,(err,ress,body)=>{
    const name = JSON.parse(body)
    const slice= name.paging.next.slice(55)
    const slice2= name.paging.previous.slice(55)
    console.log(name.paging.previous)
    res.render('file', {name:req.user, user:JSON.parse(body),page:slice,before:slice2 });
    })
  
})

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
router.post('/accounts',function(req,res){
   console.log("datanya"+req.body)
})

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}

module.exports = router;
