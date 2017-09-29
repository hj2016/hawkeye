package com.hx.hawkeye.server.service;

import com.hx.hawkeye.orm.domain.authority.Resource;
import com.hx.hawkeye.orm.repository.authority.ResourceRepository;
import com.hx.hawkeye.server.converter.ResourceConverter;
import com.hx.hawkeye.server.dto.MenuForm;
import com.hx.hawkeye.server.dto.SearchResourceForm;
import com.hx.hawkeye.server.message.BaseMessage;
import com.hx.hawkeye.server.message.MessageCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ResourceServiceImpl {
    @Autowired
    private ResourceRepository resourceRepository;
    
    @Autowired
    private ResourceConverter resourceConverter;
    
    public BaseMessage findAllList() {
        List<Resource> resourceMenus=resourceRepository.findAllMenu();
        List<MenuForm> menuforms=this.resourceConverter.toFroms(resourceMenus);
        return new BaseMessage(MessageCode.SUCCESSED, menuforms);
    }

    public BaseMessage searchResource(SearchResourceForm searchResourceForm) {
        List<Resource> resources = this.resourceRepository.searchResourceForm(searchResourceForm.getName(), searchResourceForm.getMode(),
                searchResourceForm.getLimit(), searchResourceForm.getOffset());
        Long count = this.resourceRepository.searchRoleResourceCount(searchResourceForm.getName(), searchResourceForm.getMode())
                .longValue();
        List<MenuForm> roleForms = this.resourceConverter.toFroms(resources);
        List<Object> data = new ArrayList<Object>();
        data.add(count);
        data.add(roleForms);
        return new BaseMessage(MessageCode.SUCCESSED, data);
    }

    public BaseMessage saveResource(MenuForm menuForm) {
        Resource resourceMenu= this.resourceConverter.toDomain(menuForm);
        this.resourceRepository.save(resourceMenu);
        return new BaseMessage(MessageCode.SUCCESSED, true);
    }

    public BaseMessage findResourceById(Long id) {
        Resource resourceMenu=this.resourceRepository.findOne(id);
        MenuForm menuForm=this.resourceConverter.toForm(resourceMenu);
        return new BaseMessage(MessageCode.SUCCESSED, menuForm);
    }

    public BaseMessage updateResource(MenuForm menuForm) {
        return saveResource(menuForm);
    }

    public BaseMessage delResource(List<Long> ids) {
        Iterable<Resource> resourceMenus=this.resourceRepository.findAll(ids);
        this.resourceRepository.delete(resourceMenus);
        return new BaseMessage(MessageCode.SUCCESSED, true);
    }

}
