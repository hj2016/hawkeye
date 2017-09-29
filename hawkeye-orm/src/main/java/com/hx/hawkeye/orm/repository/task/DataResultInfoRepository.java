package com.hx.hawkeye.orm.repository.task;

import com.hx.hawkeye.orm.domain.task.DataResultInfo;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;


public interface DataResultInfoRepository extends PagingAndSortingRepository<DataResultInfo, Long> {

    List<DataResultInfo> findByTaskId(long taskId);

    List<DataResultInfo> findByTaskIdAndAccount(Long taskId, String account);
}
