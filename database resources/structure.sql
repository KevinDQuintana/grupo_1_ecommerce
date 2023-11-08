DROP DATABASE IF EXISTS gameON_db;
CREATE DATABASE gameON_db;
USE gameON_db;

CREATE TABLE `users_categories` (
  `category_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL UNIQUE,
  PRIMARY KEY ( `category_id`)
);

CREATE TABLE `products_categories` (
  `category_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL UNIQUE,
  PRIMARY KEY ( `category_id`)
);

CREATE TABLE `brands` (
  `brand_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL UNIQUE,
  PRIMARY KEY (`brand_id`)
);

CREATE TABLE `users` (
  `user_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `dni` varchar(8) NOT NULL UNIQUE,
--   `phone` int UNSIGNED NOT NULL,
  `phone` varchar(10) NOT NULL,
--   `category_id` int UNSIGNED NOT NULL UNIQUE,
  `category_id` int UNSIGNED NOT NULL,
--   `image` text NOT NULL,
  `image` text NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  FOREIGN KEY (`category_id`) REFERENCES `users_categories` (`category_id`)
);

CREATE TABLE `products` (
  `product_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` int UNSIGNED NOT NULL,
  `discount` int UNSIGNED NOT NULL,
  `description_title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `stock` int UNSIGNED NOT NULL,
  `category_id` int UNSIGNED NOT NULL,
  `brand_id` int UNSIGNED NOT NULL,
  `specs` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  FOREIGN KEY (`category_id`) REFERENCES `products_categories` (`category_id`),
  FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`)
);

CREATE TABLE `colors` (
  `product_id` int UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL UNIQUE,
  PRIMARY KEY (`product_id`),
  FOREIGN KEY (`product_id`) REFERENCES  `products` (`product_id`)
);

CREATE TABLE `images` (
  `product_id` int UNSIGNED NOT NULL,
  `location` text NOT NULL UNIQUE,
  PRIMARY KEY (`product_id`),
  FOREIGN KEY (`product_id`) REFERENCES  `products` (`product_id`)
);

CREATE TABLE `shopping_cart` (
  `shopping_cart_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int UNSIGNED NOT NULL,
  `number_of_items` int UNSIGNED NOT NULL,
  `total_price` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL, 
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`shopping_cart_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);

CREATE TABLE `shopping_cart_products` (
  `shopping_cart_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` int UNSIGNED NOT NULL,
  PRIMARY KEY ( `shopping_cart_id`),
  FOREIGN KEY (`shopping_cart_id`) REFERENCES `shopping_cart` (`shopping_cart_id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
);

/* delete if needed */

/* user_categories */
INSERT INTO users_categories(name) VALUE("admin");
INSERT INTO users_categories(name) VALUE("seller");
INSERT INTO users_categories(name) VALUE("buyer");
/* END */

/* users */
insert into users (first_name, last_name, email, password, dni, phone, category_id, image)
values ("Maciel", "Martinez", "macielmartinez@gmail.com", "$2b$10$8jpIQKzrttIWj/xTnkqwg.4nImKXLzzGBLUUc9n5LmgkGih6lh1AC", "12345678", "3881234567", 3, null);

insert into users (first_name, last_name, email, password, dni, phone, category_id, image)
values ("Valentin", "Lopez", "valentinlopez@gmail.com", "$2b$10$2dYUyCOXC5gXzJmmXb6YdOHD04.XscSp2gt3xcoy0mIIGCGkAwRrq", "13245678", "3881234567", 2, null);

insert into users (first_name, last_name, email, password, dni, phone, category_id, image)
values ("Kevin", "Quintana", "kevinquintana@gmail.com", "$2b$10$7loY6u1m8/ZrsXnuStDJ6.kaziLns56zHI1h1iYVb.K7TrjgG9x7m", "12354678", "3881234567", 3, null);

insert into users (first_name, last_name, email, password, dni, phone, category_id, image)
values ("Gabriel", "Veramendi", "gabiveramendi@gmail.com", "$2b$10$ENqNei7zZ7W4PuKZETmzWutUQ4I3tHxe8mt6pN74w61Fh/ie1njPa", "12346578", "3881234567", 2, null);

insert into users (first_name, last_name, email, password, dni, phone, category_id, image)
values ("Santino", "Viglino", "santinoviglino36@gmail.com", "$2b$10$0Uu5VWUYwVXnxVPyYYkOBeUHYnxrMJJ0rwitiyvCfB2vKZ8OpUkCC", "12345768", "3881234567", 2, null);
/* END */