package com.hx.hawkeye.server.dto;

import java.util.Date;


/**
 * Created by huangjing on 17-11-19.
 */
public class TaskViewDto {

    // 主键
    private long id;

    // 创建者
    private String account;

    // 任务名称
    private String taskName;

    // 任务类型
    private String taskType;

    // 任务描述
    private String taskDesc;

    // 任务状态
    private int state;

    // 执行的sql语句
    private String content;

    // 临时存发路径
    private String tem_rel_path;

    // 前置任务id
    private long preTaskId;

    // 任务引擎id
    private String app_id;

    // 时间周期
    private String datePeriod;

    // 任务真正调度时间
    private Date startTime;

    // 任务跑取结束的时间
    private Date endTime;

    //画像分析的维度
    private String dimension;

    // 创建时间
    private Date createTime;

    // 更新时间
    private Date updateTime;

    private String accountName;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getTaskType() {
        return taskType;
    }

    public void setTaskType(String taskType) {
        this.taskType = taskType;
    }

    public String getTaskDesc() {
        return taskDesc;
    }

    public void setTaskDesc(String taskDesc) {
        this.taskDesc = taskDesc;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTem_rel_path() {
        return tem_rel_path;
    }

    public void setTem_rel_path(String tem_rel_path) {
        this.tem_rel_path = tem_rel_path;
    }

    public long getPreTaskId() {
        return preTaskId;
    }

    public void setPreTaskId(long preTaskId) {
        this.preTaskId = preTaskId;
    }

    public String getApp_id() {
        return app_id;
    }

    public void setApp_id(String app_id) {
        this.app_id = app_id;
    }

    public String getDatePeriod() {
        return datePeriod;
    }

    public void setDatePeriod(String datePeriod) {
        this.datePeriod = datePeriod;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public String getDimension() {
        return dimension;
    }

    public void setDimension(String dimension) {
        this.dimension = dimension;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }
}
