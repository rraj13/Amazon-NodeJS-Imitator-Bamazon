//requiring mySQL and inquirer packages and establishing connection with database

const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "laCA1995$",
    database: "bamazon"
});

//function that asks manager to pick an option and performs actions based on which option was chosen

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
            connection.query("SELECT * FROM products", function(err, res) {
                if (err) throw err;

                //setting a Boolean value to check if there exist products with low inventory
                var lowInventory = false;

                //loops through res array, and if any product's stock quantity is below five, the loop breaks and returns lowInventory as true
                for (var i = 0; i < res.length; i++) {
                    if (res[i].stock_quantity < 5) {
                        lowInventory = true;
                    }
                }

                //if lowInventory returns true, then log the relevant products to the console, else log "No products currently with low inventory."

                if (lowInventory) {
                    console.log("The following product(s) are low in inventory:");
                    console.log("--------------------------------------");
                    for (var i = 0; i < res.length; i++) {
                        if (res[i].stock_quantity < 5) {
                            console.log("Item ID: " + res[i].item_id);
                            console.log("Name: " + res[i].product_name);
                            console.log("Num in stock: " + res[i].stock_quantity);
                            console.log("--------------------------------------");
                        }
                    }
                } else {
                    console.log("No products currently with low inventory.");
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
                connection.query("SELECT * FROM products", function(err, res) {
                    if (err) throw err;
                    
                    connection.query("UPDATE products SET ? WHERE ?", 
                        [
                            {
                                stock_quantity: res[user.managerProductId - 1].stock_quantity + parseInt(user.managerChangeAmount)
                            },
                            {
                                item_id: user.managerProductId
                            }
                        ],
                        function(err) {

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
                    message: "Please enter the product name:"
                }, 
                {
                    type: "input",
                    name: "productDept",
                    message: "Please enter the product department:"
                },
                {
                    type: "input",
                    name: "productPrice",
                    message: "Please enter the product price:"
                },
                {
                    type: "input",
                    name: "productStock",
                    message: "Please enter the product stock quantity:"
                }
            ]).then(function(user) {
                connection.query("INSERT INTO products SET ?",
                    {
                        product_name: user.productName,
                        department_name: user.productDept,
                        price: user.productPrice,
                        stock_quantity: user.productStock
                    },
                    function(err) {
                        if (err) throw err;
                        console.log("Product added!");
                        connection.end();
                    } 
                )
            });
        }
    });
}

//function that lists all available items and relevant information 

function displayData() {
    console.log("Here are the products we are currently selling.");
    console.log("--------------------------------------");
    connection.query ("SELECT * FROM products", function(err, res) {
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

//initial execution of program
grabManagerCommand();