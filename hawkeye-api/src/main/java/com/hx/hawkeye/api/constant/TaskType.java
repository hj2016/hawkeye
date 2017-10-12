package com.hx.hawkeye.api.constant;

/**
 * Created by huangjing on 17-4-22.
 */
public enum TaskType {
    DELINEATION("J0001", "数据筛选"),
    ANALYSIS("J0002", "数据分析");

    private String symbol;

    private String label;

    private TaskType(String symbol, String label) {
        this.symbol = symbol;
        this.label = label;
    }

    public String symbol() {
        return this.symbol;
    }

    public String label() {
        return this.label;
    }
}
