package com.hx.hawkeye.orm.repository.authority;

import com.hx.hawkeye.orm.domain.authority.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.List;

public interface ResourceRepository extends JpaRepository<Resource, Long> {

    @Transactional
    @Query(value = "select * from resouce", nativeQuery = true)
    public List<Resource> findAllMenu();

    @Modifying
    @Transactional
    @Query(value = "insert into role_resource values (?1,?2)", nativeQuery = true)
    public Integer addRoleResource(String resourceCode, String roleId);

    @Transactional
    @Query(value = "select * from resouce where name like %?1% and mode like %?2% limit ?4,?3", nativeQuery = true)
    public List<Resource> searchResourceForm(String name, String mode, Long limit, Long offset);

    @Transactional
    @Query(value = "select count(*) from resouce where name like %?1% and mode like %?2%", nativeQuery = true)
    public BigInteger searchRoleResourceCount(String name, String mode);

    @Transactional
    @Query(value = "select * from resouce where parent_code=?1 and parent_code<>code", nativeQuery = true)
    public List<Resource> findByPCode(String pcode);

    public Resource findByCode(String code);

    @Transactional
    @Query(value = "select count(*) from role_resource where resource_code in(?1)", nativeQuery = true)
    public BigInteger findByResource(List<Long> ids);

}
