require.config({
    // RequireJS 通过一个相对的路径 baseUrl来加载所有代码。baseUrl通常被设置成data-main属性指定脚本的同级目录。
    baseUrl: "scripts/libs",
    // 第三方脚本模块的别名,jquery比libs/jquery-1.11.1.min.js简洁明了；
    paths: {
        jquery: "jquery/jquery.min",
        slimscroll: "jquery/jquery.slimscroll.min",
        switchery: "switchery/switchery",
        fastclick: "fastclick/fastclick",
        jqueryPlugins: "jquery/jquery-plugins",
        bootstrap: "bootstrap/bootstrap.min",
        bootstrapTable: "bootstrap/bootstrap-table.min",
        bootstrapTableCn: "bootstrap/bootstrap-table-zh-CN.min",
        jedate: "jedate/jedate.min",
        treeview: "treeview/bootstrap-treeview.min",
        tagsinput: "tagsinput/bootstrap-tagsinput.min",
        searchinput: "searchinput/searchinput",
        typeahead: "typeahead/typeahead.bundle.min",
        rangeSlider:"ionRangeSlider/ion.rangeSlider.min",
        util: "../common/util",
        menu: "../modules/menu/main",
        index: "../modules/index/index",
        test: "../modules/test",
        taskList: "../modules/taskManager/taskList",
        taskManager: "../modules/taskManager/taskManager",
        taskApprove: "../modules/taskManager/taskApprove",
        taskDetail: "../modules/taskManager/taskDetail",
        userInfo: "../modules/userManage/userInfo",
        userEdit: "../modules/userManage/userEdit",
        userAdd: "../modules/userManage/userAdd",
        roleInfo: "../modules/roleManage/roleInfo",
        roleAdd: "../modules/roleManage/roleAdd",
        roleEdit: "../modules/roleManage/roleEdit",
        resourceInfo: "../modules/resourceManage/resourceInfo",
        resourceEdit: "../modules/resourceManage/resourceEdit",
        resourceAdd: "../modules/resourceManage/resourceAdd"
    },
    //依赖模块配置
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
        slimscroll: {
            deps: ["jquery"]
        },
        jedate: {
            deps: ["jquery"]
        },
        menu: {
            deps: ["slimscroll"]
        },
        index: {
            deps: ["jquery","jqueryPlugins"]
        },
        accountConf: {
            deps: ["switchery"]
        },
        switchery: {
            deps: ["bootstrap", "fastclick"]
        }, bootstrapTable: {
            deps: ["bootstrap"]
        }, bootstrapTableCn: {
            deps: ["bootstrapTable"]
        }, jqueryPlugins: {
            deps: ["jquery"]
        }, treeview: {
            deps: ["bootstrap", "jquery"]
        }, tagsinput: {
            deps: ["jquery", "bootstrap", "typeahead"]
        }, typeahead: {
            deps: ["jquery", "bootstrap"]
        }, searchinput: {
            deps: ["jquery"]
        },rangeSlider:{
            deps: ["jquery"]
        }
    },
    config: {
        menu: menu_config
    }
});
// 加载主模块
require(
    [
        'util',
        'menu',
        'jqueryPlugins',
        'bootstrap',
        'bootstrapTable',
        'bootstrapTableCn',
        'jedate',
        'treeview',
        'test',
        'bootstrapTable',
        'switchery',
        'fastclick',
        'index',
        //检索控件
        'searchinput',
        //数值拖动控件
        'rangeSlider',
        //任务管理
        'taskList',
        'taskManager',
        'taskApprove',
        'taskDetail',

        // 用户管理
        'userInfo',
        'userEdit',
        'userAdd',

        // 角色管理
        'roleInfo',
        'roleAdd',
        'roleEdit',

        // 资源管理
        'resourceInfo',
        'resourceEdit',
        'resourceAdd'
    ]
);