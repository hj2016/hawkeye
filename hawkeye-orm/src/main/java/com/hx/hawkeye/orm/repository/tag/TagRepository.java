package com.hx.hawkeye.orm.repository.tag;


import com.hx.hawkeye.orm.domain.tag.Tag;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;


public interface TagRepository extends PagingAndSortingRepository<Tag, Long> {

    /**
     * 根据uid查找Tag
     *
     * @return
     */
    Tag findByUid(String uid);


    Tag findById(String tagId);
}
