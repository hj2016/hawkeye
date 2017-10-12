CREATE DATABASE IF NOT EXISTS hawkeye DEFAULT CHARACTER SET = UTF8 COLLATE utf8_general_ci;
use hawkeye;


DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `mode` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `parent_code` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `info` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `role_resource`
--

DROP TABLE IF EXISTS `role_resource`;
CREATE TABLE `role_resource` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `resource_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKAEE599BA8E8B2866` (`resource_id`),
  KEY `FKAEE599B7E9606486` (`role_id`),
  CONSTRAINT `FKAEE599B7E9606486` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `FKAEE599BA8E8B2866` FOREIGN KEY (`resource_id`) REFERENCES `resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` datetime DEFAULT NULL,
  `login_name` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `validate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login_name` (`login_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK143BF46AE9606486` (`role_id`),
  KEY `FK143BF46A8E8B2866` (`user_id`),
  CONSTRAINT `FK143BF46A8E8B2866` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK143BF46AE9606486` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键 前端页面任务ID',
  `account` varchar(255) DEFAULT NULL  COMMENT '账户名称',
  `task_name` varchar(255)  NOT NULL COMMENT '任务名称',
  `task_desc` varchar(255)  DEFAULT NULL COMMENT '任务描述',
  `task_type` varchar(255)  NOT NULL COMMENT '任务的类别',
  `state` int(11) DEFAULT NULL COMMENT '任务状态',
  `content` longtext COMMENT '执行的sql语句',
  `tem_rel_path` varchar(255) DEFAULT NULL COMMENT '中间结果路径',
  `pre_task_id` bigint(20) DEFAULT NULL COMMENT '前置任务id',
  `app_id` varchar(255) DEFAULT NULL COMMENT '后台计算引擎生成的application_id, 可以设置为后台任务的任务号',
  `date_period` int(11) DEFAULT NULL COMMENT '时间周期',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `start_time` datetime DEFAULT NULL COMMENT '任务真正调度时间',
  `end_time` datetime DEFAULT NULL COMMENT '任务跑取结束的时间',
  `dimension` varchar(255) DEFAULT NULL COMMENT '维度',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='任务表';


DROP TABLE IF EXISTS `data_result_info`;
CREATE TABLE `data_result_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) DEFAULT NULL,
  `task_id` bigint(20) DEFAULT NULL,
  `result_name` varchar(255) DEFAULT NULL,
  `result_content` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `tag_rule`;
CREATE TABLE `tag_rule` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `task_id` bigint(20) NOT NULL COMMENT '任务id',
  `include` varchar(255) DEFAULT NULL COMMENT '包含条件',
  `exclude` varchar(255) DEFAULT NULL COMMENT '排除条件',
  `datasource` varchar(255) DEFAULT NULL COMMENT '数据来源',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=295 DEFAULT CHARSET=utf8 COMMENT='标签规则';

-- ----------------------------
-- Table structure for `tag`
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(255) DEFAULT NULL COMMENT '标签名',
  `tag_type_id` varchar(255) DEFAULT NULL COMMENT '标签类型id',
  `tag_id` varchar(255) DEFAULT NULL COMMENT '标签id',
  `table_name` varchar(255) DEFAULT NULL COMMENT '表名称',
  `column_name` varchar(255) DEFAULT NULL COMMENT '列名称',
  `data_src` varchar(255) DEFAULT NULL COMMENT '数据来源, d001:会员主数据 d002:POS销售数据表 d003:门店主数据 d004:电商销售数据表 d005:O2O销售数据表',
  `value_type` varchar(255) DEFAULT NULL COMMENT '值类型, 0: 字符单值型, 1: 字符多值型',
  `choice_type` varchar(255) DEFAULT NULL COMMENT '圈选展现方式, 1：多选 , 2:输入框 , 3:日期控件选择, 4:输入方式检索选择',
  `val_kvs` longtext COMMENT '标签拥有的值',
  `update_time` datetime DEFAULT NULL COMMENT '标签更新时间',
  `create_time` datetime DEFAULT NULL COMMENT '标签创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COMMENT='标签表';


-- ----------------------------
-- Table structure for `tag_type`
-- ----------------------------
DROP TABLE IF EXISTS `tag_type`;
CREATE TABLE `tag_type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(255) DEFAULT NULL COMMENT '标签类别名称',
  `parent_id` varchar(255) DEFAULT NULL COMMENT '父类型',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='标签类别表';