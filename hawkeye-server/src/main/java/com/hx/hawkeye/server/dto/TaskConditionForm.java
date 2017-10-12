package com.hx.hawkeye.server.dto;

import java.util.List;

/**
 * Created by huangjing on 17-10-8.
 */
public class TaskConditionForm {
    private String taskName;

    private String taskType;

    private String taskDesc;

    private List<Condition> conditions;


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

    public List<Condition> getConditions() {
        return conditions;
    }

    public void setConditions(List<Condition> conditions) {
        this.conditions = conditions;
    }
}
