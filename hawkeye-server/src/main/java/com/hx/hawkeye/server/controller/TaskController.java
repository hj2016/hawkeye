package com.hx.hawkeye.server.controller;

import com.hx.hawkeye.orm.domain.authority.User;
import com.hx.hawkeye.orm.domain.task.Task;
import com.hx.hawkeye.server.dto.TaskConditionForm;
import com.hx.hawkeye.server.dto.TaskForm;
import com.hx.hawkeye.server.dto.TaskSearchForm;
import com.hx.hawkeye.server.message.BaseMessage;
import com.hx.hawkeye.server.message.MessageCode;
import com.hx.hawkeye.server.service.TaskServiceImpl;
import com.hx.hawkeye.server.util.GlobalConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by huangjing on 17-9-28.
 */

@Controller
@RequestMapping("/task")
public class TaskController {
    private static Logger logger = LoggerFactory.getLogger(TaskController.class);

    @Resource
    private TaskServiceImpl taskService;

    @RequestMapping(value = "findById", method = RequestMethod.GET)
    @ResponseBody
    public void findById(Long id, HttpServletRequest request) {
        Task taskForm = new Task();
        try {
            taskForm = taskService.findById(id);
        } catch (Exception e) {
            logger.info("服务异常{}", e);
        }
    }

    /**
     * 添加
     *
     * @param taskConditionDto
     * @param request
     * @return
     */
    @RequestMapping(value = "addTask", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage save(@RequestBody TaskConditionForm taskConditionDto, HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute(GlobalConstants.SESSION_USER);
        if (user == null) {
            return new BaseMessage(MessageCode.FAILED, MessageCode.USER_NOT_LOGIN);
        }
        try {
            taskService.selectTaskId(taskConditionDto, user);

        } catch (Exception e) {
            e.printStackTrace();
            return new BaseMessage (MessageCode.FAILED, MessageCode.SYSTEM_ERROR);
        }
        return new BaseMessage(MessageCode.SUCCESSED, MessageCode.SUCCESSED);
    }


    /**
     * 添加
     *
     * @param taskSearchForm
     * @return
     */
    @RequestMapping(value = "viewList", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage viewList(@RequestBody TaskSearchForm taskSearchForm){
        try{
            List<Object> taskpages= taskService.taskSearchList(taskSearchForm);
            return new BaseMessage(MessageCode.SUCCESSED, taskpages);
        }catch (Exception e){
            logger.error("viewList 异常：",e);
            return new BaseMessage (MessageCode.FAILED, MessageCode.SYSTEM_ERROR);
        }

    }

    /**
     * 添加
     *
     * @param taskSearchForm
     * @return
     */
    @RequestMapping(value = "selectTask", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage selectTask(Long id){
        try{
            TaskForm form = taskService.findDetailById(id);
            return new BaseMessage(MessageCode.SUCCESSED, form);
        }catch (Exception e){
            logger.error("viewList 异常：",e);
            return new BaseMessage (MessageCode.FAILED, MessageCode.SYSTEM_ERROR);
        }

    }
}
