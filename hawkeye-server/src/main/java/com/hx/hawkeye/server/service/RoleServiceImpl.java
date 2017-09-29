package com.hx.hawkeye.server.service;

import com.hx.hawkeye.orm.domain.authority.Role;
import com.hx.hawkeye.orm.repository.authority.ResourceRepository;
import com.hx.hawkeye.orm.repository.authority.RoleRepository;
import com.hx.hawkeye.server.converter.RoleConverter;
import com.hx.hawkeye.server.dto.RoleForm;
import com.hx.hawkeye.server.dto.SearchRoleForm;
import com.hx.hawkeye.server.message.BaseMessage;
import com.hx.hawkeye.server.message.MessageCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoleServiceImpl {
    @Autowired
    private ResourceRepository resourceRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private RoleConverter roleConverter;

    public BaseMessage pageList(Integer pageIndex, Integer limit) {
        return null;
    }

    public BaseMessage findAllList() {
        List<Role> loginRoles = roleRepository.findAll();
        List<RoleForm> roleForms = this.roleConverter.toForms(loginRoles);
        return new BaseMessage(MessageCode.SUCCESSED, roleForms);
    }

    public BaseMessage searchRole(SearchRoleForm searchRoleForm) {
        List<Role> loginRoles = this.roleRepository.searchRoleForm(searchRoleForm.getRole(), searchRoleForm.getInfo(),
                searchRoleForm.getLimit(), searchRoleForm.getOffset());
        Long count = this.roleRepository.searchRoleFormCount(searchRoleForm.getRole(), searchRoleForm.getInfo())
                .longValue();
        List<RoleForm> roleForms = this.roleConverter.toForms(loginRoles);
        List<Object> data = new ArrayList<Object>();
        data.add(count);
        data.add(roleForms);
        return new BaseMessage(MessageCode.SUCCESSED, data);
    }

    public BaseMessage delRole(List<Long> ids) {
        Iterable<Role> roles = this.roleRepository.findAll(ids);
        for (Role role : roles) {
            this.roleRepository.delectRoleByRoleId(role.getId());
            this.roleRepository.delete(role.getId());
        }
        return new BaseMessage(MessageCode.SUCCESSED, true);
    }

    public BaseMessage findRoleById(Long id) {
        Role role = this.roleRepository.findOne(id);
        RoleForm u = this.roleConverter.toForm(role);
        return new BaseMessage(MessageCode.SUCCESSED, u);
    }

    public BaseMessage updateRole(RoleForm roleForm) {
        this.roleRepository.delectRoleByRoleId(roleForm.getId());
        saveRole(roleForm);
        return new BaseMessage(MessageCode.SUCCESSED, true);
    }

    public BaseMessage saveRole(RoleForm roleForm) {
        Role role=this.roleConverter.toDomain(roleForm);
        if(roleForm.getResources()==null){
            return new BaseMessage(MessageCode.SUCCESSED, false);
        }
        String ids[]=roleForm.getResources().split(",");
        this.roleRepository.save(role);
        for(String id:ids){
            this.resourceRepository.addRoleResource(id,role.getId().toString());
        }
        return new BaseMessage(MessageCode.SUCCESSED, true);
    }

}
