define(function(require, exports, module) {
	// $=require("jquery");
	var menus=module.config().menu;
	var util = require("util");

	// 自定义弹出框
    window.alert = function (msg,callback) {
        var flag = false;
        $("#alert-msg").html(msg);
        $("#alert-div").modal('show');
        $("#btn-ensure").off("click");
        if(typeof(callback) != "undefined"){
            $("#btn-ensure").on("click",callback);
        }
    }
	
	// 根据权限初始化菜单
	$.postNoAsync("/user/initAuthority", {}, function(data) {
		menus=data.data;
	});

	// 主页面自适应
	var autoIndex= function () {
        var cssHeight = document.documentElement.clientHeight-93-30
        var autoCss = "<style type='text/css'>" +
			".skin-3 .wrapper-content {padding:0px;}" +
			".autopage {height:"+cssHeight+"px; overflow:auto}" +
			"</style>"
         $(document.head).append(autoCss)
	}
    autoIndex()
    $(window).resize(function () {
        var cssHeight = document.documentElement.clientHeight-93-30
		$(".autopage").css("height",cssHeight)
    })
	
	var pluginName = "metisMenu";
	defaults = {
			toggle: true,
			doubleTapToGo: false
		};
	function Plugin(element, options) {
		this.element = $(element);
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype = {
		init: function() {

			var $this = this.element,
				$toggle = this.settings.toggle,
				obj = this;

			if (this.isIE() <= 9) {
				$this.find("li.active").has("ul").children("ul").collapse("show");
				$this.find("li").not(".active").has("ul").children("ul").collapse("hide");
			} else {
				$this.find("li.active").has("ul").children("ul").addClass("collapse in");
				$this.find("li").not(".active").has("ul").children("ul").addClass("collapse");
			}

			// add the "doubleTapToGo" class to active items if needed
			if (obj.settings.doubleTapToGo) {
				$this.find("li.active").has("ul").children("a").addClass("doubleTapToGo");
			}

			$this.find("li").has("ul").children("a").on("click" + "." + pluginName, function(e) {
				e.preventDefault();

				// Do we need to enable the double tap
				if (obj.settings.doubleTapToGo) {

					// if we hit a second time on the link and the href is
					// valid, navigate to that url
					if (obj.doubleTapToGo($(this)) && $(this).attr("href") !== "#" && $(this).attr("href") !== "") {
						e.stopPropagation();
						document.location = $(this).attr("href");
						return;
					}
				}

				$(this).parent("li").toggleClass("active").children("ul").collapse("toggle");

				if ($toggle) {
					$(this).parent("li").siblings().removeClass("active").children("ul.in").collapse("hide");
				}

			});
		},

		isIE: function() { // https://gist.github.com/padolsey/527683
			var undef,
				v = 3,
				div = document.createElement("div"),
				all = div.getElementsByTagName("i");

			while (
				div.innerHTML = "<!--[if gt IE " + (++v) + "]><i></i><![endif]-->",
					all[0]
				) {
				return v > 4 ? v : undef;
			}
		},

		// Enable the link on the second click.
		doubleTapToGo: function(elem) {
			var $this = this.element;

			// if the class "doubleTapToGo" exists, remove it and return
			if (elem.hasClass("doubleTapToGo")) {
				elem.removeClass("doubleTapToGo");
				return true;
			}

			// does not exists, add a new class and return false
			if (elem.parent().children("ul").length) {
				// first remove all other class
				$this.find(".doubleTapToGo").removeClass("doubleTapToGo");
				// add the class on the current element
				elem.addClass("doubleTapToGo");
				return false;
			}
		},

		remove: function() {
			this.element.off("." + pluginName);
			this.element.removeData(pluginName);
		}

	};

	$.fn[pluginName] = function(options) {
		this.each(function () {
			var el = $(this);
			if (el.data(pluginName)) {
				el.data(pluginName).remove();
			}
			el.data(pluginName, new Plugin(this, options));
		});
		return this;
	};
	$.fn.metisMenu=function(options) {
		this.each(function () {
			var el = $(this);
			if (el.data(pluginName)) {
				el.data(pluginName).remove();
			}
			el.data(pluginName, new Plugin(this, options));
		});
		return this;
	}
	function NavToggle() {
		$(".navbar-minimalize").trigger("click")
	}
	function SmoothlyMenu() {
		$("body").hasClass("mini-navbar") ? $("body").hasClass("fixed-sidebar") ? ($("#side-menu").hide(), setTimeout(function() {
			$("#side-menu").fadeIn(500)
		},
		300)) : $("#side-menu").removeAttr("style") : ($("#side-menu").hide(), setTimeout(function() {
			$("#side-menu").fadeIn(500)
		},
		100))
	}
	function localStorageSupport() {
		return "localStorage" in window && null !== window.localStorage
	}
	function createTagli(){
		var li=""+
			"<li>"+
				"<a class='J_menuItem' href=''>"+
					"<i class='fa'></i>"+
					"<span class='nav-label'></span>"+
				"</a>"+
			"</li>";
		return $(li);
	}
	/*function loadhtml(id,page) {
		$.ajax({
			url : page,
			global : false,
			type : "POST",
			dataType : "html",
			async : false,
			success : function(data) {
				id.html(data);
				console.log("loadhtml");
			}
		})
	}*/


	function initMenu(){
		for(var i=0;i<menus.length;i++){
			var menu=menus[i];
			var li=createTagli();
			li.find("a").attr("href",menu.href).attr("mode",menu.mode);
			li.find("a i").addClass(menu.icon);
			li.find("a span").html(menu.name);
			if(typeof(menu.sub)!="undefined"&&menu.sub!=null){
				li.find("a").append("<span class='fa arrow'></span>");
				var ul=$("<ul class='nav'></ul>");
				for (var j = 0; j < menu.sub.length; j++) {
					var sub=menu.sub[j];
					var _li=createTagli();
					_li.find("a").attr("href",sub.href).attr("mode",sub.mode);
					// _li.find("a i").addClass(sub.icon);
					_li.find("a span").html(sub.name);
					ul.append(_li);
				};
				li.append(ul);
			}
			$("#side-menu").append(li);
		}
		
		$("#side-menu>li:not([class=nav-header]) a:not([href=#])").on("click",function(){
			var name=$(this).find(".nav-label").html();
			var href=$(this).attr("href");
			var mode=$(this).attr("mode");
			var id=href.replace("/","_");
			if(mode!=""){
				var objmode=require(mode);
			}
			$("#content-main>div").hide();
			if($("#content-main div[data-id='"+id+"']").length==0){
				var a=$(""+
				"<a href='javascript:;' class='J_menuTab' data-id='"+id+"'>"+
					name+ 
					"<i class='fa fa-times-circle'></i>"+
				"</a>");
				
				a.find("i").on("click",function(event){
					var _a=$(this).parent();
					var _id1=_a.attr("data-id");
					
					if(_a.attr("class").indexOf("active")!=-1){
						var _prev=$(".page-tabs-content .active").prev();
						var _id2=_prev.attr("data-id")
						_prev.addClass("active");
						$("#content-main>div[data-id='"+_id2+"']").fadeIn();
					}
					_a.remove();
					$("div[data-id='"+_id1+"']").remove();
					$(this).off("click");
					event.stopPropagation();
				});
				a.on("click",function(){
					$(".page-tabs-content .active").removeClass("active");
					var _a=$(this).addClass("active");
					var _id=_a.attr("data-id")
					$("#content-main>div").hide();
					$("#content-main>div[data-id='"+_id+"']").fadeIn();
				});
				
				$(".page-tabs-content .active").removeClass("active");
				$(".page-tabs-content").append(a.addClass("active"));
				
				
			}else{
				$(".page-tabs-content .active").removeClass("active");
				$(".page-tabs-content a[data-id='"+id+"']").addClass("active");
			}
			$("#content-main div[data-id='"+id+"']").remove();
			var div=$("<div data-id='"+id+"' class='J_iframe' width='100%'' height='100%'style='display: none;' ></div>");
			$("#content-main").append(div);
            util.loadhtml($("div[data-id='"+id+"']"),href);
			$("#content-main>div[data-id='"+id+"']").fadeIn();
			if(typeof(objmode)!="undefined"){
				console.log("objmode.init");
				objmode.init();
                autoIndex();
			}
			
			return false;
		});
	}
	
	$(function() {
//		require("index").init();
		console.log("initMenu");
		initMenu();
		$("span:contains('首页')").parent().click();
		function e() {
			var e = $("body > #wrapper").height() - 61;
			$(".sidebard-panel").css("min-height", e + "px")
		}
		$("#side-menu").metisMenu(),
		$(".right-sidebar-toggle").click(function() {
			$("#right-sidebar").toggleClass("sidebar-open")
		}),
		$(".sidebar-container").slimScroll({
			height: "100%",
			railOpacity: .4,
			wheelStep: 10
		}),
		$(".open-small-chat").click(function() {
			$(this).children().toggleClass("fa-comments").toggleClass("fa-remove"),
			$(".small-chat-box").toggleClass("active")
		}),
		$(".small-chat-box .content").slimScroll({
			height: "234px",
			railOpacity: .4
		}),
		$(".check-link").click(function() {
			var e = $(this).find("i"),
			a = $(this).next("span");
			return e.toggleClass("fa-check-square").toggleClass("fa-square-o"),
			a.toggleClass("todo-completed"),
			!1
		}),
		$(function() {
			$(".sidebar-collapse").slimScroll({
				height: "100%",
				railOpacity: .9,
				alwaysVisible: !1
			})
		}),
		$(".navbar-minimalize").click(function() {
			$("body").toggleClass("mini-navbar"),
			SmoothlyMenu()
		}),
		e(),
		$(window).bind("load resize click scroll",
		function() {
			$("body").hasClass("body-small") || e()
		}),
		$(window).scroll(function() {
			$(window).scrollTop() > 0 && !$("body").hasClass("fixed-nav") ? $("#right-sidebar").addClass("sidebar-top") : $("#right-sidebar").removeClass("sidebar-top")
		}),
		$(".full-height-scroll").slimScroll({
			height: "100%"
		}),
		$("#side-menu>li").click(function() {
			$("body").hasClass("mini-navbar") && NavToggle()
		}),
		$("#side-menu>li li a").click(function() {
			$(window).width() < 769 && NavToggle()
		}),
		$(".nav-close").click(NavToggle),
		/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) && $("#content-main").css("overflow-y", "auto")
	}),
	$(window).bind("load resize",
	function() {
		$(this).width() < 769 && ($("body").addClass("mini-navbar"), $(".navbar-static-side").fadeIn())
	}),
	$(function() {
		if ($("#fixednavbar").click(function() {
			$("#fixednavbar").is(":checked") ? ($(".navbar-static-top").removeClass("navbar-static-top").addClass("navbar-fixed-top"), $("body").removeClass("boxed-layout"), $("body").addClass("fixed-nav"), $("#boxedlayout").prop("checked", !1), localStorageSupport && localStorage.setItem("boxedlayout", "off"), localStorageSupport && localStorage.setItem("fixednavbar", "on")) : ($(".navbar-fixed-top").removeClass("navbar-fixed-top").addClass("navbar-static-top"), $("body").removeClass("fixed-nav"), localStorageSupport && localStorage.setItem("fixednavbar", "off"))
		}), $("#collapsemenu").click(function() {
			$("#collapsemenu").is(":checked") ? ($("body").addClass("mini-navbar"), SmoothlyMenu(), localStorageSupport && localStorage.setItem("collapse_menu", "on")) : ($("body").removeClass("mini-navbar"), SmoothlyMenu(), localStorageSupport && localStorage.setItem("collapse_menu", "off"))
		}), $("#boxedlayout").click(function() {
			$("#boxedlayout").is(":checked") ? ($("body").addClass("boxed-layout"), $("#fixednavbar").prop("checked", !1), $(".navbar-fixed-top").removeClass("navbar-fixed-top").addClass("navbar-static-top"), $("body").removeClass("fixed-nav"), localStorageSupport && localStorage.setItem("fixednavbar", "off"), localStorageSupport && localStorage.setItem("boxedlayout", "on")) : ($("body").removeClass("boxed-layout"), localStorageSupport && localStorage.setItem("boxedlayout", "off"))
		}), $(".s-skin-0").click(function() {
			return $("body").removeClass("skin-1"),
			$("body").removeClass("skin-2"),
			$("body").removeClass("skin-3"),
			!1
		}), $(".s-skin-1").click(function() {
			return $("body").removeClass("skin-2"),
			$("body").removeClass("skin-3"),
			$("body").addClass("skin-1"),
			!1
		}), $(".s-skin-3").click(function() {
			return $("body").removeClass("skin-1"),
			$("body").removeClass("skin-2"),
			$("body").addClass("skin-3"),
			!1
		}), localStorageSupport) {
			var e = localStorage.getItem("collapse_menu"),
			a = localStorage.getItem("fixednavbar"),
			o = localStorage.getItem("boxedlayout");
			"on" == e && $("#collapsemenu").prop("checked", "checked"),
			"on" == a && $("#fixednavbar").prop("checked", "checked"),
			"on" == o && $("#boxedlayout").prop("checked", "checked")
		}
		if (localStorageSupport) {
			var e = localStorage.getItem("collapse_menu"),
			a = localStorage.getItem("fixednavbar"),
			o = localStorage.getItem("boxedlayout"),
			l = $("body");
			"on" == e && (l.hasClass("body-small") || l.addClass("mini-navbar")),
			"on" == a && ($(".navbar-static-top").removeClass("navbar-static-top").addClass("navbar-fixed-top"), l.addClass("fixed-nav")),
			"on" == o && l.addClass("boxed-layout")
		}
	});
})