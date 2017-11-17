package com.hx.hawkeye.orm.repository.task;


import com.hx.hawkeye.orm.domain.task.Task;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.Set;


public interface TaskRepository extends PagingAndSortingRepository<Task, Long> {
/*
    *//**
     * 获取当前活跃的任务
     *
     * @return
     *//*
    @Query(value = "select * from task where state=0 and create_time<=now() order by create_time limit ?1", nativeQuery = true)
    List<Task> findActiveAllTask(int limit);

    *//**
     * 根据id和account和状态查找
     *
     * @param taskId
     * @param account
     * @param state
     * @return
     *//*
    Task findByIdAndAccountAndStateNot(long taskId, String account, int state);

    *//**
     * 根据id查询所有的任务
     *
     * @param ids
     * @return
     *//*
    List<Task> findByIdIn(List<Long> ids);

    *//**
     * 查询当前任务的非删除状态的后置任务
     *
     * @param taskId
     * @param state
     * @return
     *//*
    List<Task> findByPreTaskIdAndStateNot(long taskId, int state);

    *//**
     * 根据id和状态查找
     *
     * @param taskId
     * @param state
     * @return
     *//*
    Task findByIdAndStateNot(long taskId, int state);

    *//**
     * 查询前置任务
     *
     * @param id
     * @return
     *//*
    List<Task> findByPreTaskId(long id);

    @Query(value = "select * from task where account=?1 and  state=?2 and task_type_uid=?3 and DATE_FORMAT(create_time,'%Y-%m-%d')=?4", nativeQuery = true)
    List<Task> findByAccountAndState(String account, int taskState, String taskType, String todayDate);

    List<Task> findByAccountAndTaskTypeUidAndStateInAndCreateTimeBetween(String account, String ifCode, Set<Integer> keys, Date todayDate, Date endDate);

    Task findByAccountAndId(String account, long id);*/

    Task findById(Long id);

    @Query(value = "select * from task where task_name like %?1% and  state like %?2% and DATE_FORMAT(create_time,'%Y-%m-%d') like %?3% and DATE_FORMAT(update_time,'%Y-%m-%d') like %?4% limit ?5,?6", nativeQuery = true)
    @Transactional
    List<Task> taskSearchList(String taskName, String taskState, String startTime, String endTime,Long Offset,Long limit);

    @Query(value = "select count(*) from task where task_name like %?1% and  state like %?2% and DATE_FORMAT(create_time,'%Y-%m-%d') like %?3% and DATE_FORMAT(update_time,'%Y-%m-%d') like %?4% limit ?5,?6", nativeQuery = true)
    @Transactional
    BigInteger taskSearchListCount(String taskName, String taskState, String startTime, String endTime, Long offset, Long limit);
}
