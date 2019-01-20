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

//Displays product information to user on load

function displayData () {
    console.log("Here are the products we have in stock.");
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
        askUser();
    });

}

function askUser() {

    inquirer.prompt([
        {
            type: "input",
            name: "desiredItemId",
            message: "Please enter the Item ID of the product you would like to purchase."

        }, 
        {
            type: "input",
            name: "desiredQuantity",
            message: "How many units would you like to buy?"
        }
        
    ]).then(function(user) {

        connection.query("SELECT * FROM items", function(err,res) {
            if (err) throw err;
            //cannot store in variables for some reason.

            if (user.desiredQuantity <= res[user.desiredItemId - 1].stock_quantity) {
                console.log("--------------------------------------");
                console.log("You're order for " + res[user.desiredItemId -1].product_name + " has been placed!");
                console.log("--------------------------------------");
                console.log("Total Cost: $" + user.desiredQuantity * res[user.desiredItemId - 1].price);

                //updating database
                connection.query("UPDATE items SET ? WHERE ?",
                    [
                        {
                            stock_quantity: res[user.desiredItemId - 1].stock_quantity - user.desiredQuantity
                        },
                        {
                            item_id: user.desiredItemId
                        }
                    ],
                    function(err, res) {
                        if (err) throw err;
                        console.log("--------------------------------------");
                        console.log("For company: Items updated!");
                        connection.end();
                    }
                )
            } else {
                console.log("Insufficient Quantity. Please enter a new amount or choose another product");
                    askUser();
            }
        });
    });
}

displayData();