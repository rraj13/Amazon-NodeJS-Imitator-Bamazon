# Bamazon

## Introduction
Hello! Bamazon is a command line node project that mimics an Amazon-like storefront application. My goal with this project was to implement mySQL with node.js and perform basic C.R.U.D operations onto a database. In addition, this project helped me hone my Javascript skills with for-loops, if-else conditionals, and asynchronous programming. Because this is a CLI application, it cannot be deployed through Github or Heroku, so I have included a video demonstrating the app. Link is below.

https://youtu.be/1KgOd0wJ4H0

Please read on for more information!

## Technologies
Node.js - JavaScript if/else statements, loops and module import<br/>
mySQL node package - C.R.U.D operations, joins, aliases, and group bys<br/>
mySQL workbench
inquirer node package<br/>
cli-table2 node package

## Methodology 
The general principle applied in this project was using the inquire module to grab user input and performing various C.R.U.D database operations with node, depending on that user input. These commands would differ for each type of user and require a different manipulation to the data tables. 

For example, a customer would only be able to purchase products, while a manager could add new products and update inventory. Once the C.R.U.D operations were performed, I would parse through the data and log the relevant information to the console. 

The most challenging aspect of the project was both performing mySQL joins and Group Bys as well as understanding these operations conceptually. However, all in all, this project served as a great continuation in node studies and introduction to mySQL.

Please reach out with any questions!
