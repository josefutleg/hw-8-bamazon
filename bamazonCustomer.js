var mysql = require("mysql");
var inquirer = require("inquirer");
var mysql = require("mysql");
var cmd;
var inputID;
var inputQuant;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon_db"
});

function startUp() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Welcome! What would you like to drink?",
        choices: ["Beer", "Whiskey", "Cognac", "Misc"],
        name: "command"
      }
    ])
    .then(function(inquirerResponse) {
      cmd = inquirerResponse.command;
      drinkList();
    });
}

startUp();

function drinkList() {
  connection.query(
    "SELECT * FROM products WHERE department_name=?",
    [`${cmd}`],
    function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(
          `Item ID:${res[i].item_id} |`,
          `Product:${res[i].product_name} |`,
          `Price:$${res[i].price}`
        );
      }
      inquirer
        .prompt([
          {
            type: "input",
            message: "Input an item's ID that you would like",
            name: "item_id"
          },
          {
            type: "input",
            message: "How many would you like?",
            name: "stock"
          }
        ])
        .then(function(data) {
          inputID = parseFloat(data.item_id);
          inputQuant = parseFloat(data.stock);
          checkStock();
        });
    }
  );
}

function checkStock() {
  connection.query(
    "SELECT * FROM products WHERE item_id=?",
    [`${inputID}`],
    function(err, res) {
      for (var p in res) {
        var prod = res[p].product_name;
        var stock = parseFloat(res[p].stock_quantity);
        var newStock = parseFloat(stock - inputQuant);
        var tax = parseFloat(res[p].price * inputQuant * 0.0725);
        var finalPrice = parseFloat(res[p].price * inputQuant + tax).toFixed(2);

        if (inputQuant > stock) {
          console.log("oops! we do not have enough!");
          connection.end();
          return;
        } else {
          inquirer
            .prompt([
              {
                type: "list",
                message: `${inputQuant} of ${prod} for $${finalPrice}. Checkout?`,
                choices: ["Yes!", "I Changed My Mind!"],
                name: "command"
              }
            ])
            .then(function(checkout) {
              var op = checkout.command;
              if (op == "Yes!") {
                var query = connection.query(
                  `UPDATE products
                  SET stock_quantity=${newStock}
                  WHERE item_id=${inputID}`,
                  function(err, data) {
                    console.log("Done! Enjoy!");
                    connection.end();
                  }
                );
              } else {
                startUp();
              }
            });
        }
      }
    }
  );
}
