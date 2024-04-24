/*
 Navicat Premium Data Transfer

 Source Server         : 123
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : score

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 24/04/2024 12:08:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_id` int(11) DEFAULT NULL,
  `teacher_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `class_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES (15, NULL, NULL, '计算机1班');
INSERT INTO `class` VALUES (16, NULL, NULL, '计算机3班');
INSERT INTO `class` VALUES (13, NULL, NULL, '计算机2班');

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) DEFAULT NULL,
  `reciever_id` int(11) DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `message_state` int(11) UNSIGNED ZEROFILL DEFAULT 00000000000,
  `reciever_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES (1, 13, 13, 'hello,world', 00000000000, '陆老师');
INSERT INTO `message` VALUES (5, 13, 14, '加快教学', 00000000000, '陆老师');
INSERT INTO `message` VALUES (10, 14, 18, '成绩提示', 00000000000, '小李');

-- ----------------------------
-- Table structure for plan
-- ----------------------------
DROP TABLE IF EXISTS `plan`;
CREATE TABLE `plan`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plan_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `plan_introduce` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `plan_state` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '0',
  `student_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of plan
-- ----------------------------
INSERT INTO `plan` VALUES (1, '计划1', '错题', '0', '小李');
INSERT INTO `plan` VALUES (2, NULL, NULL, '0', NULL);
INSERT INTO `plan` VALUES (3, NULL, NULL, '0', NULL);
INSERT INTO `plan` VALUES (4, '计划2', '错题', '1', '小李');
INSERT INTO `plan` VALUES (5, '123', '123', '0', NULL);
INSERT INTO `plan` VALUES (6, '123', '123', '0', NULL);

-- ----------------------------
-- Table structure for question
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `question_introduce` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `question_state` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '0',
  `student_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of question
-- ----------------------------
INSERT INTO `question` VALUES (1, '题目1', '计算错误', '1', '小李');
INSERT INTO `question` VALUES (2, '题目2', '计算错误', '0', '小李');

-- ----------------------------
-- Table structure for record
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `score` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `subject` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `record_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `record_time` datetime(6) DEFAULT NULL,
  `student_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `student_class` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of record
-- ----------------------------
INSERT INTO `record` VALUES (3, 99, 18, 14, '计算机网络', '期中考试', NULL, '小李', '计算机1班');
INSERT INTO `record` VALUES (4, 99, 18, 14, '计算机系统', '期中考试1', NULL, '小李', '计算机1班');
INSERT INTO `record` VALUES (5, 99, 30, 14, '计算机网络', '期中考试2', NULL, '小王', '计算机1班');
INSERT INTO `record` VALUES (6, 50, 18, 14, '计算机系统', '期末考试', NULL, '小李', '计算机1班');
INSERT INTO `record` VALUES (7, 24, 18, 14, '计算机科学', '期末考试2', NULL, '小李', '计算机1班');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userAccount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `userPassword` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '',
  `userAvatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `userClass` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `introduce` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `integral` int(11) DEFAULT NULL,
  `friend` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `association` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `class` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` int(11) DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 32 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (13, 'admin', '$2b$10$IsppGiaXjLFuYDeq8Q2xseXa392znkfJG9mfa8p0jW/HaPi8Q07.6', '小陆', 'https://b0.bdstatic.com/a367e9334848fe281131e135610ccaa4.jpg@h_1280', '123', '实B202', '管理员', 99999, NULL, '123', '计算机学院', '', 2);
INSERT INTO `user` VALUES (14, 'admin1', '$2b$10$2u5G4IA5rjyMcFSg0uBmX.2oN.zHXaApOzpUD5RMokz8Hq.hZPa5K', '陆老师', NULL, '13701123412', NULL, NULL, NULL, NULL, 'w189688@163.com', '计算机学院', '计算机1班', 1);
INSERT INTO `user` VALUES (18, 'admin2', '$2b$10$mXP0lk7jJFOh9C2RkaEpuOnkO1owltijRuxHz8c6v7VCqzS8q73z6', '小李', NULL, '13701123412', NULL, 'hello,world', NULL, NULL, 'w189688@163.com', NULL, '计算机1班', 0);
INSERT INTO `user` VALUES (30, 'wangwei', '$2b$10$Sd6UPlkMS7N22PH9TNNx/uWLx520wMFeIajtVX7PT.WrnS.1x8JBu', '小王', NULL, '1888777666', NULL, NULL, NULL, NULL, 'comic@qq.com', NULL, '计算机1班', 0);
INSERT INTO `user` VALUES (31, 'admin3', '$2b$10$HMesh7T1q/yuBSoU1ElceO9GBREEl1hI7L8XqBiZUx3NbaJV7weEG', '小白', NULL, '1888777666', NULL, NULL, NULL, NULL, 'comic@qq.com', NULL, '计算机2班', 0);

SET FOREIGN_KEY_CHECKS = 1;
