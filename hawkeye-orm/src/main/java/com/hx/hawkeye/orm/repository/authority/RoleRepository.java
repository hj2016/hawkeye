package com.hx.hawkeye.orm.repository.authority;

import com.hx.hawkeye.orm.domain.authority.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Long> {
    @Transactional
    @Query(value = "select * from role where role like %?1% and info like %?2% limit ?4,?3", nativeQuery = true)
    public List<Role> searchRoleForm(String role, String info, long limit, Long offset);

    @Transactional
    @Query(value = "select count(*) from role where role like %?1% and info like %?2%", nativeQuery = true)
    public BigInteger searchRoleFormCount(String role, String info);

    @Modifying
    @Transactional
    @Query(value = "delete from role_resource where role_id=?1", nativeQuery = true)
    public int delectRoleByRoleId(Long id);

}
