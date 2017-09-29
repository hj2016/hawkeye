package com.hx.hawkeye.server.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CookieUtil {
    private static Logger LOGGER = LoggerFactory.getLogger(CookieUtil.class);

    /** cokkie保存一年时的maxAge值 */
    public static final int ONE_YEAR_AGE = 31536000;
    /** cokkie保存一天时的maxAge值 */
    public static final int ONE_DAY_AGE = 86400;
    /** cokkie保存一月时的maxAge值 */
    public static final int ONE_MONTH_AGE = 2592000;
    /** cokkie保存一小时时的maxAge值 */
    public static final int ONE_HOUR_AGE = 3600;
    /** cokkie保存在浏览器进程的maxAge值 */
    public static final int NOW_SESSION_AGE = 0;

    /**
     * 读取浏览器cookie中的信息
     * 
     * @param req
     *            HttpServletRequest
     * @param name
     *            cookie的名字
     * @return
     */
    public static String getValue(HttpServletRequest req, String name) {
        Cookie cookies[] = req.getCookies();

        String value = null;
        if (null == cookies) {
            return value;
        }

        for (Cookie cookie : cookies) {
            if (null != cookie && cookie.getName().equalsIgnoreCase(name)) {
                value = cookie.getValue();
                break;
            }
        }

        LOGGER.debug("get cookies name {} , value {}", name, value);
        return value;
    }

    /**
     * 设置浏览器cookie
     * 
     * @param req
     *            HttpServletRequest
     * @param res
     *            HttpServletRequest
     * @param name
     *            cookie的名字
     * @param value
     *            cookie的值
     * @param maxAge
     *            cookie保存时间，以秒为单位
     */
    public static void setValue(HttpServletRequest req, HttpServletResponse res, String name, String value, int maxAge) {
        Cookie cookies[] = req.getCookies();
        Cookie cookie = null;
        boolean hasCookie = false;
        for (int i = 0; i < cookies.length; i++) {
            cookie = cookies[i];
            if (cookie.getName().equalsIgnoreCase(name)) {
                LOGGER.info("the cookie named {} is existed", name);
                hasCookie = true;
                break;
            }
        }

        if (hasCookie) {
            cookie.setValue(value);
            cookie.setMaxAge(maxAge);
           /* LOGGER.info("update the cookie {}, set value {}, max age {}", name, value, maxAge);*/
        } else {
            cookie = new Cookie(name, value);
            cookie.setMaxAge(maxAge);
            /*LOGGER.info("new cookie {}, set value {}, max age {}", name, value, maxAge);*/
        }
        cookie.setPath("/");

        res.addCookie(cookie);
    }
}