package com.hx.hawkeye.orm.repository.tag;


import com.hx.hawkeye.orm.domain.tag.Tag;
import com.hx.hawkeye.orm.domain.tag.TagType;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface TagRepository extends PagingAndSortingRepository<Tag, Long> {

    /**
     * 根据id查找Tag
     *
     * @return
     */

    Tag findById(String tagId);



    @Transactional
    @Query(value = "select * from tag where tag_type_id= ?1 and data_src= ?2", nativeQuery = true)
    List<Tag> findSubTag(String s, String dataSrc);

    /**
     * 根据TagId查找Tag
     *
     * @return
     */
    Tag findByTagId(String tagId);
}
