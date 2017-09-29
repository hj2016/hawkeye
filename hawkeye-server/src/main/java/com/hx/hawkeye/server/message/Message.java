package com.hx.hawkeye.server.message;

public class Message {

    protected int code;
    protected String msg;
    protected String desc;

    public Message() {
        super();
    }

    public Message(MessageCode messageCode) {
        this(messageCode.getCode(), messageCode.getMsg());
    }

    public Message(int code, String msg) {
        super();
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

}
