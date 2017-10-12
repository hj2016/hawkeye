package com.hx.hawkeye.orm.domain.tag;


public class TagRule {
    private Long id;

    private Long taskId;

    private String include;

    private String exclude;

    private String datasource;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getInclude() {
        return include;
    }

    public void setInclude(String include) {
        this.include = include == null ? null : include.trim();
    }

    public String getExclude() {
        return exclude;
    }

    public void setExclude(String exclude) {
        this.exclude = exclude == null ? null : exclude.trim();
    }

    public String getDatasource() {
        return datasource;
    }

    public void setDatasource(String datasource) {
        this.datasource = datasource;
    }
}