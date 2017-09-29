package com.hx.hawkeye.server.controller;

import com.hx.hawkeye.orm.domain.authority.User;
import com.hx.hawkeye.server.dto.UserForm;
import com.hx.hawkeye.server.message.BaseMessage;
import com.hx.hawkeye.server.message.Message;
import com.hx.hawkeye.server.message.MessageCode;
import com.hx.hawkeye.server.service.UserServiceImpl;
import com.hx.hawkeye.server.util.ConstantUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;


@Controller
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private HttpServletRequest request;

    @RequestMapping(value = "login", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage login(@RequestParam(required = true) final String loginName,
                             @RequestParam(required = true) final String password,
                             @RequestParam(required = false) final String rememberPwd, HttpServletRequest request,
                             HttpServletResponse reponse) {
        return userServiceImpl.login(loginName, password, rememberPwd, request, reponse);
    }

    @RequestMapping(value = "getUserBySession", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage getUserBySession(HttpServletRequest request) {
        return userServiceImpl.findUserBySession(request);
    }

    @RequestMapping(value = "exit", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage exit(HttpServletRequest request) {
        try {
            request.getSession().removeAttribute(ConstantUtil.SESSION_USER);
        } catch (Exception e) {
            e.printStackTrace();
            return new BaseMessage(MessageCode.FAILED, false);
        }
        return new BaseMessage(MessageCode.FAILED, true);
    }

    @RequestMapping(value = "search", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage searchUser(@RequestBody UserForm userForm) {
        return userServiceImpl.searchUser(userForm);
    }

    @RequestMapping(value = "isExist", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage isExist(@RequestParam String loginName) {
        return userServiceImpl.findUserByLoginName(loginName);
    }

    @RequestMapping(value = "delete", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage delUser(@RequestBody List<Long> ids) {
        return userServiceImpl.delUser(ids);
    }

    @RequestMapping(value = "getUserById", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage getUserInfo(@RequestParam Long id) {
        return userServiceImpl.findUserById(id);
    }

    @RequestMapping(value = "update", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage updateUser(@RequestBody UserForm userForm) {
        return userServiceImpl.updateUser(userForm);
    }

    @RequestMapping(value = "save", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage saveUser(@RequestBody UserForm userForm) {
        return userServiceImpl.saveUser(userForm);
    }

    @RequestMapping(value = "list")
    @ResponseBody
    public BaseMessage list(@RequestParam(required = false, defaultValue = "10") Integer limit,
                            @RequestParam(required = false, defaultValue = "0") Integer offset) {
        Integer pageIndex = 1;
        if (limit != 0) {
            pageIndex = (offset / limit) + 1;
        }
        return userServiceImpl.list(pageIndex, limit);
    }


    @RequestMapping(value = "initAuthority")
    @ResponseBody
    public BaseMessage initAuthority(HttpServletRequest request, HttpServletResponse response) {
        Object obj = request.getSession().getAttribute(ConstantUtil.SESSION_USER);
        if (obj == null) {
            return new BaseMessage(MessageCode.USER_NOT_LOGIN, false);
        }
        try {
            User user = (User) obj;
            return this.userServiceImpl.initAuthority(user);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
