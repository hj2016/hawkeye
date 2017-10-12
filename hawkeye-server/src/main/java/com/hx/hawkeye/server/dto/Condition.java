package com.hx.hawkeye.server.dto;

import java.io.Serializable;
import java.util.List;

/**
 * Created by huangjing on 17-5-6.
 */
public class Condition implements Serializable {

    private String dataSource;

    private List<List<TagRuleDto>> includes;

    private List<List<TagRuleDto>> excludes;

    public List<List<TagRuleDto>> getExcludes() {
        return excludes;
    }

    public void setExcludes(List<List<TagRuleDto>> excludes) {
        this.excludes = excludes;
    }

    public List<List<TagRuleDto>> getIncludes() {
        return includes;
    }

    public void setIncludes(List<List<TagRuleDto>> includes) {
        this.includes = includes;
    }

    public String getDataSource() {
        return dataSource;
    }

    public void setDataSource(String dataSource) {
        this.dataSource = dataSource;
    }

}
