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
  `product_id` integer UNSIGNED NOT NULL AUTO_INCREMENT,
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

-- CREATE TABLE `colors` (
--  `product_id` int UNSIGNED NOT NULL,
--  `name` varchar(100) NOT NULL UNIQUE,
--  PRIMARY KEY (`product_id`),
--  FOREIGN KEY (`product_id`) REFERENCES  `products` (`product_id`)
-- );

/* test */
 CREATE TABLE `colors` (
   `color_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
   `name` varchar(100) NOT NULL UNIQUE,
   `hex_values` varchar(100) NOT NULL UNIQUE,
   PRIMARY KEY (`color_id`)
 );
/* END */

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

/* brands */
INSERT INTO brands(name)
VALUES('Acer'), ('AMD'), ('ASRock'), ('ASUS'), ('Avermedia'), ('BenQ'), ('Blackmagic Design'), ('Cooler Master'), ('Corsair'),
('Creative'), ('Crucial'), ('Dell'), ('EVGA'), ('Fractal Design'), ('G.Skill'), ('Gigabyte'), ('HyperX'), ('Intel'), ('Kingston'),
('LG'), ('Lite-On'), ('Logitech'), ('MSI'), ('NZXT'), ('NVIDIA'), ('Phanteks'), ('Razer'), ('Redragon'), ('Samsung'), ('Seasonic'), ('Seagate'),
('Sound Blaster'), ('SteelSeries'), ('Thermaltake'), ('TP-Link'), ('Western Digital (WD)');
/* END */

/* products_categories */
INSERT INTO products_categories(name)
VALUES('Altavoces'), ('Auriculares'), ('Disco de estado sólido (SSD)'), ('Disco duro (HDD)'),
('Fuente de alimentación (PSU)'), ('Gabinete'), ('Memoria RAM'), ('Monitor'), ('Mouse'),
('Placa base (Motherboard)'), ('Placa de red'), ('Placa de sonido'), ('Placa de video (GPU)'),
('Procesador (CPU)'), ('Teclado');
/* END */

/* user_categories */
INSERT INTO users_categories(name) VALUES('admin'), ('seller'), ('buyer');
/* END */

/* users */
INSERT INTO users (first_name, last_name, email, password, dni, phone, category_id, image)
VALUES	('Maciel', 'Martinez', 'macielmartinez@gmail.com', '$2b$10$8jpIQKzrttIWj/xTnkqwg.4nImKXLzzGBLUUc9n5LmgkGih6lh1AC', '12345678', '3881234567', 3, null),
		('Valentin', 'Lopez', 'valentinlopez@gmail.com', '$2b$10$2dYUyCOXC5gXzJmmXb6YdOHD04.XscSp2gt3xcoy0mIIGCGkAwRrq', '13245678', '3881234567', 2, null),
		('Kevin', 'Quintana', 'kevinquintana@gmail.com', '$2b$10$7loY6u1m8/ZrsXnuStDJ6.kaziLns56zHI1h1iYVb.K7TrjgG9x7m', '12354678', '3881234567', 3, null),
		('Gabriel', 'Veramendi', 'gabiveramendi@gmail.com', '$2b$10$ENqNei7zZ7W4PuKZETmzWutUQ4I3tHxe8mt6pN74w61Fh/ie1njPa', '12346578', '3881234567', 2, null),
		('Santino', 'Viglino', 'santinoviglino36@gmail.com', '$2b$10$0Uu5VWUYwVXnxVPyYYkOBeUHYnxrMJJ0rwitiyvCfB2vKZ8OpUkCC', '12345768', '3881234567', 2, null);
/* END */

/* products */
INSERT INTO products(name, price, discount, description_title, description, stock, category_id, brand_id, specs)
VALUES('Logitech G Series G502 Hero', 50000, 0, 'Logitech G Series G502 Hero', 'Logitech diseña productos y experiencias que ocupan un lugar cotidiano en la vida de las personas, poniendo foco en la innovación y la calidad. Su objetivo es crear momentos verdaderamente únicos y significativos para sus usuarios. Los mouses Logitech se adaptan a la forma de tu mano para proporcionarte horas de comodidad. Sin necesidad de mover el brazo para deslizar el cursor, tu mano se fatigará menos. Son ideales para cualquier espacio de trabajo y quienes tienen la mesa llena de diversos objetos.', 5, 9, 22, 'Utiliza cable\r\n\r\nPosee ruedas de desplazamiento\r\n\r\nCon luces para mejorar la experiencia de uso\r\n\r\nCon sensor óptico\r\n\r\nResolución de 16000dpi'),

('Amd Ryzen 5 4600g', 129999, 10, 'Amd Ryzen 5 4600g', 'Clave en el rendimiento de tu computadora de escritorio, ya no tenés que pensar en cómo distribuir el tiempo y acciones porque ahora las tareas en simultáneo son posibles. AMD cuenta con un catálogo de productos que se adaptan a los requerimientos de todo tipo de usuarios: juegos en línea, edición a gran escala, contenido en múltiples plataformas y más.', 10, 14, 2, 'Es ideal para jugadores y creadores de contenido que requieran un instrumento de gran ejecución.\r\n\r\nMemoria caché de 8 MB, rápida y volátil.\r\n\r\nProcesador gráfico Radeon Graphics.\r\n\r\nSoporta memoria RAM DDR4.\r\n\r\nSu potencia es de 65 W.\r\n\r\nCuenta con 12 hilos que favorecen la ejecución de múltiples programas a la vez.\r\n\r\nProducto en empaque original.\r\n\r\nProcesador innovador desarrollado bajo altos estándares de calidad.\r\n\r\nZócalos compatibles: AM4'),

('Fury Beast DDR4 Kingston', 20100, 15, 'Fury Beast DDR4 Kingston', 'Si tu computadora funciona con lentitud, si un programa no responde o no se carga, lo más probable es que se trate de un problema de memoria. Estos son posibles indicios de un rendimiento defectuoso en el día a día de tus tareas. Por ello, contar con una memoria Kingston -sinónimo de trayectoria y excelencia- mejorará la productividad de tu equipo: las páginas se cargarán más rápido y la ejecución de nuevas aplicaciones resultará más ágil y simple.', 15, 7, 19, 'Optimizá el rendimiento de tu máquina con la tecnología DDR4 SDRAM.\r\n\r\nMemoria con formato UDIMM.\r\n\r\nAlcanza una velocidad de 3200 MHz.\r\n\r\nApta para computadoras de escritorio.\r\n\r\nLínea Fury Beast DDR4.\r\n\r\nCuenta con una tasa de transferencia de 25600 MB/s.\r\n\r\nCompatible con AMD Ryzen'),

('Western Digital WD Green 240gb', 16999, 19, 'Western Digital WD Green 240gb', 'Este producto posee una interfaz SATA III que se encarga de transferir datos con la placa madre de tu computadora. Es de gran importancia y con su velocidad de envío de información mejora el rendimiento. Vas a poder cargar todo tipo de archivos en tu PC con rapidez.', 15, 4, 36, 'Útil para guardar programas y documentos con su capacidad de 240 GB.\r\n\r\nTamaño de 2.5 ''.\r\n\r\nInterfaz de conexión: SATA III.\r\n\r\nApto para PC y Notebook.\r\n\r\nLas imágenes pueden ser ilustrativas'),

('Teclado Gamer Redragon Kumara K552', 43000, 20, 'Teclado gamer Redragon Kumara K552', 'La gran calidad del Redragon Kumara K552, y su precio económico lo vuelven un atractivo ideal para que te diviertas frente a la pantalla. Su ergonomía, su base antideslizante y su rápido tiempo de respuesta permite que tus juegos favoritos se sientan más cerca que nunca, al alcance de tus manos.', 8, 15, 28, 'Ergonómico y apto para diversos usos.\r\n\r\nResiste a salpicaduras.\r\n\r\nFunción antighosting incorporada.\r\n\r\nTipo de teclado: mecánico.\r\n\r\nTecla cilíndrica.\r\n\r\nCon conector USB.\r\n\r\nMedidas: 37.5cm de ancho, 15.5cm de alto y 4.3cm de profundidad'),

('Placa de Video Nvidia Asus TUF gtx 1660 Ti', 377000, 15, 'Placa de video Nvidia Asus TUF gtx 1660 Ti', 'Este componente electrónico procesa la información que llega al dispositivo y los transforma en imágenes o videos para mostrarla visualmente. Es ideal para trabajar con aplicaciones gráficas, y correr juegos de alta exigencia ya que permite obtener imágenes más nítidas.', 5, 13, 25, 'Interfaz PCI-Express 3.0.\r\n\r\nBus de memoria: 192bit.\r\n\r\nCantidad de núcleos: 1536.\r\n\r\nResolución máxima: 7680x4320.\r\n\r\nRequiere de 450W de alimentación.\r\n\r\nPermite la conexión de hasta 4 pantallas simultáneas.\r\n\r\nFormatos de conexión: 2 HDMI 2.0b, DisplayPort 1.4a, DL-DVI-D.\r\n\r\nIncluye: Guía rápida.\r\n\r\nIdeal para trabajar a alta velocidad.\r\n\r\nIdeal para juegos de altas exigencias'),

('Auriculres Logitech G332', 43000, 0, 'Auriculres Logitech G332', 'Juega durante horas con comodidad: todo sobre estos auriculares es sobre la comodidad: las almohadillas y la diadema de cuero sintético ligero de lujo están hechas para mantener la presión fuera de tus oídos. Las almohadillas giran hasta 90 grados para mayor comodidad.', 3, 2, 22, 'Con micrófono incorporado.\r\n\r\nEl largo del cable es de 2 m.\r\n\r\nSonido superior y sin límites.\r\n\r\nCómodos y prácticos.\r\n\r\nTamaño del altavoz: 50mm.'),

('Monitor Samsung LED 22"', 90000, 10, 'Monitor Samsung led 22', 'Diseño minimalista, máxima concentración, la pantalla sin bordes en tres de sus lados aporta una estética clara y moderna a cualquier entorno de trabajo, en una en torno de varios monitores, las pantallas se alinean a la perfección para una vista prácticamente sin espacios y sin distracciones.', 10, 8, 29, 'Pantalla led de 24".\r\n\r\nTiene una resolución de 1920px-1080px.\r\n\r\nRelación de aspecto de 16:9.\r\n\r\nPanel IPS.\r\n\r\nSu brillo es de 250cd/m².\r\n\r\nTipos de conexión: D-Sub, HDMI 1.4.\r\n\r\nEs reclinable.'),

('Fuente de Alimentación para PC 650w Gigabyte', 75000, 5, 'Fuente de Alimentación para PC 650w Gigabyte', 'Con la fuente de alimentación Giga-Byte Technology P650B podrás asegurar la corriente continua y estable de tu computadora de escritorio y optimizar el funcionamiento de sus componentes.', 4, 5, 16, 'Potencia de salida de 650W.\r\n\r\nFuente de tipo ATX.\r\n\r\nCon certificación de eficiencia 80 Plus Bronze.\r\n\r\nDiámetro del ventilador de 120mm.\r\n\r\nTransforma la energía.\r\n\r\nDe uso imprescindible para el buen funcionamiento de la PC.\r\n');
/* END */

/* images */
INSERT INTO images (product_id,location) VALUES
(1,'Logitech-G-Series-G502-Hero.jpg'),
(2,'Amd-Ryzen-5-4600g.jpg'),
(3,'Fury-Beast-DDR4-Kingston.jpg'),
(4,'Western-Digital-WD-Green-240gb.jpg'),
(5,'image-1693868532620-311805739.webp'),
(6,'image-1693869009766-715204939.webp'),
(7,'image-1693869429132-950724607.jpg'),
(8,'image-1693869756662-802649085.webp'),
(9,'image-1693870206196-311038189.jpg');
/* END */

/* colors_test */
 INSERT INTO colors(name, hex_values) VALUES
 ('Amarillo', '#FFFF00'),
 ('Amarillo limón', '#FFF700'),
 ('Azul', '#0000FF'),
 ('Azul eléctrico', '#00FFFF'),
 ('Blanco', '#FFFFFF'),
 ('Gris', '#808080'),
 ('Gris grafito', '#2F4F4F'),
 ('Morado', '#800080'),
 ('Morado profundo', '#4B0082'),
 ('Naranja', '#FFA500'),
 ('Naranja brillante', '#FFD700'),
 ('Negro', '#000000'),
 ('Plateado', '#E3E4E5'),
 ('Rojo', '#FF0000'),
 ('Rojo fuego', '#FF4500'),
 ('Verde', '#008000'),
 ('Verde neón', '#39FF14');
/* END */

/* product_color_test */
 CREATE TABLE product_colors (
 	product_id INT UNSIGNED NOT NULL,
 	color_id INT UNSIGNED NOT NULL,
 	PRIMARY KEY (product_id, color_id),
 	FOREIGN KEY (product_id) REFERENCES products(product_id),
 	FOREIGN KEY (color_id) REFERENCES colors(color_id)
 );
/* END */

