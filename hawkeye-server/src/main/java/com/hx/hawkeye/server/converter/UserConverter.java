package com.hx.hawkeye.server.converter;

import com.hx.hawkeye.orm.domain.authority.User;
import com.hx.hawkeye.orm.domain.authority.UserRole;
import com.hx.hawkeye.server.dto.UserForm;
import com.hx.hawkeye.server.util.MD5Util;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;


import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
public class UserConverter {

    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    public Page<UserForm> toFormPage(Page<User> domainPage, Pageable pageable) {
        if (domainPage != null) {
            List<UserForm> forms = this.toForms(domainPage.getContent());
            long size = domainPage.getTotalElements();
            Page<UserForm> formPage = new PageImpl<UserForm>(forms, pageable, size);
            return formPage;
        }
        return null;
    }

    public List<UserForm> toForms(List<User> domains) {
        if (domains == null || domains.size() == 0) return null;
        List<UserForm> forms = new ArrayList<UserForm>();
        for (User domain : domains) {
            forms.add(this.toForm(domain));
        }
        return forms;
    }

    public UserForm toForm(User domain) {
        if (domain != null) {
            UserForm form = new UserForm();
            form.setId(domain.getId());
            form.setName(domain.getName());
            form.setLoginName(domain.getLoginName());
            form.setCreateDate(format.format(domain.getCreateDate()));
            form.setValidate(domain.getValidate());
            form.setPassword(domain.getPassword());
            StringBuffer roles = new StringBuffer();
            Set<UserRole> userRoles = domain.getUserRoles();
            if (userRoles == null || userRoles.size() == 0) return form;
            for (UserRole ur : userRoles) {
                roles.append(ur.getRole().getInfo() + ",");
            }
            form.setRoles(roles.toString().substring(0, roles.toString().length() - 1));
            return form;
        }
        return null;
    }


    public UserForm toForm2(User domain) {
        if (domain != null) {
            UserForm form = new UserForm();
            form.setId(domain.getId());
            form.setName(domain.getName());
            form.setLoginName(domain.getLoginName());
            form.setCreateDate(format.format(domain.getCreateDate()));
            form.setValidate(domain.getValidate());
            form.setPassword(domain.getPassword());
            StringBuffer roles = new StringBuffer();
            Set<UserRole> userRoles = domain.getUserRoles();
            if (userRoles == null || userRoles.size() == 0) return form;
            for (UserRole ur : userRoles) {
                roles.append(ur.getRole().getId() + ",");
            }
            form.setRoles(roles.toString().substring(0, roles.toString().length() - 1));
            return form;
        }
        return null;
    }

    public User toDomain(UserForm form) {
        if (form != null) {
            User domain = new User();
            domain.setId(form.getId());
            domain.setName(form.getName());
            domain.setLoginName(form.getLoginName());
            domain.setCreateDate(new Timestamp(System.currentTimeMillis()));
            domain.setValidate(form.getValidate());
            domain.setPassword(MD5Util.md5(form.getPassword()));
            return domain;
        }
        return null;
    }

    public List<User> toDomains(List<UserForm> userForms) {
        if (userForms == null)
            return null;
        List<User> domains = new ArrayList<User>();
        for (UserForm userForm : userForms) {
            domains.add(this.toDomain(userForm));
        }
        return domains;
    }
}
