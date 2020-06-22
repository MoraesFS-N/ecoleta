// configurando o sqlite para visualizar mensagens no terminal com a função verbose 
const sqlite3 = require('sqlite3').verbose();

// criar objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database('./src/database/database.db');

module.exports = db;


// utilizar o objeto de bd para executar suas funções

/* db.serialize(() => {
    //Criar uma tabela com comandos sql
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
    
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

    const values = ['Papersider',
                    'https://images.unsplash.com/photo-1582669300365-630322b86cf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                    'Guilherme Gemballa, Jardim América',
                    'Nº 465',
                    'Santa Catarina',
                    'Rio do Sul',
                    'Resíduos eletrônicos'
    ]


    function afterInsertData(err){
        if(err){ 
            return console.log(err);
        }
    
        console.log('Cadastrado com sucesso');
        console.log(this);
    }

     db.run(query, values, afterInsertData);
    // o rows mostra todos os dados inseridos na tabela em linha
    
    // db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
    //     if(err){ 
    //         return console.log(err);
    //     }
    //     console.log('Registro deletado com sucesso');
    // });
    
    // db.all(`SELECT * FROM places`, function(err, rows) {
    //     if(err){ 
    //         return console.log(err);
    //     }
    //     console.log('Aqui estão seus registros');
    //     console.log(rows);
    // })
})
*/