package com.hx.hawkeye.server.controller;

import com.hx.hawkeye.server.dto.MenuForm;
import com.hx.hawkeye.server.dto.SearchResourceForm;
import com.hx.hawkeye.server.message.BaseMessage;
import com.hx.hawkeye.server.service.ResourceServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


import java.util.List;

@Controller
@RequestMapping("resource")
public class ResourceController {
    @Autowired
    private ResourceServiceImpl resourceServiceImpl;
    
    @RequestMapping(value = "list")
    @ResponseBody
    public BaseMessage list() {
        return resourceServiceImpl.findAllList();
    }
    
    @RequestMapping(value = "search")
    @ResponseBody
    public BaseMessage searchResource(@RequestBody SearchResourceForm searchResourceForm) {
        return this.resourceServiceImpl.searchResource(searchResourceForm);
    }
    
    
    @RequestMapping(value = "save", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage saveResource(@RequestBody MenuForm menuForm) {
        return this.resourceServiceImpl.saveResource(menuForm);
    }
    
    @RequestMapping(value = "getResourceById", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage getResourceInfo(@RequestBody MenuForm menuForm) {
        return this.resourceServiceImpl.findResourceById(menuForm.getId());
    }
    
    @RequestMapping(value = "update", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage updateResource(@RequestBody MenuForm MenuForm) {
        return this.resourceServiceImpl.updateResource(MenuForm);
    }
    
    @RequestMapping(value = "delete", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage delResource(@RequestBody List<Long> ids) {
        return this.resourceServiceImpl.delResource(ids);
    }
}
