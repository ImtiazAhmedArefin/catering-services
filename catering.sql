-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2025 at 09:20 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `catering_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Appetizers', 'Start your meal with our delicious appetizers', 'categories/appetizers.jpg', '2025-08-11 04:26:37', '2025-08-11 04:26:37'),
(2, 'Main Courses', 'Hearty main courses for your dining pleasure', 'categories/main-courses.jpg', '2025-08-11 04:26:54', '2025-08-11 04:26:54'),
(3, 'Desserts', 'Sweet endings to your perfect meal', 'categories/desserts.jpg', '2025-08-11 04:27:15', '2025-08-11 04:27:15'),
(4, 'Beverages', 'Refreshing drinks to complement your meal', 'categories/beverages.jpg', '2025-08-11 04:27:35', '2025-08-11 04:27:35'),
(5, 'Salads', 'Fresh and healthy salad options', 'categories/salads.jpg', '2025-08-11 04:27:55', '2025-08-11 04:27:55');

-- --------------------------------------------------------

--
-- Table structure for table `menu_items`
--

CREATE TABLE `menu_items` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `category_id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_vegetarian` tinyint(1) DEFAULT 0,
  `is_vegan` tinyint(1) DEFAULT 0,
  `is_gluten_free` tinyint(1) DEFAULT 0,
  `is_featured` tinyint(1) DEFAULT 0,
  `ingredients` text DEFAULT NULL,
  `allergens` text DEFAULT NULL,
  `preparation_time` int(11) DEFAULT NULL COMMENT 'in minutes',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_items`
--

INSERT INTO `menu_items` (`id`, `name`, `description`, `price`, `category_id`, `image`, `is_vegetarian`, `is_vegan`, `is_gluten_free`, `is_featured`, `ingredients`, `allergens`, `preparation_time`, `created_at`, `updated_at`) VALUES
(1, 'Caesar Salad', 'Fresh romaine lettuce, parmesan cheese, croutons, and our special Caesar dressing', 12.99, 5, 'menu_items/caesar-salad.jpg', 1, 0, 0, 1, 'Romaine lettuce, parmesan cheese, croutons, Caesar dressing', 'Dairy, gluten', 15, '2025-08-11 05:19:44', '2025-08-11 05:19:44'),
(2, 'Grilled Salmon', 'Fresh Atlantic salmon grilled to perfection, served with seasonal vegetables', 24.99, 2, 'menu_items/grilled-salmon.jpg', 0, 0, 1, 1, 'Atlantic salmon, seasonal vegetables, herbs, olive oil', 'Fish', 25, '2025-08-11 05:22:04', '2025-08-11 05:22:04'),
(3, 'Chocolate Cake', 'Rich chocolate cake with chocolate ganache and fresh berries', 8.99, 3, 'menu_items/chocolate-cake.jpg', 1, 0, 0, 1, 'Flour, eggs, butter, chocolate, sugar, berries', 'Dairy, eggs, gluten', 5, '2025-08-11 05:23:15', '2025-08-11 05:23:15'),
(4, 'Vegetable Spring Rolls', 'Crispy vegetable spring rolls served with sweet chili sauce', 8.99, 1, 'menu_items/spring-rolls.jpg', 1, 1, 1, 0, 'Vegetables, rice paper, sweet chili sauce', 'None', 10, '2025-08-11 05:24:30', '2025-08-11 05:24:30'),
(5, 'Fresh Fruit Juice', 'Freshly squeezed seasonal fruit juice', 5.99, 4, 'menu_items/fruit-juice.jpg', 1, 1, 1, 0, 'Seasonal fruits', 'None', 5, '2025-08-11 05:25:45', '2025-08-11 05:25:45'),
(6, 'Beef Tenderloin', 'Premium beef tenderloin cooked to your preference, served with mashed potatoes and gravy', 32.99, 2, 'menu_items/beef-tenderloin.jpg', 0, 0, 0, 1, 'Beef tenderloin, potatoes, butter, cream, herbs', 'Meat, dairy', 30, '2025-08-11 05:27:00', '2025-08-11 05:27:00'),
(7, 'Tiramisu', 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream', 9.99, 3, 'menu_items/tiramisu.jpg', 0, 0, 0, 1, 'Ladyfingers, mascarpone, eggs, sugar, coffee, cocoa', 'Dairy, eggs, gluten', 5, '2025-08-11 05:28:15', '2025-08-11 05:28:15'),
(8, 'Quinoa Salad', 'Nutritious quinoa with roasted vegetables, feta cheese, and lemon vinaigrette', 14.99, 5, 'menu_items/quinoa-salad.jpg', 1, 0, 0, 0, 'Quinoa, mixed vegetables, feta cheese, olive oil, lemon', 'Dairy', 20, '2025-08-11 05:29:30', '2025-08-11 05:29:30');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `contact_no` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `role` enum('customer','admin','staff') DEFAULT 'customer',
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `remember_token` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `contact_no`, `address`, `role`, `status`, `remember_token`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Admin User', 'admin@catering.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, NULL, 'admin', 1, NULL, 'users/admin.jpg', '2025-08-11 05:30:00', '2025-08-11 05:30:00'),
(2, 'John Smith', 'john@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '555-1234', '123 Main St, City, Country', 'customer', 1, NULL, 'users/john.jpg', '2025-08-11 05:31:15', '2025-08-11 05:31:15'),
(3, 'Jane Doe', 'jane@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '555-5678', '456 Oak Ave, City, Country', 'customer', 1, NULL, 'users/jane.jpg', '2025-08-11 05:32:30', '2025-08-11 05:32:30'),
(4, 'Staff User', 'staff@catering.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '555-9012', '789 Pine Rd, City, Country', 'staff', 1, NULL, 'users/staff.jpg', '2025-08-11 05:33:45', '2025-08-11 05:33:45');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `event_type` varchar(255) NOT NULL,
  `event_date` date NOT NULL,
  `event_time` time NOT NULL,
  `venue` text NOT NULL,
  `guest_count` int(11) NOT NULL,
  `special_requests` text DEFAULT NULL,
  `status` enum('pending','confirmed','cancelled','completed') DEFAULT 'pending',
  `total_amount` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `event_type`, `event_date`, `event_time`, `venue`, `guest_count`, `special_requests`, `status`, `total_amount`, `created_at`, `updated_at`) VALUES
(1, 2, 'Wedding', '2025-09-15', '18:00:00', 'Grand Ballroom, 123 Event Street', 150, 'Vegetarian options for 20 guests', 'confirmed', 3500.00, '2025-08-11 05:35:00', '2025-08-11 05:35:00'),
(2, 3, 'Corporate Event', '2025-08-25', '12:00:00', 'Conference Center, 456 Business Ave', 80, 'Projector and screen needed for presentation', 'confirmed', 1200.00, '2025-08-11 05:36:15', '2025-08-11 05:36:15'),
(3, 2, 'Birthday Party', '2025-09-05', '15:00:00', 'Garden Pavilion, 789 Park Lane', 30, 'Children-friendly menu and birthday cake', 'pending', 800.00, '2025-08-11 05:37:30', '2025-08-11 05:37:30');

-- --------------------------------------------------------

--
-- Table structure for table `booking_menu_items`
--

CREATE TABLE `booking_menu_items` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `menu_item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking_menu_items`
--

INSERT INTO `booking_menu_items` (`id`, `booking_id`, `menu_item_id`, `quantity`, `notes`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 150, 'Serve with seasonal vegetables', '2025-08-11 05:40:00', '2025-08-11 05:40:00'),
(2, 1, 3, 150, 'Include birthday message on some cakes', '2025-08-11 05:41:15', '2025-08-11 05:41:15'),
(3, 1, 5, 150, 'Mix of fruit flavors', '2025-08-11 05:42:30', '2025-08-11 05:42:30'),
(4, 2, 1, 80, 'Light dressing option', '2025-08-11 05:43:45', '2025-08-11 05:43:45'),
(5, 2, 6, 80, 'Medium rare for most', '2025-08-11 05:45:00', '2025-08-11 05:45:00'),
(6, 3, 4, 30, 'Extra sauce on the side', '2025-08-11 05:46:15', '2025-08-11 05:46:15'),
(7, 3, 7, 30, 'Add candles for birthday', '2025-08-11 05:47:30', '2025-08-11 05:47:30');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `menu_item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `menu_item_id`, `quantity`, `notes`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 2, 'Extra croutons', '2025-08-11 05:50:00', '2025-08-11 05:50:00'),
(2, 2, 3, 1, 'No berries on top', '2025-08-11 05:51:15', '2025-08-11 05:51:15'),
(3, 3, 2, 1, 'Well done', '2025-08-11 05:52:30', '2025-08-11 05:52:30'),
(4, 3, 5, 2, 'Mix of orange and apple', '2025-08-11 05:53:45', '2025-08-11 05:53:45');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `event_type` varchar(255) DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `comment` text NOT NULL,
  `is_approved` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `user_id`, `event_type`, `rating`, `comment`, `is_approved`, `created_at`, `updated_at`) VALUES
(1, 2, 'Wedding', 5, 'The catering service was exceptional! The food was delicious and the staff was very professional. All our guests were impressed.', 1, '2025-08-11 05:55:00', '2025-08-11 05:55:00'),
(2, 3, 'Corporate Event', 4, 'Great food and service. The menu options were perfect for our corporate event. Would definitely recommend.', 1, '2025-08-11 05:56:15', '2025-08-11 05:56:15'),
(3, 2, 'Birthday Party', 5, 'Made my daughter\'s birthday party special with amazing food and friendly staff. Thank you!', 1, '2025-08-11 05:57:30', '2025-08-11 05:57:30');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `name`, `description`, `image`, `icon`, `created_at`, `updated_at`) VALUES
(1, 'Wedding Catering', 'Make your special day perfect with our exquisite wedding catering services. We offer customized menus to suit your taste and budget.', 'services/wedding.jpg', 'fa-heart', '2025-08-11 06:00:00', '2025-08-11 06:00:00'),
(2, 'Corporate Events', 'Professional catering services for corporate events, meetings, and conferences. We ensure your event runs smoothly with delicious food.', 'services/corporate.jpg', 'fa-briefcase', '2025-08-11 06:01:15', '2025-08-11 06:01:15'),
(3, 'Private Parties', 'Celebrate your private events with our personalized catering services. From birthday parties to anniversaries, we make every occasion special.', 'services/parties.jpg', 'fa-glass-cheers', '2025-08-11 06:02:30', '2025-08-11 06:02:30'),
(4, 'Buffet Catering', 'Wide variety of buffet options perfect for any event size. Our buffets are beautifully presented and constantly replenished.', 'services/buffet.jpg', 'fa-utensils', '2025-08-11 06:03:45', '2025-08-11 06:03:45'),
(5, 'Cocktail Reception', 'Elegant cocktail receptions with a variety of appetizers and drinks. Perfect for networking events and social gatherings.', 'services/cocktail.jpg', 'fa-cocktail', '2025-08-11 06:05:00', '2025-08-11 06:05:00'),
(6, 'Box Lunches', 'Convenient and delicious box lunches for corporate meetings, picnics, and on-the-go events.', 'services/box-lunches.jpg', 'fa-box', '2025-08-11 06:06:15', '2025-08-11 06:06:15');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `event_date` date NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `event_date`, `image`, `location`, `created_at`, `updated_at`) VALUES
(1, 'Summer Food Festival', 'Join us for our annual summer food festival featuring seasonal dishes and local ingredients. Live cooking demonstrations and tasting sessions.', '2025-07-15', 'events/summer-festival.jpg', 'Central Park', '2025-08-11 06:10:00', '2025-08-11 06:10:00'),
(2, 'Wine Tasting Evening', 'An elegant evening of wine tasting paired with gourmet appetizers. Learn about different wine regions and pairing techniques from our expert sommeliers.', '2025-08-20', 'events/wine-tasting.jpg', 'Rooftop Terrace', '2025-08-11 06:11:15', '2025-08-11 06:11:15'),
(3, 'Cooking Masterclass', 'Hands-on cooking class with our head chef. Learn to prepare a three-course meal and enjoy your creations with fellow participants.', '2025-09-10', 'events/cooking-class.jpg', 'Main Kitchen', '2025-08-11 06:12:30', '2025-08-11 06:12:30'),
(4, 'Charity Gala Dinner', 'Annual charity gala dinner supporting local food banks. Enjoy a five-course meal and participate in our charity auction.', '2025-10-05', 'events/charity-gala.jpg', 'Grand Ballroom', '2025-08-11 06:13:45', '2025-08-11 06:13:45');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `bio` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `name`, `position`, `bio`, `image`, `facebook`, `twitter`, `instagram`, `linkedin`, `created_at`, `updated_at`) VALUES
(1, 'John Chef', 'Head Chef', 'With over 15 years of culinary experience, John leads our kitchen with passion and creativity. He specializes in fusion cuisine and has worked in some of the finest restaurants around the world.', 'teams/john-chef.jpg', 'https://facebook.com/johnchef', 'https://twitter.com/johnchef', 'https://instagram.com/johnchef', 'https://linkedin.com/in/johnchef', '2025-08-11 06:15:00', '2025-08-11 06:15:00'),
(2, 'Sarah Manager', 'Event Manager', 'Sarah has been managing events for over 10 years and ensures that every detail is perfect. Her organizational skills and attention to detail make her an invaluable part of our team.', 'teams/sarah-manager.jpg', 'https://facebook.com/sarahmanager', 'https://twitter.com/sarahmanager', 'https://instagram.com/sarahmanager', 'https://linkedin.com/in/sarahmanager', '2025-08-11 06:16:15', '2025-08-11 06:16:15'),
(3, 'Michael Sous', 'Sous Chef', 'Michael brings creativity and innovation to our kitchen. His expertise in international cuisine helps us offer diverse and exciting menu options for our clients.', 'teams/michael-sous.jpg', 'https://facebook.com/michaelsous', 'https://twitter.com/michaelsous', 'https://instagram.com/michaelsous', 'https://linkedin.com/in/michaelsous', '2025-08-11 06:17:30', '2025-08-11 06:17:30'),
(4, 'Emily Coordinator', 'Event Coordinator', 'Emily works closely with clients to ensure their vision becomes a reality. Her excellent communication skills and friendly demeanor make her a favorite among our clients.', 'teams/emily-coordinator.jpg', 'https://facebook.com/emilycoordinator', 'https://twitter.com/emilycoordinator', 'https://instagram.com/emilycoordinator', 'https://linkedin.com/in/emilycoordinator', '2025-08-11 06:18:45', '2025-08-11 06:18:45');

-- --------------------------------------------------------

--
-- Table structure for table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `excerpt` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `author_id` int(11) NOT NULL,
  `published_at` datetime DEFAULT NULL,
  `status` enum('draft','published') DEFAULT 'draft',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_posts`
--

INSERT INTO `blog_posts` (`id`, `title`, `content`, `excerpt`, `image`, `author_id`, `published_at`, `status`, `created_at`, `updated_at`) VALUES
(1, '10 Tips for Planning the Perfect Wedding Menu', 'Planning a wedding menu can be overwhelming, but with these 10 tips, you\'ll be able to create a memorable dining experience for your guests. From considering dietary restrictions to choosing seasonal ingredients, we\'ve got you covered...', 'Planning a wedding menu can be overwhelming, but with these 10 tips, you\'ll be able to create a memorable dining experience for your guests.', 'blog/wedding-menu-tips.jpg', 1, '2025-08-01 10:00:00', 'published', '2025-08-11 06:20:00', '2025-08-11 06:20:00'),
(2, 'The Art of Corporate Event Catering', 'Corporate events require a different approach to catering than social events. In this article, we explore the key considerations for planning successful corporate catering, from menu selection to presentation...', 'Corporate events require a different approach to catering than social events. In this article, we explore the key considerations for planning successful corporate catering.', 'blog/corporate-catering.jpg', 2, '2025-08-05 14:30:00', 'published', '2025-08-11 06:21:15', '2025-08-11 06:21:15'),
(3, 'Seasonal Menu Inspiration: Summer Edition', 'Summer brings an abundance of fresh ingredients that can elevate any menu. In this post, we share our favorite summer dishes and provide inspiration for your next event...', 'Summer brings an abundance of fresh ingredients that can elevate any menu. In this post, we share our favorite summer dishes and provide inspiration for your next event.', 'blog/summer-menu.jpg', 1, '2025-08-10 09:15:00', 'published', '2025-08-11 06:22:30', '2025-08-11 06:22:30');

-- --------------------------------------------------------

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `booking_menu_items`
--
ALTER TABLE `booking_menu_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_id` (`booking_id`),
  ADD KEY `menu_item_id` (`menu_item_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `menu_item_id` (`menu_item_id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `booking_menu_items`
--
ALTER TABLE `booking_menu_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD CONSTRAINT `menu_items_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `booking_menu_items`
--
ALTER TABLE `booking_menu_items`
  ADD CONSTRAINT `booking_menu_items_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `booking_menu_items_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD CONSTRAINT `testimonials_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD CONSTRAINT `blog_posts_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;