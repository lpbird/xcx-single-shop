/*
 Navicat Premium Data Transfer

 Source Server         : 阿里云
 Source Server Type    : MySQL
 Source Server Version : 50719
 Source Host           : 47.94.171.39
 Source Database       : rest

 Target Server Type    : MySQL
 Target Server Version : 50719
 File Encoding         : utf-8

 Date: 06/21/2018 16:15:49 PM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `admin`
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `last_login_time` datetime DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `admin`
-- ----------------------------
BEGIN;
INSERT INTO `admin` VALUES ('1', '1号管理员', 'ncsf123456', '2018-05-08 14:59:52', '0'), ('2', 'admin', 'admin', '2018-06-09 12:27:13', '1');
COMMIT;

-- ----------------------------
--  Table structure for `appoint`
-- ----------------------------
DROP TABLE IF EXISTS `appoint`;
CREATE TABLE `appoint` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  `appointTime` time DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `appoint`
-- ----------------------------
BEGIN;
INSERT INTO `appoint` VALUES ('6', '张三', '13921831839', '4', '15:01:00', '陆鹏');
COMMIT;

-- ----------------------------
--  Table structure for `foods`
-- ----------------------------
DROP TABLE IF EXISTS `foods`;
CREATE TABLE `foods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(10) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `num` int(11) DEFAULT '0',
  `enName` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `tem` varchar(1000) DEFAULT NULL,
  `size` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `foods`
-- ----------------------------
BEGIN;
INSERT INTO `foods` VALUES ('1', '1', '白露粉莓', '18', '1', '0', 'DEW BERRY POWDER', '1', null, null, null), ('2', '1', '荔多多', '20', '2', '0', 'A LOT OF LITCHI', '1', null, null, null), ('3', '1', '泰萌', '22', '3', '0', 'THAILAND ADORABLE', '1', null, null, null), ('4', '2', '多莓奶冰', '16', '1', '0', 'MIXED CRANBERRY SMOOTHIE', '1', null, null, null), ('5', '2', '泰冰冰', '17', '2', '0', 'THAILAND SMOOTHIES', '1', null, null, null), ('6', '2', '泰妃', '20', '3', '0', 'TOFFEE', '1', null, null, null), ('7', '3', '大皇宫7号', '25', '1', '0', 'IMPERIAL PALACE NO.7', '1', null, null, null), ('8', '3', '蛋糕抹茶', '26', '2', '0', 'MATCHA CAKE', '1', null, null, null), ('9', '3', '泰多多', '20', '3', '0', 'THAILAND MORE', '1', null, null, null), ('10', '3', '泰红', '22', '4', '0', 'THAILAND BLACK TEA', '1', null, null, null), ('11', '3', '泰绿', '23', '5', '0', 'THAILAND GREEN', '1', null, null, null), ('12', '4', '榴莲咖啡', '18', '1', '0', 'DURIAN COFFEE', '1', null, null, null), ('13', '4', '象山拿铁', '19', '2', '0', 'ELEPHANT MOUNTAIN LATTE', '1', null, null, null), ('14', '5', '冬阴功', '30', '1', '0', 'TOM YUN GOONG', '1', null, null, null), ('15', '5', '绿松石可可', '16', '2', '0', 'TURQUOISE COCOA', '1', null, null, null), ('16', '5', '泰榴莲', '20', '3', '0', 'THAILAND DURIAN', '1', null, null, null), ('17', '5', '泰芒', '24', '4', '0', 'THAILAND MANGO', '1', null, null, null), ('18', '6', '粉色抹茶', '18', '1', '0', 'PINK MATCHA', '1', null, null, null), ('19', '6', '木炭奈铁', '17', '2', '0', 'CHARCOAL LATTE', '1', null, null, null), ('20', '6', '宇治奈铁', '20', '3', '0', 'MATCHA LATTE', '1', null, null, null), ('21', '6', '芋香草莓', '21', '4', '0', 'PEARL COLOCASIA', '1', null, null, null), ('22', '6', '脏脏抹茶', '22', '5', '0', 'VOGUE EATCHA', '1', null, null, null), ('23', '7', '象丸黑糖', '15', '1', '0', 'PEARL BROWN SUGAR', '1', null, '[]', '[]'), ('24', '7', '象丸可可', '15', '2', '0', 'PEARL COCOA', '1', '广告宣传语可以输入十四个字字', '[]', '[]'), ('25', '7', '象丸抹茶', '15', '3', '0', 'PEARL MATCHA', '1', null, '[{\"specs\":\"正常冰\",\"packing_fee\":0,\"price\":0},{\"specs\":\"少冰\",\"packing_fee\":0,\"price\":0}]', '[]'), ('26', '7', '象丸芋香', '15', '4', '0', 'PEARL COLOCASIA', '1', '象丸＋芋香', '[{\"specs\":\"正常冰\",\"packing_fee\":0,\"price\":0},{\"specs\":\"少冰\",\"packing_fee\":0,\"price\":0},{\"specs\":\"去冰\",\"packing_fee\":0,\"price\":0}]', '[{\"specs\":\"象丸\",\"packing_fee\":0,\"price\":2},{\"specs\":\"西米\",\"packing_fee\":0,\"price\":2}]'), ('27', '8', '薄脆', '3', '1', '0', 'undefined', '0', null, null, null), ('28', '8', '绿珍珠', '2', '2', '0', 'undefined', '0', null, null, null), ('29', '8', '黑糯米', '2', '3', '0', 'undefined', '0', null, null, null), ('30', '8', '绿珍珠', '2', '4', '0', 'undefined', '0', null, null, null), ('31', '8', '花生蛋糕酱', '3', '5', '0', 'undefined', '0', null, null, null), ('32', '8', '西米', '2', '6', '0', 'undefined', '0', null, null, null), ('33', '8', '桃胶', '2', '7', '0', 'undefined', '0', null, null, null), ('34', '8', '黑钻', '2', '8', '0', 'undefined', '0', null, null, null);
COMMIT;

-- ----------------------------
--  Table structure for `menu`
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `menu`
-- ----------------------------
BEGIN;
INSERT INTO `menu` VALUES ('1', '泰潮系列'), ('2', '泰高冷系列'), ('3', '泰好喝系列'), ('4', '泰咖系列'), ('5', '泰特别系列'), ('6', '泰炫彩系列'), ('7', '象丸系列');
COMMIT;

-- ----------------------------
--  Table structure for `mycut`
-- ----------------------------
DROP TABLE IF EXISTS `mycut`;
CREATE TABLE `mycut` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(40) DEFAULT NULL,
  `reduction` int(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `getTime` datetime DEFAULT NULL,
  `useTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `mycut`
-- ----------------------------
BEGIN;
INSERT INTO `mycut` VALUES ('48', 'oOK6t4kx4dm0784rgnI0L5suJEzQ', '1', '0', '2018-06-13 23:40:40', null), ('49', 'oOK6t4kx4dm0784rgnI0L5suJEzQ', '2', '1', '2018-06-13 23:40:41', '2018-06-13 23:41:28'), ('50', 'oOK6t4lwfVgXwhqfRl1_3nXJI7X8', '2', '1', '2018-06-14 09:23:44', '2018-06-14 10:10:11'), ('51', 'oOK6t4lwfVgXwhqfRl1_3nXJI7X8', '1', '1', '2018-06-14 09:23:47', '2018-06-14 10:06:12'), ('52', 'oOK6t4lwfVgXwhqfRl1_3nXJI7X8', '14', '0', '2018-06-14 09:37:32', null), ('53', 'oOK6t4lwfVgXwhqfRl1_3nXJI7X8', '15', '1', '2018-06-14 09:58:24', '2018-06-14 09:59:02');
COMMIT;

-- ----------------------------
--  Table structure for `order`
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(255) DEFAULT NULL,
  `sumMoney` int(11) DEFAULT NULL,
  `cupNumber` int(11) DEFAULT NULL,
  `cartList` varchar(2000) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `orderId` varchar(255) DEFAULT NULL,
  `cathNumber` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `appointTime` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `disTime` datetime DEFAULT NULL,
  `cutMonney` int(11) DEFAULT NULL,
  `packages` varchar(1000) DEFAULT NULL,
  `cutText` varchar(200) DEFAULT NULL,
  `note` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `order`
-- ----------------------------
BEGIN;
INSERT INTO `order` VALUES ('99', 'oOK6t4kx4dm0784rgnI0L5suJEzQ', '18', '1', '[{\"cType\":0,\"cIndex\":0,\"name\":\"白露粉莓\",\"price\":18,\"enName\":\"DEW BERRY POWDER\",\"detail\":\"常规,+正常糖+常规\",\"number\":1,\"sum\":18,\"img\":\"1-1\"}]', '2018-06-12 23:42:06', '20180612234159524', 'C001', '1', '', '2', null, '0', 'wx122341597396623a63a3e36e0533527612', null, null), ('100', 'oOK6t4lwfVgXwhqfRl1_3nXJI7X8', '1', '1', '[{\"cType\":6,\"cIndex\":3,\"name\":\"象丸芋香\",\"price\":1,\"enName\":\"PEARL COLOCASIA\",\"detail\":\"+正常糖+正常冰\",\"number\":1,\"sum\":1,\"img\":\"7-4\"}]', '2018-06-13 09:03:25', '20180613090316211', 'C001', '0', '', '2', null, '0', 'wx13090316375657916c46f3f43098486857', null, null), ('101', 'oOK6t4lwfVgXwhqfRl1_3nXJI7X8', '18', '1', '[{\"cType\":0,\"cIndex\":0,\"name\":\"白露粉莓\",\"price\":18,\"enName\":\"DEW BERRY POWDER\",\"detail\":\"+少糖+常规\",\"number\":1,\"sum\":18,\"img\":\"1-1\"}]', '2018-06-13 15:26:08', '20180613152559967', 'C002', '0', '', '2', null, '0', 'wx13152600159803eeef6c1e633484627001', null, null), ('102', 'oOK6t4kx4dm0784rgnI0L5suJEzQ', '17', '1', '[{\"cType\":0,\"cIndex\":1,\"name\":\"荔多多\",\"price\":20,\"enName\":\"A LOT OF LITCHI\",\"detail\":\"常规,+正常糖+常规\",\"number\":1,\"sum\":20,\"img\":\"1-2\"}]', '2018-06-13 22:22:08', '20180613222152052', 'C003', '0', '', '2', null, '3', 'wx13222152335983a0dcccf7d11286192135', '满20元立减3元', 'undefined'), ('107', 'oOK6t4lwfVgXwhqfRl1_3nXJI7X8', '12', '1', '[{\"cType\":6,\"cIndex\":1,\"name\":\"象丸可可\",\"price\":15,\"enName\":\"PEARL COCOA\",\"detail\":\"+正常糖+undefined\",\"number\":1,\"sum\":15,\"img\":\"7-2\"}]', '2018-06-14 09:28:49', '20180614092837870', 'C001', '0', '', '0', null, '3', 'wx140928380037728d362386213272592604', '单品优惠立减3元', 'undefined'), ('108', 'oOK6t4lwfVgXwhqfRl1_3nXJI7X8', '37', '2', '[{\"cType\":0,\"cIndex\":1,\"name\":\"荔多多\",\"price\":20,\"enName\":\"A LOT OF LITCHI\",\"detail\":\"+正常糖+常规\",\"number\":1,\"sum\":20,\"img\":\"1-2\"},{\"cType\":0,\"cIndex\":2,\"name\":\"泰萌\",\"price\":22,\"enName\":\"THAILAND ADORABLE\",\"detail\":\"+正常糖+常规\",\"number\":1,\"sum\":22,\"img\":\"1-3\"}]', '2018-06-14 09:38:23', '20180614093815676', 'C002', '0', '', '0', null, '5', 'wx14093815872929748b4110d40700673305', '满30元立减5元', 'undefined'), ('109', 'oOK6t4lwfVgXwhqfRl1_3nXJI7X8', '19', '1', '[{\"cType\":5,\"cIndex\":3,\"name\":\"芋香草莓\",\"price\":21,\"enName\":\"PEARL COLOCASIA\",\"detail\":\"+正常糖+常规\",\"number\":1,\"sum\":21,\"img\":\"6-4\"}]', '2018-06-14 09:59:02', '20180614095854916', 'C003', '0', '', '0', null, '2', 'wx1409585509981655ad6cda884074326907', '单品优惠立减2元', 'undefined'), ('110', 'oOK6t4lwfVgXwhqfRl1_3nXJI7X8', '19', '1', '[{\"cType\":5,\"cIndex\":4,\"name\":\"脏脏抹茶\",\"price\":22,\"enName\":\"VOGUE EATCHA\",\"detail\":\"+正常糖+常规\",\"number\":1,\"sum\":22,\"img\":\"6-5\"}]', '2018-06-14 10:06:11', '20180614100601666', 'C004', '0', '', '0', null, '3', 'wx14100601859340e3443ee6bb3709855051', '满20元立减3元', 'undefined'), ('111', 'oOK6t4lwfVgXwhqfRl1_3nXJI7X8', '12', '1', '[{\"cType\":6,\"cIndex\":1,\"name\":\"象丸可可\",\"price\":15,\"enName\":\"PEARL COCOA\",\"detail\":\"+正常糖+undefined\",\"number\":1,\"sum\":15,\"img\":\"7-2\"}]', '2018-06-14 10:10:10', '20180614101000687', 'C005', '0', '', '0', null, '3', 'wx14101000855634a254b2546a1353084368', '单品优惠立减3元', 'undefined'), ('112', 'oOK6t4kx4dm0784rgnI0L5suJEzQ', '18', '1', '[{\"cType\":0,\"cIndex\":0,\"name\":\"白露粉莓\",\"price\":18,\"enName\":\"DEW BERRY POWDER\",\"detail\":\"+正常糖+常规\",\"number\":1,\"sum\":18,\"img\":\"1-1\",\"desc\":null}]', '2018-06-15 18:35:47', '20180615183533360', 'C001', '0', '', '0', null, '0', 'wx1518353358834703950105180362792988', '', 'undefined'), ('113', 'oOK6t4lwfVgXwhqfRl1_3nXJI7X8', '15', '1', '[{\"cType\":6,\"cIndex\":1,\"name\":\"象丸可可\",\"price\":15,\"enName\":\"PEARL COCOA\",\"detail\":\"+正常糖+undefined\",\"number\":1,\"sum\":15,\"img\":\"7-2\",\"desc\":\"广告宣传语可以输入十四个字字\"}]', '2018-06-21 10:32:49', '20180621103242165', 'C001', '0', '', '0', null, '0', 'wx2110324237803223560736dd2725534003', '', 'undefined'), ('114', 'oOK6t4lwfVgXwhqfRl1_3nXJI7X8', '15', '1', '[{\"cType\":6,\"cIndex\":3,\"name\":\"象丸芋香\",\"price\":15,\"enName\":\"PEARL COLOCASIA\",\"detail\":\"+正常糖+正常冰\",\"number\":1,\"sum\":15,\"img\":\"7-4\",\"desc\":\"象丸＋芋香\"}]', '2018-06-21 10:34:20', '20180621103412141', 'C002', '0', '', '0', null, '0', 'wx2110341233037876bd9fc62d2099005284', '', 'undefined'), ('115', 'oOK6t4ir6VDJzt2cELkNZAbpZmS8', '15', '1', '[{\"cType\":6,\"cIndex\":1,\"name\":\"象丸可可\",\"price\":15,\"enName\":\"PEARL COCOA\",\"detail\":\"+正常糖+undefined\",\"number\":1,\"sum\":15,\"img\":\"7-2\",\"desc\":\"广告宣传语可以输入十四个字字\"}]', '2018-06-21 15:50:09', '20180621154959942', 'C003', '0', '', '0', null, '0', 'wx2115500015882487ca1f00c70388992820', '', 'undefined');
COMMIT;

-- ----------------------------
--  Table structure for `reduction`
-- ----------------------------
DROP TABLE IF EXISTS `reduction`;
CREATE TABLE `reduction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `typeDes` varchar(255) DEFAULT NULL,
  `rule` int(11) DEFAULT NULL,
  `cut` int(11) DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `reduction`
-- ----------------------------
BEGIN;
INSERT INTO `reduction` VALUES ('1', '1', '全场满减券', '20', '3', '2018-05-21 00:00:00', '2018-06-21 00:00:00', '0', 'http://cdn.handsomebird.xin/1526893482285'), ('2', '2', '象丸可可单品券', '24', '3', '2018-05-21 00:00:00', '2018-06-18 00:00:00', '0', 'http://cdn.handsomebird.xin/1526893482285'), ('14', '1', '满30减5块', '30', '5', '2018-06-14 00:00:00', '2018-07-11 00:00:00', '0', ''), ('15', '2', '密码', '21', '2', '2018-06-14 00:00:00', '2018-07-08 00:00:00', '0', ''), ('16', '2', '科技', '22', '5', '2018-06-14 00:00:00', '2018-07-01 00:00:00', '1', 'undefined'), ('17', '2', '测试', '23', '2', '2018-06-14 00:00:00', '2018-06-14 00:00:00', '0', ''), ('18', '2', '测试', '20', '3', '2018-06-21 00:00:00', '2018-06-22 00:00:00', '0', '');
COMMIT;

-- ----------------------------
--  Table structure for `shoptime`
-- ----------------------------
DROP TABLE IF EXISTS `shoptime`;
CREATE TABLE `shoptime` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `open` int(11) DEFAULT NULL,
  `close` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `shoptime`
-- ----------------------------
BEGIN;
INSERT INTO `shoptime` VALUES ('1', '9', '22');
COMMIT;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickName` varchar(255) DEFAULT NULL,
  `avatarUrl` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `root` int(11) DEFAULT NULL,
  `resum` int(11) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `gender` int(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `openId` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_loginTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('15', '陆鹏', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoUibXXf3ic3EcyVMg1KxI8A3Gia3pRyWr3PN5uVhak3IaqKXgH9vIN8tgXkrvlha4DCunCSpJcRibvg/132', null, '0', '0', '770', 'Shanghai', '1', '未知', 'oOK6t4kx4dm0784rgnI0L5suJEzQ', '2018-05-05 20:58:59', '2018-06-21 15:33:33', '18818219934'), ('16', '婷婷', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLmvTG4fkr6j9qRgsrqk7m2Mx3tzIhYtgQ42P7Z0msc3CaWKkqQkpwO6CyewFxY7g15FFXfj5Joicg/132', null, '0', '0', '0', 'Liaoning', '2', 'Fushun', 'oOK6t4m46xGA41iuR9FJ5lE525o0', '2018-05-06 22:25:07', '2018-06-04 17:26:37', null), ('17', 'M', 'https://wx.qlogo.cn/mmopen/vi_32/ajNVdqHZLLDe3dmfpqQK4mOyZZDcJ7aCu6FEgkkx3XFib67Jn07kiaoURz7ZajnP23UpxBVKF4Ww1FEjVcu6UGwQ/132', null, '0', '0', '30', 'Liaoning', '1', 'Fushun', 'oOK6t4k0BsYbTizss5HXleTZUqmg', '2018-05-09 20:43:11', '2018-06-14 07:33:48', '13904134888');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
