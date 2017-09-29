package com.hx.hawkeye.orm.repository.authority;

import com.hx.hawkeye.orm.domain.authority.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findByLoginNameAndPassword(String loginName, String password);

    public User findByLoginName(String loginName);

    @Modifying
    @Transactional
    @Query(value = "delete from user_role where user_id=?1", nativeQuery = true)
    public int delectUserByUserId(Long id);

    @Transactional
    @Query(value = "select * from user where name like %?1% and login_name like %?2% and validate like %?3% limit ?5,?4", nativeQuery = true)
    public List<User> searchUser(String name, String loginName, String validate, Long limit, Long offset);

    @Transactional
    @Query(value = "select count(*) from user where name like %?1% and login_name like %?2% and validate like %?3%", nativeQuery = true)
    public BigInteger searchUserCount(String name, String loginName, String validate);

}
