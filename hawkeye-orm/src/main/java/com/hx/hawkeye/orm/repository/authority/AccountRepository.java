package com.hx.hawkeye.orm.repository.authority;


import com.hx.hawkeye.orm.domain.authority.Account;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface AccountRepository extends PagingAndSortingRepository<Account, String> {

    @Transactional
    @Query(value = "select * from account where account like %?1% and account_name like %?2% and status like %?3% limit ?5,?4",
            nativeQuery = true)
    List<Account> searchAccount(String id, String name, String status, Integer size, Integer offset);

    @Transactional
    @Query(value = "select count(*) from account where account like %?1% and account_name like %?2% and status like %?3%",
            nativeQuery = true)
    Integer accountCount(String id, String name, String status);

    Account findByAccount(String Id);
}
