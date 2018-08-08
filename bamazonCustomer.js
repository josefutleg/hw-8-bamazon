var mysql = require('mysql');
var inquirer = require('inquirer');

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon_db"
});

var cmd;
inquirer
    .prompt([
        {
            type: 'list',
            message: 'Welcome! What would you like to drink?',
            choices: ['Beer', 'Whiskey', 'Cognac', 'Misc'],
            name: 'command'
        }
    ])
    .then(function(inquirerResponse){
        cmd = inquirerResponse.command;
        drinkList();
    })

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
//   listAll();
    // testAll();
  
});

function listAll(){
    connection.query('SELECT * FROM products', function(err, res){
        for (var i in res){
            console.log(res[i].department_name);
        }
        connection.end();
    })
    
}

function testAll(){
    connection.query('SELECT * FROM products', function(err, res){
        console.log(res);
        connection.end();
    })
    
}

function drinkList(){
    connection.query('SELECT * FROM products WHERE department_name=?', [`${cmd}`], function(err, res){
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: `What Type of ${cmd} Would You Like?`,
                    choices: [res[i].product_name],
                    name: 'command'
                }
            ])
        for(var i = 0; i < res.length; i++){        
            
            console.log(res[i].product_name);
        }
        // connection.end();
    })
}

