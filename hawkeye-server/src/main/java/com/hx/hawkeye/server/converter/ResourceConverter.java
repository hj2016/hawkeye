package com.hx.hawkeye.server.converter;

import com.hx.hawkeye.orm.domain.authority.Resource;
import com.hx.hawkeye.server.dto.MenuAuthorityForm;
import com.hx.hawkeye.server.dto.MenuForm;
import org.springframework.stereotype.Component;


import java.util.ArrayList;
import java.util.List;

@Component
public class ResourceConverter {

    public List<MenuForm> toFroms(List<Resource> domains) {
        if (domains == null) {
            return null;
        }
        List<MenuForm> menuForms = new ArrayList<MenuForm>();
        for (Resource domain : domains) {
            menuForms.add(this.toForm(domain));
        }
        return menuForms;
    }

    public MenuForm toForm(Resource domain) {
        if (domain == null) {
            return null;
        }
        MenuForm from = new MenuForm();
        from.setId(domain.getId());
        from.setCode(domain.getCode());
        from.setIcon(domain.getIcon());
        from.setMode(domain.getMode());
        from.setName(domain.getName());
        from.setUrl(domain.getUrl());
        from.setpCode(domain.getpCode());
        return from;
    }

    public Resource toDomain(MenuForm form) {
        if (form == null) {
            return null;
        }
        Resource domain = new Resource();
        domain.setCode(form.getCode());
        domain.setIcon(form.getIcon());
        domain.setId(form.getId());
        domain.setMode(form.getMode());
        domain.setName(form.getName());
        domain.setpCode(form.getpCode());
        domain.setUrl(form.getUrl());
        return domain;
    }

    public MenuAuthorityForm toMenuAuthorityForm(Resource domain) {
        if (domain != null) {
            MenuAuthorityForm form = new MenuAuthorityForm();
            form.setId(String.valueOf(domain.getId()));
            form.setHref(domain.getUrl());
            form.setIcon(domain.getIcon());
            form.setMode(domain.getMode());
            form.setName(domain.getName());
            return form;
        }
        return null;
    }

    public List<MenuAuthorityForm> toMenuAuthorityForms(List<Resource> domains) {
        if (domains != null) {
            List<MenuAuthorityForm> forms = new ArrayList<MenuAuthorityForm>();
            for (Resource domain : domains) {
                forms.add(toMenuAuthorityForm(domain));
            }
            return forms;
        }
        return null;
    }

}
