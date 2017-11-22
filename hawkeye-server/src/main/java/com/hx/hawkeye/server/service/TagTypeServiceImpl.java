package com.hx.hawkeye.server.service;

import com.alibaba.dubbo.common.utils.CollectionUtils;
import com.hx.hawkeye.orm.domain.tag.Tag;
import com.hx.hawkeye.orm.domain.tag.TagType;
import com.hx.hawkeye.orm.repository.tag.TagRepository;
import com.hx.hawkeye.orm.repository.tag.TagTypeRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by huangjing on 17-10-30.
 */
@Service
public class TagTypeServiceImpl {

    public static Map<String, Map> tag = null;

    @Resource
    private TagRepository tagDao;

    @Resource
    private TagTypeRepository tagtypeDao;

    public List<Object> findAllTag(String dataSrc) {
        List<TagType> tagTypeAll = tagtypeDao.selectTagTypeByDataSrc(dataSrc);
        List<Object> list = new ArrayList<Object>();
        if (CollectionUtils.isEmpty(tagTypeAll)) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("text", null);
            map.put("selectable", false);
            map.put("tags", null);
            map.put("nodes", null);
            list.add(map);
            return list;
        }
        for (TagType tagType : tagTypeAll) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("text", tagType.getName());
            map.put("selectable", false);
            map.put("tags", tagType);
            List<Tag> tagList = tagDao.findSubTag(String.valueOf(tagType.getId()), dataSrc);
            List<Object> tags = new ArrayList<Object>();
            for (Tag tag : tagList) {
                Map<String, Object> tagMap = new HashMap<String, Object>();
                tagMap.put("text", tag.getName());
                tagMap.put("tags", tag);
                tags.add(tagMap);
            }
            map.put("nodes", tags);
            list.add(map);
        }
        return list;
    }

    public Tag findTagById(String tagId) {
        return tagDao.findByTagId(tagId);
    }

    public void initTagData() {
        Map<String, Map> tagMap = new HashMap<String, Map>();
        List<Tag> tags = this.tagDao.findAll();
        for (Tag tag : tags) {
            if (tag.getValKvs() == null) {
                tagMap.put(tag.getTagId(), new HashMap());
            } else {
                String[] tagstrs = tag.getValKvs().split(",");
                Map<String, String> kvs = new HashMap<String, String>();
                for (String tagstr : tagstrs) {
                    String[] kv = tagstr.split(":");
                    if (kv.length == 2) {
                        kvs.put(kv[0], kv[1]);
                    }
                }

                tagMap.put(tag.getTagId(), kvs);
            }

        }
        TagTypeServiceImpl.tag = tagMap;

    }
}
