	
create  table cassify(

			id int(11) primary key auto_increment comment 'id',
			c_type TINYINT not null comment '分类类型 1 干垃圾,2 湿垃圾,3 可回收,4 有害垃圾',
			c_name varchar(64) not null  comment '分类名',
			c_explain varchar(1024) not null comment '分类说明',
			c_explainTit varchar(64) not null comment '分类说明标题',			
			c_include	varchar(1024) not null comment '分类内容简介',
			c_includeTit	varchar(64) not null comment '分类内容简介标题',
			c_demand	varchar(1024) not null comment '投递要求',
			c_demandTit	varchar(64) not null comment '投递要求标题'


)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;  

						
						
create  table rubbish(
			id int(11) primary key auto_increment comment 'id',
			r_name varchar(64) not null  comment '垃圾名',
			cId int(11) not null DEFAULT 0 comment '分类id',
			c_demand	varchar(1024) not null comment '投递要求'			
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;  