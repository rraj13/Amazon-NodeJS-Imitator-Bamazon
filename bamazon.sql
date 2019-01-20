DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE items (
	item_id INTEGER (11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR (50) NOT NULL,
    department_name VARCHAR (50) NOT NULL,
    price INTEGER (11) NOT NULL,
    stock_quantity INTEGER (11) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Scrabble", "Board Games", 10, 100);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Clue", "Board Games", 10, 100);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Monopoly", "Board Games", 10, 100);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("XBox One X", "Game System", 300, 50);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("PlayStation 4", "Game System", 300, 100);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Sour Patch Kids", "Candy", 2, 500);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Twizzlers", "Candy", 3, 1000);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Coding 101", "Instructional Books", 20, 100);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("JavaScript 101", "Instructional Books", 25, 100);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("mySQL for Dummies", "Instructional Books", 18, 100);

SELECT * FROM items;




