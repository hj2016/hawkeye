package com.hx.hawkeye.orm.repository.authority;


import com.hx.hawkeye.orm.domain.authority.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {

    @Transactional
    @Query(value = "select * from user_role where role_id in(?1)", nativeQuery = true)
    List<UserRole> findByRole(List<Long> id);

}
