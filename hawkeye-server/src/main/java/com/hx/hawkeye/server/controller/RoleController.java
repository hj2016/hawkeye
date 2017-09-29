package com.hx.hawkeye.server.controller;

import com.hx.hawkeye.server.dto.RoleForm;
import com.hx.hawkeye.server.dto.SearchRoleForm;
import com.hx.hawkeye.server.message.BaseMessage;
import com.hx.hawkeye.server.service.RoleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@Controller
@RequestMapping("role")
public class RoleController {
    @Autowired
    private RoleServiceImpl roleServiceImpl;

    @RequestMapping(value = "pageList")
    @ResponseBody
    public BaseMessage pageList(@RequestParam(required = false, defaultValue = "10") Integer limit,
                                @RequestParam(required = false, defaultValue = "0") Integer offset) {
        Integer pageIndex = 1;
        if (limit != 0) {
            pageIndex = (offset / limit) + 1;
        }
        return roleServiceImpl.pageList(pageIndex, limit);
    }

    @RequestMapping(value = "search")
    @ResponseBody
    public BaseMessage searchRole(@RequestBody SearchRoleForm searchRoleForm) {
        if (searchRoleForm.getOffset() == null) {
            searchRoleForm.setOffset(0L);
        }
        if (searchRoleForm.getLimit() == null) {
            searchRoleForm.setLimit(0L);
        }
        return roleServiceImpl.searchRole(searchRoleForm);
    }

    @RequestMapping(value = "list")
    @ResponseBody
    public BaseMessage list() {
        return roleServiceImpl.findAllList();
    }


    @RequestMapping(value = "delete", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage delUser(@RequestBody List<Long> ids) {
        return roleServiceImpl.delRole(ids);
    }

    @RequestMapping(value = "getUserById", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage getUserInfo(@RequestBody RoleForm roleForm) {
        return roleServiceImpl.findRoleById(roleForm.getId());
    }

    @RequestMapping(value = "update", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage updateRole(@RequestBody RoleForm roleForm) {
        return roleServiceImpl.updateRole(roleForm);
    }

    @RequestMapping(value = "save", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage saveUser(@RequestBody RoleForm roleForm) {
        return roleServiceImpl.saveRole(roleForm);
    }
}
