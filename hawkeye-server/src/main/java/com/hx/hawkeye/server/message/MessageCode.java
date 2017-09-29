package com.hx.hawkeye.server.message;

public enum MessageCode {
    SUCCESSED(200, "提交成功"),
    NO_RESPONSE(100, "没有查询到结果"),
    FAILED(201, "提交失败"),

    PARAMS_ERROR(300, "参数不能为空或格式错误"),
    USER_NOT_LOGIN(302, "用户未登录或超时"),

    INTERFACE_NO_ACCESS(400, "没有此接口访问权限"),
    NO_RESOURCE(404, "请求的资源不存在"),
    USERNAME_PASSWORD_ERROR(440, "用户名密码错误"),

    USER_NAME_NOT_UNIQUE(301, "用户名重复"),
    USER_NOT_AVAILABLE(303, "帐号当前不可用"),
    SYSTEM_ERROR(9999, "系统错误");

    private int code;
    private String msg;

    private MessageCode(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

}
