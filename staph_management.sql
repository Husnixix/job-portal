-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2024 at 06:01 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `staph_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `candidates`
--

CREATE TABLE `candidates` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone_number` int(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `candidates`
--

INSERT INTO `candidates` (`id`, `first_name`, `last_name`, `phone_number`, `email`, `password`) VALUES
(25, 'Husni', 'Haniffa', 757648396, 'husniwfayo@gmail.com', '$2y$10$LefFKDikraFolskSSvxfoe.u8//hcnZ/b2hAU1GHgY2SgfNHXhAYC'),
(26, 'omal', 'kunarathne', 770233456, 'husni.daraz@gmail.com', '$2y$10$/cBZe73P3jpaecwtaIbohOpyaGCD0N7FLbT.kDVA4xEN7/cwvIpeC');

-- --------------------------------------------------------

--
-- Table structure for table `candidates_about_me`
--

CREATE TABLE `candidates_about_me` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_resume` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `user_current_role` varchar(255) NOT NULL,
  `user_roles_open_to` varchar(255) NOT NULL,
  `bio` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `candidates_about_me`
--

INSERT INTO `candidates_about_me` (`id`, `user_id`, `user_resume`, `address`, `user_current_role`, `user_roles_open_to`, `bio`) VALUES
(14, 25, '/xampp/htdocs/STAPH/Job-Seeker/Profile/Resume/1712138082_660d276294342_sample.pdf', 'Colombo, Sri Lanka', 'Student', 'Manager', 'Software Engineering undergraduate '),
(15, 26, '/xampp/htdocs/STAPH/Job-Seeker/Profile/Resume/1712139221_660d2bd510cbf_dummy.pdf', 'Colombo', 'Student', 'Manager', 'Undergraduate');

-- --------------------------------------------------------

--
-- Table structure for table `candidates_expectation`
--

CREATE TABLE `candidates_expectation` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `prefered_work_style` varchar(75) NOT NULL,
  `currently_employed` varchar(25) NOT NULL,
  `employment_status` varchar(50) NOT NULL,
  `joining_period` varchar(75) NOT NULL,
  `expected_salary` int(255) NOT NULL,
  `expected_currency` varchar(50) NOT NULL,
  `paid_every` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `candidates_expectation`
--

INSERT INTO `candidates_expectation` (`id`, `user_id`, `prefered_work_style`, `currently_employed`, `employment_status`, `joining_period`, `expected_salary`, `expected_currency`, `paid_every`) VALUES
(12, 25, 'In-Office', 'Employed', 'Active', 'Immediately', 50000, 'LKR', 'Hour'),
(13, 26, 'In-Office', 'Employed', 'Active', 'Immediately', 20000, 'LKR', 'Hour');

-- --------------------------------------------------------

--
-- Table structure for table `candidates_skills`
--

CREATE TABLE `candidates_skills` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `skill_one` varchar(255) NOT NULL,
  `sk_one_no_of_experience` varchar(255) NOT NULL,
  `skill_two` varchar(255) NOT NULL,
  `sk_two_no_of_experience` varchar(255) NOT NULL,
  `skill_three` varchar(255) NOT NULL,
  `sk_three_no_of_experience` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `candidates_skills`
--

INSERT INTO `candidates_skills` (`id`, `user_id`, `skill_one`, `sk_one_no_of_experience`, `skill_two`, `sk_two_no_of_experience`, `skill_three`, `sk_three_no_of_experience`) VALUES
(12, 25, 'Java', 'Less than 1', 'Microsoft Excel', 'Less than 1', 'Java', 'Less than 1'),
(13, 26, 'Ms office', 'Less than 1', 'Excel', 'Less than 1', 'Java', 'Less than 1');

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `company_name` varchar(50) NOT NULL,
  `company_phone_number` int(10) NOT NULL,
  `company_email` varchar(75) NOT NULL,
  `company_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `company_name`, `company_phone_number`, `company_email`, `company_password`) VALUES
(4, 'Dailog', 774677123, 'dialog@gmail.com', '$2y$10$cdar8fB2.FpdC3aQ/hJpyuDbNWTzw7mKQlRkrP3EK0zS1iF5t7K82'),
(5, 'HCL', 115854071, 'hcl@gmail.com', '$2y$10$j8nPcnKDx7bgGjNG.RkRaeIX1LjLfgbLkMdPKxsh.RwhgLFSLOb5q');

-- --------------------------------------------------------

--
-- Table structure for table `company_about_me`
--

CREATE TABLE `company_about_me` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `organization` varchar(100) NOT NULL,
  `company_location` varchar(100) NOT NULL,
  `company_bio` varchar(750) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_about_me`
--

INSERT INTO `company_about_me` (`id`, `company_id`, `logo`, `organization`, `company_location`, `company_bio`) VALUES
(11, 4, '/xampp/htdocs/STAPH/Job-Provider/Profile/Files/1712146797_660d496d9fdf3_Dialog.jpg', 'Information Technology', 'Union Place', 'Dialog Axiata PLC is Sri Lanka  flagship telecommunication provider, which operates Dialog mobile  the countries largest mobile network'),
(12, 5, '/xampp/htdocs/STAPH/Job-Provider/Profile/Files/1712159815_660d7c47d5900_HCL.jpg', 'Healthcare', 'Kandy', 'HCL Technologies Limited, doing business as HCLTech, is an Indian multinational information technology consulting company headquartered in Noida');

-- --------------------------------------------------------

--
-- Table structure for table `company_job_posts`
--

CREATE TABLE `company_job_posts` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `employer` varchar(125) NOT NULL,
  `company_logo` varchar(255) NOT NULL,
  `job_title` varchar(50) NOT NULL,
  `job_primary_role` varchar(75) NOT NULL,
  `job_modality` varchar(50) NOT NULL,
  `job_type` varchar(50) NOT NULL,
  `job_country` varchar(50) NOT NULL,
  `job_salary` int(11) NOT NULL,
  `job_currency` varchar(10) NOT NULL,
  `job_location` varchar(100) NOT NULL,
  `job_requirments` varchar(1000) NOT NULL,
  `job_responsibilites` varchar(1000) NOT NULL,
  `posted_date` date NOT NULL DEFAULT current_timestamp(),
  `closing_date` date NOT NULL,
  `post_status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_job_posts`
--

INSERT INTO `company_job_posts` (`id`, `company_id`, `employer`, `company_logo`, `job_title`, `job_primary_role`, `job_modality`, `job_type`, `job_country`, `job_salary`, `job_currency`, `job_location`, `job_requirments`, `job_responsibilites`, `posted_date`, `closing_date`, `post_status`) VALUES
(26, 4, 'Dailog', '/xampp/htdocs/STAPH/Job-Provider/Profile/Files/1712146797_660d496d9fdf3_Dialog.jpg', 'Software Engineer', 'Information Technology', 'On-Site', 'Full Time', 'Sri lanka', 275000, 'LKR', 'Union Place', 'Design develop and deploy software development technologies and infrastructure,Assist in eliminating duplication leveraging product and technology reuse and increasing efficiency, Apply SDLC principles best practices and methodologies', 'Bachelors Masters degree in Computer Science, or IT or equivalent experience, knowledge of Shell scripting languages like Bash Perl Python etc,Fluency in English for effective communication', '2024-04-03', '2024-04-04', 'Active'),
(27, 4, 'Dailog', '/xampp/htdocs/STAPH/Job-Provider/Profile/Files/1712146797_660d496d9fdf3_Dialog.jpg', 'Site Supervisor', 'Engineering', 'On-Site', 'Full Time', 'Sri lanka', 75000, 'LKR', 'Matara', 'Supervise construction activities on site to ensure adherence to project plans and specifications, Coordinate with subcontractors suppliers, Conduct quality inspections, Monitor compliance  and safety restrictions', 'Degree in Engineering, 4 years experience in building projects and finishing works, Excellent communication and leadership skills', '2024-04-03', '2024-04-05', 'Active'),
(28, 4, 'Dailog', '/xampp/htdocs/STAPH/Job-Provider/Profile/Files/1712146797_660d496d9fdf3_Dialog.jpg', 'Devops Site Reliability Engineer', 'Information Technology', 'On-Site', 'Full Time', 'Sri lanka', 25000, 'LKR', 'Colombo', 'Support production systems and help triage issues, Be part of the team on our on call rotation to respond to availability incidents and provide service engineers with incidents', '2  years of experience working in a DevOps or SRE roles, 2  years building CI CD pipelines, Strong communication and documentation skills', '2024-04-03', '2024-04-05', 'Active'),
(29, 4, 'Dailog', '/xampp/htdocs/STAPH/Job-Provider/Profile/Files/1712146797_660d496d9fdf3_Dialog.jpg', 'Test Automation Engineer', 'Information Technology', 'On-Site', 'Full Time', 'Sri lanka', 74500, 'LKR', 'Kandy', 'Bachelors Masters degree in Computer Science, Python programming and or test automation, Familiar with integrating sub components into one software stack', 'Build high tech Software, Architect Design and deploy, Collaborate with other stakeholders ', '2024-04-03', '2024-04-27', 'Active'),
(30, 4, 'Dailog', '/xampp/htdocs/STAPH/Job-Provider/Profile/Files/1712146797_660d496d9fdf3_Dialog.jpg', 'Associate Lead Business Analyst', 'Information Technology', 'On-Site', 'Full Time', 'Sri lanka', 78000, 'LKR', 'Colombo', 'Lead the product management lifecycle, from ideation to execution, ensuring alignment with company objectives and market demands.\r\n', 'Bachelors degree in Business Administration, Computer Science, or a related field MBA or relevant certifications are a plus.', '2024-04-03', '2024-04-25', 'Active'),
(31, 4, 'Dailog', '/xampp/htdocs/STAPH/Job-Provider/Profile/Files/1712146797_660d496d9fdf3_Dialog.jpg', 'Robotics Engineers', 'Marketing', 'On-Site', 'Full Time', 'Sri lanka', 5000, 'LKR', 'Kandy', 'Develop robotic systems from concept to implementation, considering mechanical, electrical, and software aspects, Develop control algorithms and software for robotic systems,', 'Proven experience in designing and implementing robotic systems and projects, Familiarity with simulation tools and robotic modeling', '2024-04-03', '2024-04-26', 'Active'),
(32, 5, 'HCL', '/xampp/htdocs/STAPH/Job-Provider/Profile/Files/1712159815_660d7c47d5900_HCL.jpg', 'Brand Communication Manager', 'Marketing', 'On-Site', 'Full Time', 'Sri lanka', 74599, 'LKR', 'Kandy', 'Strong creative bent of mind, with ability to generate ideas to drive brand awareness and visibility and a strong hold on English communication skills to ensure we are able to get the best communication out,  Deep understanding and knowledge of digital and mobile marketing ecosystem', 'Continuously ideas and innovate within the social space, Drive and ensure building engagement for the clients on social media platforms such as Facebook, YouTube, Instagram, LinkedIn, Quora, etc. Foster and strengthen new relationships with key influencers within the community', '2024-04-03', '2024-04-26', 'Active'),
(33, 5, 'HCL', '/xampp/htdocs/STAPH/Job-Provider/Profile/Files/1712159815_660d7c47d5900_HCL.jpg', 'Chief Sustainability Officer', 'Finance', 'On-Site', 'Full Time', 'Sri lanka', 75000, 'LKR', 'Colombo', 'Provide the domain expertise for the above services, Engage with clients, build lasting relationships, and identify new business opportunities,Oversee client projects,', 'Certificate  Degree in ESG Sustainability, Experience of minimum 5 years in implementing above services.', '2024-04-03', '2024-04-27', 'Active'),
(34, 5, 'HCL', '/xampp/htdocs/STAPH/Job-Provider/Profile/Files/1712159815_660d7c47d5900_HCL.jpg', 'Technical Lead  Full Stack', 'Information Technology', 'On-Site', 'Full Time', 'Sri lanka', 85000, 'LKR', 'Colombo', 'Delegating tasks and achieving daily, weekly, and monthly goals, Determining project requirements and developing work schedules for the team, Developing software solutions by studying information needs, conferring with users, and studying systems flow, data usage, and work processes.', 'Bachelor s degree in computer programming, computer science, or a related field, Excellent verbal and written communication skills and the ability to work across multiple departments associated with the development process, Excellent technical, diagnostic, and troubleshooting skills,', '2024-04-03', '2024-04-27', 'Active'),
(35, 5, 'HCL', '/xampp/htdocs/STAPH/Job-Provider/Profile/Files/1712159815_660d7c47d5900_HCL.jpg', 'Application Support', 'Design', 'On-Site', 'Full Time', 'Sri lanka', 5000, 'LKR', 'Colombo', 'Bachelors degree in Computer Science, Information Technology, or related field ,Minimum years of experience in IT support roles,Excellent communication skills, both verbal and written.', 'You want to solve exciting technical and human problems, You love the opportunity to work with new tools and technologies,You want to pick up skills that arent directly connected to your job, Youre a team player who enjoys working in a collaborative environment,', '2024-04-03', '2024-04-27', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `company_profile_completion`
--

CREATE TABLE `company_profile_completion` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `profile_completed` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_profile_completion`
--

INSERT INTO `company_profile_completion` (`id`, `company_id`, `profile_completed`) VALUES
(3, 4, 1),
(4, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `event_calender`
--

CREATE TABLE `event_calender` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `candidate_name` varchar(75) NOT NULL,
  `candidate_email` varchar(100) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event_calender`
--

INSERT INTO `event_calender` (`id`, `job_id`, `company_id`, `user_id`, `candidate_name`, `candidate_email`, `start_time`, `end_time`, `location`) VALUES
(9, 26, 4, 25, 'Husni', 'husniwfayo@gmail.com', '2024-04-04 21:55:00', '2024-04-04 22:55:00', 'Head Office'),
(10, 27, 4, 25, 'Husni', 'husniwfayo@gmail.com', '2024-04-07 09:59:00', '2024-04-08 09:59:00', 'Head Office');

-- --------------------------------------------------------

--
-- Table structure for table `job_applications`
--

CREATE TABLE `job_applications` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `applicant_resume` varchar(255) NOT NULL,
  `application_status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_applications`
--

INSERT INTO `job_applications` (`id`, `job_id`, `company_id`, `user_id`, `applicant_resume`, `application_status`) VALUES
(37, 26, 4, 25, '/xampp/htdocs/STAPH/Job-Seeker/Profile/Resume/1712138082_660d276294342_sample.pdf', 'Accepted'),
(38, 26, 4, 26, '/xampp/htdocs/STAPH/Job-Seeker/Profile/Resume/1712139221_660d2bd510cbf_dummy.pdf', 'Accepted'),
(39, 33, 5, 25, '/xampp/htdocs/STAPH/Job-Seeker/Profile/Resume/1712138082_660d276294342_sample.pdf', 'Pending'),
(40, 27, 4, 25, '/xampp/htdocs/STAPH/Job-Seeker/Profile/Resume/1712138082_660d276294342_sample.pdf', 'Accepted');

-- --------------------------------------------------------

--
-- Table structure for table `profile_completion`
--

CREATE TABLE `profile_completion` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `profile_completed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profile_completion`
--

INSERT INTO `profile_completion` (`id`, `user_id`, `profile_completed`) VALUES
(13, 25, 1),
(14, 26, 1);

-- --------------------------------------------------------

--
-- Table structure for table `reschedule`
--

CREATE TABLE `reschedule` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `request` varchar(100) NOT NULL,
  `response` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reschedule`
--

INSERT INTO `reschedule` (`id`, `job_id`, `user_id`, `company_id`, `request`, `response`) VALUES
(8, 26, 25, 4, 'Requested', 'Pending');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `candidates`
--
ALTER TABLE `candidates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone_number` (`phone_number`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `candidates_about_me`
--
ALTER TABLE `candidates_about_me`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `candidates_expectation`
--
ALTER TABLE `candidates_expectation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `candidates_skills`
--
ALTER TABLE `candidates_skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `company_name` (`company_name`),
  ADD UNIQUE KEY `company_phone_number` (`company_phone_number`),
  ADD UNIQUE KEY `company_email` (`company_email`);

--
-- Indexes for table `company_about_me`
--
ALTER TABLE `company_about_me`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `company_job_posts`
--
ALTER TABLE `company_job_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `company_profile_completion`
--
ALTER TABLE `company_profile_completion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `event_calender`
--
ALTER TABLE `event_calender`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_calender_ibfk_1` (`job_id`),
  ADD KEY `event_calender_ibfk_2` (`company_id`),
  ADD KEY `event_calender_ibfk_3` (`user_id`);

--
-- Indexes for table `job_applications`
--
ALTER TABLE `job_applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_id` (`job_id`),
  ADD KEY `comany_id` (`company_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `profile_completion`
--
ALTER TABLE `profile_completion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `reschedule`
--
ALTER TABLE `reschedule`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `candidates`
--
ALTER TABLE `candidates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `candidates_about_me`
--
ALTER TABLE `candidates_about_me`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `candidates_expectation`
--
ALTER TABLE `candidates_expectation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `candidates_skills`
--
ALTER TABLE `candidates_skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `company_about_me`
--
ALTER TABLE `company_about_me`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `company_job_posts`
--
ALTER TABLE `company_job_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `company_profile_completion`
--
ALTER TABLE `company_profile_completion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `event_calender`
--
ALTER TABLE `event_calender`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `job_applications`
--
ALTER TABLE `job_applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `profile_completion`
--
ALTER TABLE `profile_completion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `reschedule`
--
ALTER TABLE `reschedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `company_about_me`
--
ALTER TABLE `company_about_me`
  ADD CONSTRAINT `company_about_me_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`);

--
-- Constraints for table `company_job_posts`
--
ALTER TABLE `company_job_posts`
  ADD CONSTRAINT `company_job_posts_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `company_profile_completion`
--
ALTER TABLE `company_profile_completion`
  ADD CONSTRAINT `company_profile_completion_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`);

--
-- Constraints for table `event_calender`
--
ALTER TABLE `event_calender`
  ADD CONSTRAINT `event_calender_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `company_job_posts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `event_calender_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `event_calender_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `candidates` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `job_applications`
--
ALTER TABLE `job_applications`
  ADD CONSTRAINT `job_applications_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `company_job_posts` (`id`),
  ADD CONSTRAINT `job_applications_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  ADD CONSTRAINT `job_applications_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `candidates` (`id`);

--
-- Constraints for table `profile_completion`
--
ALTER TABLE `profile_completion`
  ADD CONSTRAINT `profile_completion_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `candidates` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
