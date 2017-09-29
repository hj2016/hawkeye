//菜单配置
var menu_config = {
	menu : [ {
		"mode" : "",
		"name" : "首页",
		"href" : "page/index/index_v1.html",
		"icon" : "fa-home"
	},  {
		"mode" : "",
		"name" : "任务管理",
		"href" : "#",
		"icon" : "fa fa-edit",
        "sub" : [{
            "mode": "taskManager",
            "name": "新建任务",
            "href": "page/taskManager/taskManager.html",
            "icon": ""
        },{ "mode": "taskList",
            "name": "查看任务",
            "href": "page/taskManager/taskList.html",
            "icon": ""
		}, { "mode": "",
            "name": "任务审批",
            "href": "page/taskManager/taskApprove.html",
            "icon": ""},
		]
	}, {
		"mode" : "",
		"name" : "系统配置",
		"href" : "#",
		"icon" : "fa-cog",
		"sub" : [ {
			"mode" : "accountManage",
			"name" : "账户管理",
			"href" : "page/accountManage/accountInfo.html",
			"icon" : ""
		}, {
			"mode" : "interfaceManage",
			"name" : "接口管理",
			"href" : "page/interfaceManage/interfaceInfo.html",
			"icon" : ""
		}, {
			"mode" : "quotaManage",
			"name" : "指标管理",
			"href" : "page/quotaManage/quotaInfo.html",
			"icon" : ""
		}, {
			"mode" : "tableManage",
			"name" : "数据切表",
			"href" : "page/tableManage/tableInfo.html",
			"icon" : ""
		} ]
	}, {
		"mode" : "",
		"name" : "权限管理",
		"href" : "#",
		"icon" : "fa-unlock-alt",
		"sub" : [ {
			"mode" : "userInfo",
			"name" : "用户管理",
			"href" : "page/userManage/userInfo.html",
			"icon" : ""
		}, {
			"mode" : "roleInfo",
			"name" : "角色管理",
			"href" : "page/roleManage/roleInfo.html",
			"icon" : ""
		}, {
			"mode" : "resourceInfo",
			"name" : "资源管理",
			"href" : "page/resourceManage/resourceInfo.html",
			"icon" : ""
		} ]
	}, {
		"mode" : "",
		"name" : "工具",
		"href" : "#",
		"icon" : "fa-cutlery",
		"sub" : [ {
			"mode" : "intfaceReq",
			"name" : "接口请求",
			"href" : "page/intfaceReq/intfaceReq.html",
			"icon" : ""
		} ]
	} ]
};