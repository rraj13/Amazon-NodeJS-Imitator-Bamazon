//run inquirer function with various choices
//if view products for sale 
//display all items
//if view low inventory
//display products with inventory count less than five (if statment), if none, console log nothing under 5
//add to inventory --> updates database and using prompt to grab by how mich 
//add new product, adds to inventory and uses prompts to grab all the relevant info 

const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "laCA1995$",
    database: "bamazon"
});

function grabManagerCommand () {

    inquirer.prompt([
        {
            type: "list",
            name: "managerCommand",
            message: "Welcome! Please pick a command to perform.",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function(user) {
        if (user.managerCommand === "View Products for Sale") {
            displayData();
            connection.end();
        } else if (user.managerCommand === "View Low Inventory") {
            connection.query("SELECT * FROM items", function(err, res) {
                if (err) throw err;

                for (var i = 0; i < res.length; i++) {
                    if (res[i].stock_quantity < 5) {
                        console.log("Item ID: " + res[i].item_id);
                        console.log("Name: " + res[i].product_name);
                        console.log("Num in stock: " + res[i].stock_quantity);
                    }
                }

                connection.end();

            });
        } else if (user.managerCommand === "Add to Inventory") {

            inquirer.prompt([
                {
                    text: "input",
                    name: "managerProductId",
                    message: "Please enter the ID of the product whose inventory you would like to add to."
                }, 
                {
                    text: "input",
                    name: "managerChangeAmount",
                    message: "How many units would you like to add?"
                }
            ]).then(function(user) {
                connection.query("SELECT * FROM items", function(err, res) {
                    if (err) throw err;
                    
                    connection.query("UPDATE items SET ? WHERE ?", 
                        [
                            {
                                stock_quantity: res[user.managerProductId - 1].stock_quantity + parseInt(user.managerChangeAmount)
                            },
                            {
                                item_id: user.managerProductId
                            }
                        ],
                        function(err, res) {

                            if (err) throw err;
                            console.log("Inventory successfully added!");
                            connection.end();
                        } 
                    )
                });
            });
        } else if (user.managerCommand === "Add New Product") {

            inquirer.prompt([
                {
                    type: "input",
                    name: "productName",
                    message: "Please enter the product name."
                }, 
                {
                    type: "input",
                    name: "productDept",
                    message: "Please enter the product department."
                },
                {
                    type: "input",
                    name: "productPrice",
                    message: "Please enter the product price."
                },
                {
                    type: "input",
                    name: "productStock",
                    message: "Please enter the product stock quantity"
                }
            ]).then(function(user) {
                connection.query("INSERT INTO items SET ?",
                    {
                        product_name: user.productName,
                        department_name: user.productDept,
                        price: user.productPrice,
                        stock_quantity: user.productStock
                    },
                    function(err, res) {
                        if (err) throw err;
                        console.log("Product added!");
                        connection.end();
                    } 
                )
            })
        }
    });
}

function displayData() {
    console.log("Here are the products we are currently selling.");
    console.log("--------------------------------------");
    connection.query ("SELECT * FROM items", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id);
            console.log("Name: " + res[i].product_name);
            console.log("Department: " + res[i].department_name);
            console.log("Price: " + res[i].price);
            console.log("Num in stock: " + res[i].stock_quantity);
            console.log("--------------------------------------");
        }
    });
}

grabManagerCommand();