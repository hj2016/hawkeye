package com.hx.hawkeye.orm.repository.tag;

import com.hx.hawkeye.orm.domain.tag.TagRule;
import com.hx.hawkeye.orm.domain.task.Task;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

/**
 * Created by huangjing on 17-10-8.
 */
public interface TagRuleRepository  extends PagingAndSortingRepository<TagRule, String> {

    List<TagRule> findByTaskId(Long id);
}
