//requiring mysql and inquirer packages, and setting up connection to mySQL database

const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "laCA1995$",
    database: "bamazon"
});


//Displays product information to user on load

function displayData () {
    console.log("Here are the products we have in stock.");
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
        askUser();
    });

}

//function to gather user input on product to buy and quantity 

function askUser() {

    inquirer.prompt([
        {
            type: "input",
            name: "desiredItemId",
            message: "Please enter the Item ID of the product you would like to purchase:"

        }, 
        {
            type: "input",
            name: "desiredQuantity",
            message: "How many units would you like to buy?"
        }
        
    ]).then(function(user) {

        connection.query("SELECT * FROM products", function(err,res) {
            if (err) throw err;
            
            //condition to check whether or not there is enough product in stock
            if (user.desiredQuantity <= res[user.desiredItemId - 1].stock_quantity) {
                console.log("--------------------------------------");
                console.log("You're order for " + res[user.desiredItemId -1].product_name + " has been placed!");
                console.log("--------------------------------------");
                console.log("Total Cost: $" + user.desiredQuantity * res[user.desiredItemId - 1].price);

                //updating database with new product stock quantity as well as product sales (to be used in future exercise)
                connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: res[user.desiredItemId - 1].stock_quantity - user.desiredQuantity,
                            product_sales: res[user.desiredItemId - 1].product_sales + user.desiredQuantity * res[user.desiredItemId - 1].price
                        },
                        {
                            item_id: user.desiredItemId
                        }
                    ],
                    function(err) {
                        if (err) throw err;
                        console.log("--------------------------------------");
                        console.log("For company: Products updated!");
                        connection.end();
                    }
                )

            } else {
                console.log("Insufficient Quantity. Please enter a new amount or choose another product");

                    //runs askUser function again to let user choose a different quantity or product altogether
                    askUser();
            }
        });
    });
}

//initial execution of program
displayData();