package com.hx.hawkeye.orm.domain.task;

import javax.persistence.*;

import java.util.Date;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * Created by huangjing on 17-9-28.
 */
@Entity
@Table(name = "task")
public class Task {
    // 主键
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private long id;

    // 创建者
    @Column(name = "account")
    private String account;

    // 任务名称
    @Column(name = "task_name")
    private String taskName;

    // 任务类型
    @Column(name = "task_type")
    private String taskType;


    // 任务状态
    @Column(name = "state")
    private int state;

    // 执行的sql语句
    @Column(name = "content", length = 16777216)
    private String content;

    // 临时存发路径
    @Column(name = "tem_rel_path")
    private String tem_rel_path;


    // 前置任务id
    @Column(name = "pre_task_id")
    private long preTaskId;


    // 任务引擎id
    @Column(name = "app_id")
    private String app_id;

    // 时间周期
    @Column(name = "date_period")
    private String datePeriod;

    // 任务真正调度时间
    @Column(name = "start_time")
    private Date startTime;

    // 任务跑取结束的时间
    @Column(name = "end_time")
    private Date endTime;

    //画像分析的维度
    @Column(name = "dimension")
    private String dimension;

    // 创建时间
    @Column(name = "create_time")
    private Date createTime;

    // 更新时间
    @Column(name = "update_time")
    private Date updateTime;

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
}
