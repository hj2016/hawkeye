package com.hx.hawkeye.server.controller.interceptor;

import com.hx.hawkeye.server.service.TagTypeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Service;

/**
 * Created by huangjing on 17-8-8.
 */
@Service
public class InitDataListener implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private TagTypeServiceImpl tagTypeService;


    public void onApplicationEvent(ContextRefreshedEvent event) {
        tagTypeService.initTagData();
    }
}
