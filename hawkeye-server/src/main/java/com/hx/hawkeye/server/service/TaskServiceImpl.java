package com.hx.hawkeye.server.service;

import com.alibaba.dubbo.common.json.JSON;
import com.alibaba.dubbo.common.utils.CollectionUtils;
import com.hx.hawkeye.api.constant.TaskState;
import com.hx.hawkeye.orm.domain.authority.User;
import com.hx.hawkeye.orm.domain.tag.Tag;
import com.hx.hawkeye.orm.domain.tag.TagRule;
import com.hx.hawkeye.orm.domain.task.Task;
import com.hx.hawkeye.orm.repository.tag.TagRepository;
import com.hx.hawkeye.orm.repository.tag.TagRuleRepository;
import com.hx.hawkeye.orm.repository.task.TaskRepository;
import com.hx.hawkeye.server.dto.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by huangjing on 17-9-28.
 */
@Service
public class TaskServiceImpl {

    @Resource
    private TaskRepository taskDao;

    @Resource
    private TagRepository tagDao;

    @Resource
    private TagRuleRepository tagRuleDao;

    public Task findById(Long id) {
        return taskDao.findById(id);
    }

    private static Logger logger = LoggerFactory.getLogger(TaskServiceImpl.class);

    @Transactional
    public void selectTaskId(TaskConditionForm taskConditionDto, User user) {


        String AND = "AND";
        List<Condition> conditionsList = taskConditionDto.getConditions();
        //拼接sq
        StringBuffer stockTag = new StringBuffer();

        Task task = new Task();
        List<Object> TagRuleDtos = new ArrayList<Object>();
        List<Object> excludess = new ArrayList<Object>();

        StringBuffer sqlContent = new StringBuffer();


        // 有数据
        if (conditionsList != null && conditionsList.size() > 0) {
            for (int i = 0; i < conditionsList.size(); i++) {
                StringBuffer sql = new StringBuffer();
                List<List<TagRuleDto>> TagRuleDtoList = conditionsList.get(i)
                        .getIncludes();
                TagRuleDtos.addAll(TagRuleDtoList);
                // 有包含条件
                if (TagRuleDtoList != null && TagRuleDtoList.size() > 0) {
                    for (int j = 0; j < TagRuleDtoList.size(); j++) {
                        List<TagRuleDto> list = TagRuleDtoList.get(j);
                        if (list != null && list.size() > 0) {
                            for (int k = 0; k < list.size(); k++) {

                                String tagId = list.get(k).getTagId();
                                String content = list.get(k).getRule();
                                Tag tag = tagDao.findByTagId(tagId);
                                String tableName = tag.getTableName();

                                if (tableName.equalsIgnoreCase("stock_tag")) {
                                    stockTag.append(TagSql.inBuildSql(AND, tag.getColumnName(), tag.getChoiceType(), content, true));
                                }
                            }
                        }
                    }

                }


                // 包含语句and
                List<List<TagRuleDto>> excludesList = conditionsList.get(i)
                        .getExcludes();
                excludess.addAll(excludesList);

                if (CollectionUtils.isNotEmpty(excludesList)) {
                    for (int j = 0; j < excludesList.size(); j++) {

                        List<TagRuleDto> list = excludesList.get(j);
                        if (CollectionUtils.isNotEmpty(list)) {
                            if (list != null && list.size() > 0) {
                                for (int k = 0; k < list.size(); k++) {

                                    String tagId = list.get(k).getTagId();
                                    String content = list.get(k).getRule();
                                    Tag tag = tagDao.findById(tagId);
                                    String tableName = tag.getTableName();

                                    if (tableName.equalsIgnoreCase("stock_tag")) {

                                        stockTag.append(TagSql.exBuildSql(AND, tag.getColumnName(), tag.getChoiceType(), content, true));
                                    }
                                }
                            }
                        }
                    }
                }
                String dataSource = conditionsList.get(i).getDataSource();

                if (dataSource.equalsIgnoreCase("d001")) {
                    sql.append("select * from stock_tag where 1=1 " + stockTag.toString());
                }

                sqlContent.append(sql + ";");
            }
        }
        task.setTaskName(taskConditionDto.getTaskName());
        task.setTaskDesc(taskConditionDto.getTaskDesc());
        task.setUpdateTime(new Date());
        task.setContent(sqlContent.toString().trim());
        task.setCreateTime(new Date());
        task.setAccount(String.valueOf(user.getId()));
        task.setState(TaskState.WAITING.symbol());
        task.setTaskType(taskConditionDto.getTaskType());
        task.setPreTaskId(-1);
        taskDao.save(task);
        int count = 0;
        if (TagRuleDtos.size() >= excludess.size()) {
            count = TagRuleDtos.size();
        } else {
            count = excludess.size();
        }


        for (int j = 0; j < conditionsList.size(); j++) {
            TagRule tagRule = new TagRule();
            try {
                tagRule.setExclude(JSON.json(conditionsList.get(j).getExcludes()));
                tagRule.setInclude(JSON.json(conditionsList.get(j).getIncludes()));
                tagRule.setDatasource(conditionsList.get(j).getDataSource());
            } catch (Exception e) {
                e.printStackTrace();
                logger.error("异常：", e);
            }
            tagRule.setTaskId(task.getId());
            tagRuleDao.save(tagRule);
        }


    }

    public List<Task> taskSearchList(TaskSearchForm taskSearchForm) {
        List<Task> tasks=taskDao.taskSearchList(taskSearchForm.getTaskName());
    }
}
