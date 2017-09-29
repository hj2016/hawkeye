package com.hx.hawkeye.server.converter;

import com.hx.hawkeye.orm.domain.authority.Resource;
import com.hx.hawkeye.orm.domain.authority.Role;
import com.hx.hawkeye.server.dto.MenuForm;
import com.hx.hawkeye.server.dto.RoleForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class RoleConverter {
    public Page<RoleForm> toFormPage(Page<Role> domainPage, Pageable pageable) {
        if (domainPage != null) {
            List<RoleForm> forms = this.toForms(domainPage.getContent());
            long size = domainPage.getTotalElements();
            Page<RoleForm> formPage = new PageImpl<RoleForm>(forms, pageable, size);
            return formPage;
        }
        return null;
    }

    public List<RoleForm> toForms(List<Role> domains) {
        if (domains == null) {
            return null;
        }
        List<RoleForm> forms = new ArrayList<RoleForm>();
        for (Role domain : domains) {
            forms.add(this.toForm(domain));
        }
        return forms;
    }

    public RoleForm toForm(Role domain) {
        if (domain != null) {
            RoleForm roleForm = new RoleForm();
            roleForm.setId(domain.getId());
            roleForm.setInfo(domain.getInfo());
            roleForm.setRole(domain.getRole());
            Set<MenuForm> menus = new HashSet<MenuForm>();
            for (Resource resourceMenu : domain.getMenus()) {
                MenuForm menuForm = new MenuForm();
                menuForm.setCode(resourceMenu.getCode());
                menuForm.setIcon(resourceMenu.getIcon());
                menuForm.setId(resourceMenu.getId());
                menuForm.setMode(resourceMenu.getMode());
                menuForm.setName(resourceMenu.getName());
                menuForm.setUrl(resourceMenu.getUrl());
                menus.add(menuForm);
            }
            roleForm.setMenus(menus);
            return roleForm;
        }
        return null;
    }

    public RoleForm toForm2(Role role) {
        // TODO Auto-generated method stubd
        return null;
    }

    public Role toDomain(RoleForm roleForm) {
        if (roleForm == null) {
            return null;
        }
        Role role = new Role();
        role.setId(roleForm.getId());
        role.setInfo(roleForm.getInfo());
        role.setRole(roleForm.getRole());
        return role;
    }
}
