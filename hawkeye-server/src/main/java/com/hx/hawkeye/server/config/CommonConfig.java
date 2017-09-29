package com.hx.hawkeye.server.config;

/**
 * Created by huangjing on 17-9-28.
 */
public class CommonConfig {

    // 画像在spark中构造的表名
    private String natureTable;
    // 计算引擎的表主键
    private String sid;

    // 包含条件大类OR的个数
    private int includesOrNum;
    // 包含条件大类AND的个数
    private int includesAndNum;
    // 排除条件大类OR的个数
    private int excludesOrNum;
    // 排除条件大类AND的个数
    private int excludesAndNum;

    // 最多查询的任务的个数
    private int taskQueryMaxNum;

    public int getIncludesOrNum() {
        return includesOrNum;
    }

    public void setIncludesOrNum(int includesOrNum) {
        this.includesOrNum = includesOrNum;
    }

    public int getIncludesAndNum() {
        return includesAndNum;
    }

    public void setIncludesAndNum(int includesAndNum) {
        this.includesAndNum = includesAndNum;
    }

    public int getExcludesOrNum() {
        return excludesOrNum;
    }

    public void setExcludesOrNum(int excludesOrNum) {
        this.excludesOrNum = excludesOrNum;
    }

    public int getExcludesAndNum() {
        return excludesAndNum;
    }

    public void setExcludesAndNum(int excludesAndNum) {
        this.excludesAndNum = excludesAndNum;
    }

    public String getNatureTable() {
        return natureTable;
    }

    public void setNatureTable(String natureTable) {
        this.natureTable = natureTable;
    }

    public String getSid() {
        return sid;
    }

    public void setSid(String sid) {
        this.sid = sid;
    }

    public int getTaskQueryMaxNum() {
        return taskQueryMaxNum;
    }

    public void setTaskQueryMaxNum(int taskQueryMaxNum) {
        this.taskQueryMaxNum = taskQueryMaxNum;
    }
}
