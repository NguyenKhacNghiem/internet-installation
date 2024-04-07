-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2024 at 06:36 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quanlygoicuoc`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

create database quanlygoicuoc;
use quanlygoicuoc;

CREATE TABLE `customer` (
  `phone` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `address` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`phone`, `password`, `fullname`, `address`, `email`) VALUES
('0909000000', '$2a$10$r26.9JJ9jbg5mGXTbZZzR.qV9ronXA0LKnYAW.aFCwZdI2Rspwyki', 'Nguyễn Văn A', 'Hà Nội', 'nguyenvana@gmail.com'),
('0909000111', '$2a$10$aYdGkqX.ISN0YJhpYIgaduJ5pVME3Bu8Gqv5pXfb8xWHY/PLFufKq', 'Nguyễn Văn B', 'TP. Hồ Chí Minh', 'nguyenvanb@gmail.com'),
('admin', '$2a$10$Fe2Bfb0evsfTRRr9AaruRusSEc8KN2V9HwGI/dKCAZ4SMcGozt6k6', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `phone` varchar(20) NOT NULL,
  `id` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  `number_of_month` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `address` varchar(200) NOT NULL,
  `note` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`phone`, `id`, `date`, `number_of_month`, `total_price`, `address`, `note`) VALUES
('0909000000', 'giga', '24/03/2024', 14, 3059000, 'Hà Nội', 'Chỉ rảnh ngày chủ nhật'),
('0909000111', 'lux', '24/03/2024', 1, 1100000, 'TP. Hồ Chí Minh', '');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `upload_bandwidth` int(11) NOT NULL,
  `download_bandwidth` int(11) NOT NULL,
  `price_per_month` int(11) NOT NULL,
  `install_fee` int(11) NOT NULL,
  `description` varchar(200) NOT NULL,
  `category` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `deleted` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `upload_bandwidth`, `download_bandwidth`, `price_per_month`, `install_fee`, `description`, `category`, `image`, `deleted`) VALUES
('cgiga', 'Gói Combo - Giga', 150, 150, 280000, 0, 'Tốc độ download/upload 150Mbps\r\nTrang bị Modem 2 băng tần thế hệ mới\r\n200+ kênh truyền hình trong nước\r\nPhù hợp với cá nhân, hộ gia đình', 'Internet + Truyền hình', 'cgiga.png', 0),
('csky', 'Gói Combo - Sky', 150, 1024, 310000, 0, 'Tốc độ download không giới hạn phụ thuộc vào thiết bị lên tới 1Gbps\r\nTốc độ upload 150Mbps\r\n200+ kênh truyền hình trong nước và quốc tế', 'Internet + Truyền hình', 'csky.png', 0),
('fgame', 'Internet - F-Game', 150, 1024, 320000, 299000, 'Tốc độ download không giới hạn phụ thuộc vào thiết bị lên tới 1Gbps\r\nTốc độ upload 150 Mbps\r\nTích hợp gói Ultrafast', 'Ultra fast', 'fgame.png', 0),
('giga', 'Internet - Giga', 150, 150, 230000, 299000, 'Tốc độ download/upload 150Mbps\r\nTrang bị Modem 2 băng tần thế hệ mới\r\nPhù hợp với cá nhân, hộ gia đình', 'Cáp quang cá nhân', 'giga.png', 0),
('lux', 'Internet - Lux500', 500, 500, 800000, 300000, 'Tốc độ download/upload 500Mbps\r\nTrang bị Modem Wi-Fi 6 + 01 thiết bị mở rộng sóng Wi-Fi 6\r\nHỗ trợ kỹ thuật 24/7\r\nTích hợp dịch vụ Ultrafast', 'Gói LUX', 'lux.png', 0),
('meta', 'Internet - Meta', 1024, 1024, 370000, 299000, 'Tốc độ download & upload không giới hạn phụ thuộc vào thiết bị lên tới 1Gbps\r\nTrang bị Modem 2 băng tần thế hệ mới\r\nPhù hợp với streamer, gamer', 'Cáp quang cá nhân', 'meta.png', 0),
('sky', 'Internet - Sky', 150, 1024, 280000, 299000, 'Tốc độ download không giới hạn phụ thuộc vào thiết bị lên tới 1Gbps\r\nTốc độ upload 150Mbps\r\nPhù hợp với hộ gia đình lớn', 'Cáp quang cá nhân', 'sky.png', 0),
('super', 'Internet - Super250', 250, 250, 545000, 300000, 'Tốc độ download/upload 250Mbps\r\nTrang bị Modem Wifi thế hệ mới\r\nHỗ trợ kỹ thuật 24/7', 'Cáp quang doanh nghiệp', 'super.jpg', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`phone`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`phone`,`id`),
  ADD KEY `fk_orders_id` (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_id` FOREIGN KEY (`id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `fk_orders_phone` FOREIGN KEY (`phone`) REFERENCES `customer` (`phone`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
