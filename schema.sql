DROP TABLE IF EXISTS products;

CREATE TABLE products (
item_id SERIAL PRIMARY KEY,
product_name VARCHAR(255) NOT NULL,
department_name VARCHAR(255) NOT NULL,
price INTEGER,
stock_quantity INTEGER
);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ('shampoo', 'bath', 5, 100),
('conditioner', 'bath', 4, 200),
('deep conditioner', 'bath', 3, 150),
('lotion', 'bath', 7, 200),
('soap', 'bath', 2, 200),
('toothpaste', 'bath', 3, 200),
('mouth wash', 'bath', 4, 100),
('hand soap', 'bath', 4, 400),
('santizer', 'bath', 4, 100),
('shower curtain', 'bath', 30, 500),
('toilet paper', 'bath', 20, 1000);
