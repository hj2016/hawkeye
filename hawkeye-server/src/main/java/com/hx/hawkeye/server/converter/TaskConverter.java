package com.hx.hawkeye.server.converter;

import com.hx.hawkeye.orm.domain.task.Task;
import com.hx.hawkeye.server.dto.TaskViewDto;
import org.springframework.beans.BeanUtils;

/**
 * Created by huangjing on 17-11-19.
 */
public class TaskConverter {
    public TaskViewDto toFrom(Task domain){
        if(domain !=null ){
            TaskViewDto from = new TaskViewDto();
            return from;
        }

        return null;
    }
}
