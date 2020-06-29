const express= require('express');
const server = express();
const routes = require('./routes');
const db = require('./database/db');

// configurando a pasta public para que apareçam as pastas da aplicação
server.use(express.static('public'));
// habilitar o uso do req body
server.use(express.urlencoded({extended:true}))
//utilizando arquivo de rotas
server.use(routes);


//configurando template engine para usar js em arquivo html
const nunjucks = require('nunjucks');
 nunjucks.configure('src/views',{
     express: server,
     noCache: true  //não use cache
 });

server.listen(3000, ()=>{
    console.log('Server was started');
});