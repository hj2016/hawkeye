package com.hx.hawkeye.server.util;

/**
 * Created by huangjing on 17-5-5.
 */
public class GlobalConstants {
    //用户session名称
    public final static String SESSION_USER = "session_user";

    //用户cookie名称
    public final static String COOKIE_USER = "cookie_user";

    // 人群圈定返回msg
    public static final String CONDITION_NULL = "条件为空";
    public static final String CONDITION_OR_NUM = "OR逻辑数量过多";
    public static final String CONDITION_INCLUDE_AND_NUM = "包含条件AND逻辑数量过多";
    public static final String CONDITION_EXCLUDE_AND_NUM = "排除条件AND逻辑数量过多";

    public static final String TASK_STATE_INVLID = "当前所处任务状态不可改变";
    public static final String TASK_STATE_INVLID_OPT = "当前所处任务状态不可操作";
    public static final String TASK_STATE_INVLID_DELETE = "当前任务有后置任务";


    // 标点符号
    public static final String SPACE = " ";
    public static final String COMMA = ",";
    public static final String MIDDLE_LINE = "-";
    public static final String EQUAL = "=";
    public static final String GREATER = ">";
    public static final String GREATER_EQUAL = ">=";
    public static final String LESS = "<";
    public static final String LESS_EQUAL = "<=";
    public static final String LEFT_S_BRACKETS = "(";
    public static final String RIGHT_S_BRACKETS = ")";
    public static final String APOSTROPHE = "'";
    public static final String QUESTION_MARK = "?";
    public static final String QUESTION_MARK_SQL = "?sql=";
    public static final String ASTERISK = "*";
    public static final String L_PERCENT = "'%";
    public static final String R_PERCENT = "%'";
    public static final String COLON = ":";
    public static final String BAR = "|";
    public static final String SEMI = ";";
    public static final String NEWLINE = "\r\n";
    public static final String TAB = "\t";
    public static final String UNDERLINE = "_";
    public static final String EMPTY_STR = "";
    // 构造sql相关
    public static final String NONE = "无";
    public static final String TRUE = "true";
    public static final String FALSE = "false";
    public static final String BETWEEN = "[]";
    public static final String IN = "in";
    public static final String NOT_IN = "not in";
    public static final String LIKE = " like ";
    public static final String NOT_LIKE = " not like ";
    public static final String IS_NULL = " is null";
    public static final String OR = "OR";
    public static final String OR_SPACE = " OR ";
    public static final String AND = "AND";
    public static final String AND_SPACE = " AND ";
    public static final String APOSTROPHE_COMMA = "','";
    public static final String COUNT_ASTERISK = "count(*) as cnt";

}
