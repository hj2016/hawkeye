package com.hx.hawkeye.server.util;

import java.security.MessageDigest;

public class MD5Util {

    public static String md5(String s) {
        char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };

        if (null == s || "".equals(s))
            return "";

        try {
            byte[] strtemp = s.getBytes();
            MessageDigest mdtemp = MessageDigest.getInstance("MD5");
            mdtemp.update(strtemp);
            byte[] md = mdtemp.digest();
            int j = md.length;
            char str[] = new char[j * 2];
            int k = 0;
            for (int i = 0; i < j; i++) {
                byte byte0 = md[i];
                str[k++] = hexDigits[byte0 >>> 4 & 0xf];
                str[k++] = hexDigits[byte0 & 0xf];
            }
            return new String(str);
        } catch (Exception e) {
            return null;
        }
    }
}
