package com.hx.hawkeye.server.util;

import org.apache.commons.codec.binary.Base64;

public class Base64Util {
    public static String encode(String source) {
        return Base64.encodeBase64String(source.getBytes());
    }

    public static String decode(String source) {
        return new String(Base64.decodeBase64(source));
    }
}
