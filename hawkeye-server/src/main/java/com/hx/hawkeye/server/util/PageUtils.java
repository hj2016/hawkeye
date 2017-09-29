package com.hx.hawkeye.server.util;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

public class PageUtils {

    public static PageRequest getPageRequest(Integer pageNumber, Integer size) {
        return getPageRequest(pageNumber, size, null, null);
    }

    public static PageRequest getPageRequest(Integer pageNumber, Integer pageSize, String order, String direction) {
        PageRequest pageRequest = null;
        if (pageNumber == null) {
            pageNumber = 1;
        }
        if (pageSize == null) {
            pageSize = 10;
        }
        if (order == null || direction == null) {
            pageRequest = new PageRequest(pageNumber - 1, pageSize);
        } else {
            Sort sort = null;
            if (direction.equalsIgnoreCase("desc")) {
                sort = new Sort(Sort.Direction.DESC, order);
            } else if (direction.equalsIgnoreCase("asc")) {
                sort = new Sort(Sort.Direction.ASC, order);
            }
            pageRequest = new PageRequest(pageNumber - 1, pageSize, sort);
        }
        return pageRequest;
    }

    public static PageRequest getPageRequest(Page<?> page) {
        PageRequest pageRequest = null;
        if (page != null) {
            int pageNumber = page.getNumber();
            int pageSize = page.getSize();
            Sort sort = page.getSort();
            pageRequest = new PageRequest(pageNumber, pageSize, sort);
        }
        return pageRequest;
    }

}
