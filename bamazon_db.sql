DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;
--    * item_id (unique id for each product)

--    * product_name (Name of product)

--    * department_name

--    * price (cost to customer)

--    * stock_quantity (how much of the product is available in stores)
CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  item_id INT NOT NULL,
  product_name VARCHAR (255) NOT NULL,
  department_name VARCHAR (255) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);
-- BEER
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (101, 'Some Quad IPA', 'Beer', 12.00, 50), (102, 'Great Wheat', 'Beer', 8.50, 80), (103, 'Perfect Pilsner', 'Beer', 7.50, 100);

-- WHISKEY
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (201, '12 Year Japanese Whisky', 'Whiskey', 119.99, 20), (202, '14 Year Irish Whiskey', 'Whiskey', 79.99, 40), (203, 'The 1926', 'Whiskey', 75000.00, 2);

-- COGNAC
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (301, 'XO', 'Cognac', 139.99, 30), (302, 'Very Special', 'Cognac', 39.99, 50), (303, 'Louis', 'Cognac', 6999.99, 4);

-- MISC
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (401, 'Water', 'Misc', 2.50, 500), (402, 'Ginger Ale', 'Misc', 4.00, 300), (403, 'Energy Drink', 'Misc', 4.50, 300);