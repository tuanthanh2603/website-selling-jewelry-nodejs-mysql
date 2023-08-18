-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th4 16, 2023 lúc 03:16 PM
-- Phiên bản máy phục vụ: 10.4.21-MariaDB
-- Phiên bản PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `project05`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `catalog`
--

CREATE TABLE `catalog` (
  `idCat` int(11) NOT NULL,
  `nameCat` varchar(255) NOT NULL,
  `imgCat` varchar(255) DEFAULT NULL,
  `timeAdd` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `catalog`
--

INSERT INTO `catalog` (`idCat`, `nameCat`, `imgCat`, `timeAdd`, `status`) VALUES
(10, 'Nhẫn', NULL, '2023-04-05 00:42:01', 1),
(31, 'Dây chuyền', NULL, '2023-04-07 07:11:22', 1),
(33, 'Bông tai', NULL, '2023-04-07 07:18:57', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitiethoadon`
--

CREATE TABLE `chitiethoadon` (
  `idCTHD` int(11) NOT NULL,
  `idHD` int(11) NOT NULL,
  `idSP` int(11) NOT NULL,
  `soluong` int(11) NOT NULL,
  `giaban` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `chitiethoadon`
--

INSERT INTO `chitiethoadon` (`idCTHD`, `idHD`, `idSP`, `soluong`, `giaban`) VALUES
(49, 141, 5, 2, 6792000),
(50, 141, 3, 3, 12606000),
(51, 144, 2, 2, 26922000),
(52, 145, 2, 2, 13461000),
(53, 146, 18, 1, 3000000),
(54, 146, 3, 1, 3),
(55, 147, 18, 3, 3000000),
(56, 146, 1, 1, 4),
(57, 146, 3, 2, 300000),
(58, 146, 1, 1, 4),
(59, 148, 1, 1, 4),
(60, 149, 1, 1, 4),
(61, 150, 3, 1, 300000),
(62, 150, 18, 1, 3000000),
(63, 151, 3, 1, 300000),
(64, 151, 18, 1, 3000000),
(65, 152, 3, 1, 300000),
(66, 152, 18, 1, 3000000),
(67, 153, 3, 1, 300000),
(68, 153, 18, 1, 3000000),
(69, 154, 1, 1, 4),
(70, 155, 1, 1, 4),
(71, 156, 1, 1, 4),
(72, 158, 18, 1, 3000000),
(73, 159, 18, 3, 3000000),
(74, 160, 18, 1, 3000000),
(75, 160, 24, 1, 10513000),
(76, 161, 18, 1, 3000000),
(77, 162, 23, 1, 13317000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

CREATE TABLE `comment` (
  `idComment` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `rating` int(5) NOT NULL,
  `content` text NOT NULL,
  `idProduct` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `comment`
--

INSERT INTO `comment` (`idComment`, `name`, `email`, `rating`, `content`, `idProduct`, `date`) VALUES
(1, 'Thành', 'thanh@gmail.com', 5, 'good', 23, '2023-04-07 08:02:29'),
(2, 'Tâm', 'tam@gmail.com', 1, 'tệ', 23, '2023-04-07 08:04:59'),
(3, 'Tâm', 't', 2, 'tệ', 23, '2023-04-07 12:30:05'),
(4, 't', '', 5, 'gg', 23, '2023-04-11 12:23:06');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoadon`
--

CREATE TABLE `hoadon` (
  `idHD` int(11) NOT NULL,
  `ngaylapHD` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `idKH` int(11) NOT NULL,
  `tinhtrang` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `hoadon`
--

INSERT INTO `hoadon` (`idHD`, `ngaylapHD`, `idKH`, `tinhtrang`) VALUES
(151, '2023-03-31 11:51:47', 2, 0),
(152, '2023-04-07 00:21:38', 2, 1),
(159, '2023-04-07 02:29:05', 57, 0),
(160, '2023-04-07 02:39:39', 57, 0),
(161, '2023-04-11 11:22:01', 2, 0),
(162, '2023-04-11 12:23:45', 2, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `idProduct` int(11) NOT NULL,
  `nameProduct` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `imgProduct` varchar(255) NOT NULL,
  `showhide` tinyint(1) NOT NULL,
  `idCat` int(11) NOT NULL,
  `viewss` tinyint(1) NOT NULL DEFAULT 0,
  `dateUpdate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `priceProduct` int(11) NOT NULL,
  `count` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`idProduct`, `nameProduct`, `slug`, `description`, `imgProduct`, `showhide`, `idCat`, `viewss`, `dateUpdate`, `priceProduct`, `count`) VALUES
(18, 'Nhẫn Vàng trắng 10K đính đá ECZ PNJ', 'XMXMW000093', 'mô tả 2', '1681215930987-day-chuyen-vang-trang-18k-pnj-02.png', 1, 10, 0, '2023-04-11 12:25:30', 3000000, 1),
(23, 'Nhẫn cưới nam Vàng 18K đính đá ECZ PNJ', 'XM00Y002737', 'Trọng lượng tham khảo:19.64543 phân\r\n \r\n\r\n\r\n- Loại đá chính: Xoàn mỹ\r\n \r\n- Màu đá chính: Trắng\r\n \r\n- Hình dạng đá: Chữ nhật\r\n \r\n- Loại đá phụ:Không gắn đá\r\n\r\n\r\n\r\n- Thương hiệu: PNJ\r\n\r\n\r\n- Giới tính: Nam', '1680825721982-nhan-cuoi-nam-vang-18k-dinh-da-ecz-pnj-01.png', 1, 10, 1, '2023-04-07 00:17:13', 13317000, 1),
(24, 'Nhẫn Vàng 18K đính đá CZ PNJ', 'XMXMY006396', 'Sở hữu thiết kế đủ mềm mại nhưng lại đầy quyền năng, đủ phá cách như cho một sự khác lạ, vừa mang nét hiện đại, trẻ trung bởi sự rành mạch trong đường nét, lại vừa giữ được sự mềm mại, kiêu sa giữa sự ngẫu hứng cùng vàng và đá, chiếc nhẫn CZ ấn tượng như người phụ nữ trưởng thành với phong cách và con đường riêng để khẳng định bản ngã của chính mình.', '1680825982640-nhan-vang-18k-dinh-da-cz-pnj.png', 1, 10, 0, '2023-04-07 00:06:22', 10513000, 1),
(25, 'Nhẫn Vàng trắng Ý 18K PNJ', '0000W001474', 'Làm mới quy chuẩn cổ điển của sắc vàng Ý 18K cùng thiết kế hiện đại, đôi bông tai PNJ hiện hữu nét tươi mới, lại thật vừa vặn để sáng bừng vẻ đẹp lạc quan của quý cô. Sự đồng điệu và hài hòa theo từng đường nét ngẫu hứng, tạo nên tổng thể cho đôi bông tai tuyệt đẹp.', '1680826167414-bong-tai-vang-trang-y-18k-pnj-1.png', 1, 10, 0, '2023-04-07 00:09:27', 4865000, 1),
(26, 'Dây chuyền Vàng trắng Ý 18K PNJ', '0000W000818', 'Bằng việc kết hợp chất liệu vàng ý 18K cùng thiết kế tinh tế, sợi dây chuyền chính là điểm nhấn nổi bật, tô điểm thêm vẻ đẹp thanh lịch và duyên dáng cho nàng. Dây đeo mảnh thích hợp với những bộ trang phục có nhiều họa tiết, đồng thời tạo điểm nhìn cân bằng với các phụ kiện to bản khác. \r\n', '1680826371623-day-chuyen-vang-trang-y-18k-pnj.png', 1, 31, 0, '2023-04-07 00:12:51', 8511000, 1),
(27, 'Dây chuyền Vàng trắng 18K PNJ', '0000W061038', 'Bằng việc kết hợp chất liệu vàng ý 18K cùng thiết kế tinh tế, sợi dây chuyền chính là điểm nhấn nổi bật, tô điểm thêm vẻ đẹp thanh lịch và duyên dáng cho nàng. Dây đeo mảnh thích hợp với những bộ trang phục có nhiều họa tiết, đồng thời tạo điểm nhìn cân bằng với các phụ kiện to bản khác.', '1680826452507-day-chuyen-vang-trang-18k-pnj-02.png', 1, 31, 0, '2023-04-07 00:14:12', 12290000, 1),
(28, 'Bông tai Vàng 10K đính đá ECZ PNJ Euphoria ', 'XMXMC000423', 'Lấy cảm hứng từ hoa thủy tiên và lưu ly - hai loài hoa tượng trưng cho nét duyên dáng nhưng rực rỡ, đa dạng màu sắc tựa như sự năng động trong phong cách và tính cách của người phụ nữ hiện đại. PNJ cho ra mắt BST Euphoria với đôi bông tai Vàng 10K đính đá ECZ trẻ trung và tinh tế.', '1680826795714-bong-tai-vang-10k-dinh-da-ecz-pnj-euphoria-01.png', 1, 33, 1, '2023-04-07 00:23:01', 6623000, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `idUser` int(11) NOT NULL,
  `ho` varchar(20) NOT NULL,
  `ten` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `phone` varchar(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `tinh` varchar(100) NOT NULL,
  `huyen` varchar(100) NOT NULL,
  `isAdmin` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`idUser`, `ho`, `ten`, `email`, `password`, `phone`, `address`, `tinh`, `huyen`, `isAdmin`) VALUES
(1, 'Đặng Tuấn', 'Thành', 'tuanthanhktltk21@gmail.com', '12345', '0397892603', 'Buôn Ma Thuột', '', '', 1),
(2, 'Ngân Thị', 'Tâm', 'nganthitam0601@gmail.com', '12345', '081646', 'Tam Giang', 'Đăk Lăk', 'Krông Năng', 0),
(86, 'Lan', 'Phương', 'lanphuong@gmail.com', '123', '093648', '461 Nguyễn văn cừ, phường Tân Lập', 'Đắk Lắk', 'Thành phố Buôn Ma Thuột', 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `catalog`
--
ALTER TABLE `catalog`
  ADD PRIMARY KEY (`idCat`);

--
-- Chỉ mục cho bảng `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  ADD PRIMARY KEY (`idCTHD`);

--
-- Chỉ mục cho bảng `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`idComment`);

--
-- Chỉ mục cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`idHD`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`idProduct`),
  ADD KEY `idCat` (`idCat`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `catalog`
--
ALTER TABLE `catalog`
  MODIFY `idCat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT cho bảng `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  MODIFY `idCTHD` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT cho bảng `comment`
--
ALTER TABLE `comment`
  MODIFY `idComment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `idHD` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `idProduct` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`idCat`) REFERENCES `catalog` (`idCat`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
