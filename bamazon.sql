DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE items (
	item_id INTEGER (11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR (50) NOT NULL,
    department_name VARCHAR (50) NOT NULL,
    price INTEGER (11) NOT NULL,
    stock_quantity INTEGER (11) NOT NULL,
    product_sales INTEGER (11) NOT NULL DEFAULT 0,
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

CREATE TABLE departments (
	department_id INTEGER (11) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    over_head_costs INTEGER(11) NOT NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Board Games", 9000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Game System", 30000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Candy", 10000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Instructional Books", 40000);

SELECT * FROM departments;

SELECT dept.department_id, dept.department_name, dept.over_head_costs, SUM(items.product_sales) AS 'product_sales'
FROM departments AS dept
JOIN items
ON dept.department_name = items.department_name
GROUP BY dept.department_id;





