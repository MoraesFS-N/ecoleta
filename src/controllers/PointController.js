const db = require('../database/db');

module.exports = {
    index(req,res){
        return res.render('index.html');
    },

    createPoint(req,res){
        return res.render('create-point.html');
    },

    savePoint(req, res){    
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
    },

    search(req, res){ 

        const search = req.query.search;
        
        if(search === ''){
            return res.render('search-results.html',{ total: 0}); 
        }
    
        //buscar todos os dados do banco de dados
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
            
            if(err){ 
                return console.log(err);
            }
            
            console.log('Aqui estão seus registros');
            console.log(rows);
    
            const total = rows.length;
    
    
            //mostrar a pag html com so dados do banco
            return res.render('search-results.html',{ places: rows, total: total}); 
        });
    }
}