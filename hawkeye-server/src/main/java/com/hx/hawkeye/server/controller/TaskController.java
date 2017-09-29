package com.hx.hawkeye.server.controller;

import com.hx.hawkeye.orm.domain.task.Task;
import com.hx.hawkeye.server.service.TaskServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

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

}
