package com.hx.hawkeye.server.controller;

import com.hx.hawkeye.orm.domain.tag.Tag;
import com.hx.hawkeye.server.message.BaseMessage;
import com.hx.hawkeye.server.message.MessageCode;
import com.hx.hawkeye.server.service.TagTypeServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by huangjing on 17-10-30.
 */
@Controller
@RequestMapping("/tagType")
public class TagTypeController {

    private static final Logger logger = LoggerFactory.getLogger(TagTypeController.class);

    @Resource
    private TagTypeServiceImpl tagTypeService;


    @RequestMapping(value = "list", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage list(String dataSrc, HttpServletRequest request) {
        try{
            List<Object> list = tagTypeService.findAllTag(dataSrc);
            return new BaseMessage(MessageCode.SUCCESSED,list);
        }catch (Exception e){
            logger.error("list 方法异常：",e);
            return new BaseMessage(MessageCode.FAILED,MessageCode.SYSTEM_ERROR);
        }

    }

    @RequestMapping(value = "findTag", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage findTag(String tagId) {
        Tag tag = tagTypeService.findTagById(tagId);
        return new BaseMessage(MessageCode.SUCCESSED, tag);
    }
}
