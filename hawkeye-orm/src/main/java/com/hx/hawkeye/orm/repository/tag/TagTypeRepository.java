package com.hx.hawkeye.orm.repository.tag;

import com.hx.hawkeye.orm.domain.tag.TagType;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;


public interface TagTypeRepository extends PagingAndSortingRepository<TagType, String> {

    TagType findOneByUid(String type);

    @Query(value = "select COUNT(1) from tag_type where uid like %?1% and  name like %?2% ", nativeQuery = true)
    int findByCodeNametypeCount(String code, String name);


    @Query(value = "select * from tag_type where uid like %?1% and  name like %?2% order by uid limit ?3,?4 ",
            nativeQuery = true)
    List<TagType> findByCodeName(String code, String name, Integer offset, Integer limit);

}
