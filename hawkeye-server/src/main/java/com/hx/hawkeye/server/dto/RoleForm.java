package com.hx.hawkeye.server.dto;

import java.util.HashSet;
import java.util.Set;

public class RoleForm {
    private Long id;
    private String role;
    private String info;
    private Set<MenuForm> menus = new HashSet<MenuForm>(0);
    private String Resources;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public String getInfo() {
        return info;
    }
    public void setInfo(String info) {
        this.info = info;
    }
    public Set<MenuForm> getMenus() {
        return menus;
    }
    public void setMenus(Set<MenuForm> menus) {
        this.menus = menus;
    }
    public String getResources() {
        return Resources;
    }
    public void setResources(String resources) {
        Resources = resources;
    }
    
}
