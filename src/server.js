const express= require('express');
const server = express();
const db = require('./database/db');

// configurando a pasta public para que apareçam as pastas da aplicação
server.use(express.static('public'));
// habilitar o uso do req body
server.use(express.urlencoded({extended:true}))

//configurando template engine para usar js em arquivo html
const nunjucks = require('nunjucks');
 nunjucks.configure('src/views',{
     express: server,
     noCache: true  //não use cache
 });

//Rotas
server.get('/',(req, res)=>{ return res.render('index.html'); });



server.get('/create-point', (req, res)=>{ 
    return res.render('create-point.html');
});


server.post('/save-point', (req, res) => {    
            const query = `
                            INSERT INTO places (
                                name,
                                image,
                                address,
                                address2,
                                state,
                                city,
                                items
                            ) VALUES (?, ?, ?, ?, ?, ?, ?);`

            const values = [ 
                req.body.name,
                req.body.image,
                req.body.address,
                req.body.address2,
                req.body.state,
                req.body.city,
                req.body.items
            ]


            function afterInsertData(err){
                if(err){ 
                    console.log(err);
                    return res.send('erro no cadastro')
                }
            
                console.log('Cadastrado com sucesso');
                console.log(this);

                return res.render('create-point.html', { saved: true });
            }

            db.run(query, values, afterInsertData);
})

server.get('/search', (req, res)=>{ 

    db.all(`SELECT * FROM places`, function(err, rows) {
        
        if(err){ 
            return console.log(err);
        }
        
        console.log('Aqui estão seus registros');
        console.log(rows);

        const total = rows.length;


        //mostrar a pag html com so dados do banco
        return res.render('search-results.html',{ places: rows, total: total}); 
    });
});



server.listen(3000, ()=>{
    console.log('Server was started');
});