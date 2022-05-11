const express = require('express');
const app = express();
const router = express.Router();
var os = require("os");
var hostname = os.hostname();

const path = __dirname + '/views/';
const port = 8080;

router.use(function (req,res,next) {
  console.log('/' + req.method);
  next();
});

router.get('/', function(req,res){
 res.send('Hello world from ' + hostname + '! Your app is up and running in a cluster!\n')  
});

router.get('/random', function(req,res){
  res.sendFile(path + 'random.html');
});

router.get('/useless', function(req,res){
  res.sendFile(path + 'useless.html');
});

router.get('/fox', function(req,res){
  res.sendFile(path + 'fox.html');
});

app.use(express.static(path));
app.use(express.static(path));
app.use('/', router);

app.listen(port, function () {
  console.log('Example app listening on port 8080!')
})
