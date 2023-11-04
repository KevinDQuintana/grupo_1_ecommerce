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
  `phone` int UNSIGNED NOT NULL,
  `category_id` int UNSIGNED NOT NULL UNIQUE,
  `image` text NOT NULL,
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