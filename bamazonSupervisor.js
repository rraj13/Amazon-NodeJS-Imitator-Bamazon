const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require ("cli-table2");


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

function grabSupCommand () {
    inquirer.prompt([
        {
            type: "list",
            name: "supervisorCommand",
            message: "Please choose from the following options.",
            choices: ["View Product Sales by Department", "Create New Department"]
        }
    ]).then(function(user) {

        if (user.supervisorCommand === "View Product Sales by Department") {
            connection.query("SELECT dept.department_id, dept.department_name, dept.over_head_costs, SUM(items.product_sales) AS 'product_sales' FROM departments AS dept JOIN items ON dept.department_name = items.department_name GROUP BY dept.department_id",
                function(err, res) {
                    if (err) throw err;

                    var table = new Table({
                        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
                    });

                    table.push(
                        ["Department ID", "Department Name", "Over Head Costs", "Product Sales", "Total Profits"]
                    );

                    for (var i = 0; i < res.length; i++) {
                        table.push([res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, res[i].product_sales - res[i].over_head_costs]);
                    }

                    console.log(table.toString());
                    connection.end();
            });
        } else if (user.supervisorCommand === "Create New Department") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "departmentName",
                    message: "Please add the department name.",
                },
                {
                    type: "input", 
                    name: "departmentOverhead",
                    message: "Please enter the department overhead costs"
                }
            ]).then(function(user) {
                connection.query("INSERT INTO departments SET ?",
                    {
                        department_name: user.departmentName,
                        over_head_costs: user.departmentOverhead
                    },
                    function(err, res) {
                        if (err) throw err;
                        console.log("Department successfully added.")
                        connection.end();
                    }
                )
            });       
        }
    });
}

grabSupCommand();