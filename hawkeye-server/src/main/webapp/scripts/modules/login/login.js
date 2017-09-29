$(function() {

	$("#login").on("click", function() {
		var params = $("form").serializeObject();
		if (params.username == '' || params.password == '') {
			alert("请输入用户名和密码!");
			return null;
		}
		$.post("/user/login", params, function(data) {
			if(data.data == true) {
				alert("登录成功!",function () {
                    window.location.href = 'index.html';
                });

			}else{
				alert("用户名或密码错误!");
			}
		});

	});


});