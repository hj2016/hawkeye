package com.hx.hawkeye.api.constant;

/**
 * Created by huangjing on 17-4-22.
 */
public enum TaskState {

    WAITING(0, "等待中"),
    PROCESSING(1, "执行中"),
    KILLED(2, "已停止"),
    FAILED(3, "已失败"),
    SECCESS(4, "已完成");

    private int symbol;

    private String label;

    private TaskState(int symbol, String label) {
        this.symbol = symbol;
        this.label = label;
    }

    public int symbol() {
        return this.symbol;
    }

    public String symbolStr(){
        return String.valueOf(this.symbol);
    }

    public String label() {
        return this.label;
    }
}
