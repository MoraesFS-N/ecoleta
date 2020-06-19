const express= require('express');
const server = express();


// configurando a pasta public para que apareçam as pastas da aplicação
server.use(express.static('public'));


//configurando template engine para usar js em arquivo html
const nunjucks = require('nunjucks');
 nunjucks.configure('src/views',{
     express: server,
     noCache: true  //não use cache
 });


server.get('/',(req, res)=>{
   return res.render('index.html');
});

server.get('/create-point', (req, res)=>{
    return res.render('create-point.html');
});

server.get('/search', (req, res)=>{
    return res.render('search-results.html');
});



server.listen(3000, ()=>{
    console.log('Server was started');
});