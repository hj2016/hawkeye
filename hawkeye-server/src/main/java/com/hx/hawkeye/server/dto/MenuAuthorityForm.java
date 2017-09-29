package com.hx.hawkeye.server.dto;

import java.util.List;

public class MenuAuthorityForm {
    private String id;
    private String mode;
    private String name;
    private String href;
    private String icon;
    private List<MenuAuthorityForm> sub;
    public String getMode() {
        return mode;
    }
    public void setMode(String mode) {
        this.mode = mode;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getHref() {
        return href;
    }
    public void setHref(String href) {
        this.href = href;
    }
    public String getIcon() {
        return icon;
    }
    public void setIcon(String icon) {
        this.icon = icon;
    }
    public List<MenuAuthorityForm> getSub() {
        return sub;
    }
    public void setSub(List<MenuAuthorityForm> sub) {
        this.sub = sub;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
}
