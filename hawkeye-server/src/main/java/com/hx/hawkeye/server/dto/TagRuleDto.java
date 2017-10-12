package com.hx.hawkeye.server.dto;

import java.io.Serializable;

/**
 * Created by huangjing on 17-5-6.
 */
public class TagRuleDto implements Serializable {

    private static final long serialVersionUID = -4171603668519675599L;

    private String tagId;
    private String rule;

    public TagRuleDto() {
    }

    public TagRuleDto(String tagId, String rule) {
        this.tagId = tagId;
        this.rule = rule;
    }

    public String getTagId() {
        return tagId;
    }

    public void setTagId(String tagId) {
        this.tagId = tagId;
    }

    public String getRule() {
        return rule;
    }

    public void setRule(String rule) {
        this.rule = rule;
    }
}
