package com.hx.hawkeye.server.service;

import com.hx.hawkeye.orm.domain.task.Task;
import com.hx.hawkeye.orm.repository.task.TaskRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by huangjing on 17-9-28.
 */
@Service
public class TaskServiceImpl {

    @Resource
    private TaskRepository taskDao;

    public Task findById(Long id) {
        return taskDao.findById(id);
    }
}
