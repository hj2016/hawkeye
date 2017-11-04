package com.hx.hawkeye.orm.repository.tag;

import com.hx.hawkeye.orm.domain.tag.TagType;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface TagTypeRepository extends PagingAndSortingRepository<TagType, String> {

    TagType findOneById(String type);

    @Query(value = "select COUNT(1) from tag_type where uid like %?1% and  name like %?2% ", nativeQuery = true)
    int findByCodeNametypeCount(String code, String name);


    @Query(value = "select * from tag_type where uid like %?1% and  name like %?2% order by uid limit ?3,?4 ",
            nativeQuery = true)
    List<TagType> findByCodeName(String code, String name, Integer offset, Integer limit);

    @Transactional
    @Query(value = "select t2.* from tag t1 join tag_type t2 on(t1.tag_type_id=t2.id) where t1.data_src= ?1 group by tag_type_id", nativeQuery = true)
    List<TagType> selectTagTypeByDataSrc(String dataSrc);
}
