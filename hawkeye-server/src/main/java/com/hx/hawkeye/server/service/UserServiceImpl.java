package com.hx.hawkeye.server.service;

import com.hx.hawkeye.orm.domain.authority.Resource;
import com.hx.hawkeye.orm.domain.authority.Role;
import com.hx.hawkeye.orm.domain.authority.User;
import com.hx.hawkeye.orm.domain.authority.UserRole;
import com.hx.hawkeye.orm.repository.authority.ResourceRepository;
import com.hx.hawkeye.orm.repository.authority.RoleRepository;
import com.hx.hawkeye.orm.repository.authority.UserRepository;
import com.hx.hawkeye.orm.repository.authority.UserRoleRepository;
import com.hx.hawkeye.server.converter.ResourceConverter;
import com.hx.hawkeye.server.converter.UserConverter;
import com.hx.hawkeye.server.dto.MenuAuthorityForm;
import com.hx.hawkeye.server.dto.UserForm;
import com.hx.hawkeye.server.message.BaseMessage;
import com.hx.hawkeye.server.message.MessageCode;
import com.hx.hawkeye.server.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

@Service
public class UserServiceImpl{

    static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private UserConverter userConverter;
    
    @Autowired
    private ResourceRepository resourceRepository;
    
    @Autowired
    private ResourceConverter resourceConverter;
    
    public BaseMessage login(String loginName, String password, String rememberPwd, HttpServletRequest request,
                             HttpServletResponse reponse) {
        User loginUser = userRepository.findByLoginNameAndPassword(loginName, MD5Util.md5(password));
        if (null != loginUser) {
            LOGGER.info("登录成功:{}", loginName);
            String remenberFlag = rememberPwd == null ? "" : rememberPwd;
            if ("on".equals(remenberFlag)) {
                CookieUtil.setValue(request, reponse, ConstantUtil.COOKIE_USER,
                        Base64Util.encode(loginUser.getLoginName()), CookieUtil.ONE_YEAR_AGE);
            }
            request.getSession().setAttribute(ConstantUtil.SESSION_USER, loginUser);
            return new BaseMessage(MessageCode.SUCCESSED, true);
        } else {
            LOGGER.info("登录失败:{}", loginName);
            return new BaseMessage(MessageCode.USERNAME_PASSWORD_ERROR, false);
        }
    }

    public BaseMessage list(Integer pageIndex, Integer pageSize) {
        Pageable pageable = PageUtils.getPageRequest(pageIndex, pageSize);
        Page<User> users = this.userRepository.findAll(PageUtils.getPageRequest(pageIndex, pageSize));
        Page<UserForm> formPage = this.userConverter.toFormPage(users, pageable);
        return new BaseMessage(MessageCode.SUCCESSED, formPage);
    }

    /**
     * 根据ID查询用户
     */
    public BaseMessage findUserById(Long id) {
        User user = userRepository.findOne(id);
        UserForm u = this.userConverter.toForm2(user);
        return new BaseMessage(MessageCode.SUCCESSED, u);
    }

    /**
     * 修改用户
     */
    public BaseMessage updateUser(UserForm userForm) {
        this.userRepository.delectUserByUserId(userForm.getId());
        saveUser(userForm);
        return new BaseMessage(MessageCode.SUCCESSED, true);
    }

    /**
     * 新增用户
     */
    public BaseMessage saveUser(UserForm userForm) {
        Role role = roleRepository.findOne(Long.parseLong(userForm.getRoles()));
        User user = userRepository.save(this.userConverter.toDomain(userForm));
        UserRole ur = new UserRole();
        ur.setRole(role);
        ur.setUser(user);
        userRoleRepository.save(ur);
        return new BaseMessage(MessageCode.SUCCESSED, true);
    }

    /**
     * 删除用户
     */
    public BaseMessage delUser(List<Long> ids) {
        Iterable<User> loginUsers = this.userRepository.findAll(ids);
        for (User loginUser : loginUsers) {
            this.userRepository.delectUserByUserId(loginUser.getId());
            this.userRepository.delete(loginUser.getId());
        }
        return new BaseMessage(MessageCode.SUCCESSED, true);
    }

    /**
     * 查询用户
     */
    public BaseMessage searchUser(UserForm userForm) {
        List<User> loginUsers = this.userRepository.searchUser(userForm.getName(), userForm.getLoginName(),
                userForm.getValidate(), userForm.getLimit(), userForm.getOffset());
        List<UserForm> UserForm = this.userConverter.toForms(loginUsers);
        long count = this.userRepository.searchUserCount(userForm.getName(), userForm.getLoginName(),
                userForm.getValidate()).longValue();
        List<Object> data = new ArrayList<Object>();
        data.add(count);
        data.add(UserForm);
        return new BaseMessage(MessageCode.SUCCESSED, data);
    }

    /**
     * 判断登录名是否存在
     */
    public BaseMessage findUserByLoginName(String loginName) {
        User user = userRepository.findByLoginName(loginName);
        if (user != null) {
            return new BaseMessage(MessageCode.SUCCESSED, false);
        } else {
            return new BaseMessage(MessageCode.SUCCESSED, true);
        }
    }

    /**
     * 获取当前session用户
     */
    public BaseMessage findUserBySession(HttpServletRequest request) {
        User user = (User)request.getSession().getAttribute(ConstantUtil.SESSION_USER);
        if (user == null ){
            return new BaseMessage(MessageCode.SUCCESSED, false);
        }
        Set<UserRole> userRoles = user.getUserRoles();
        StringBuffer roles = new StringBuffer();
        for (UserRole ur : userRoles) {
            roles.append(ur.getRole().getInfo());
        }
        return new BaseMessage(MessageCode.SUCCESSED, user.getName() + ":" + roles.toString());
    }
    
    /**
     * 用户权限初始化
     */
    public BaseMessage initAuthority(User user) {
        User domain=this.userRepository.findOne(user.getId());
        List<MenuAuthorityForm> forms=new ArrayList<MenuAuthorityForm>();
        for(UserRole userRole:domain.getUserRoles()){
            Role role=userRole.getRole();
            Long rid=role.getId();
            role=this.roleRepository.findOne(rid);
            for(Resource resourceMenu:role.getMenus()){
                initAuthority(forms,resourceMenu.getCode());
            }
        }
        Collections.sort(forms,new Comparator<MenuAuthorityForm>() {
            public int compare(MenuAuthorityForm o1, MenuAuthorityForm o2) {
                if(o1.getId()==null||o1.getId()==""||o2.getId()==null||o2.getId()==""){
                    return 0;
                }
                if (Long.parseLong(o1.getId()) < Long.parseLong(o2.getId())) {
                    return -1;
                } else if (Long.parseLong(o1.getId()) == Long.parseLong(o2.getId())) {
                    return 0;
                } else {
                    return 1;
                }
            }
            
        });
        return new BaseMessage(MessageCode.SUCCESSED, forms);
    }
    
    public List<MenuAuthorityForm> initAuthority(List<MenuAuthorityForm> forms, String pid){
        Resource domain=this.resourceRepository.findOne(Long.parseLong(pid));
        MenuAuthorityForm form=this.resourceConverter.toMenuAuthorityForm(domain);
        if(domain.getpCode().equals(pid)){
            List<Resource> subdomain=this.resourceRepository.findByPCode(domain.getpCode());
            List<MenuAuthorityForm> subform=this.resourceConverter.toMenuAuthorityForms(subdomain);
            if(subform.size()!=0){
                form.setSub(subform);
            }
            forms.add(form);
            return forms;
        }
        return forms;
    }
}
