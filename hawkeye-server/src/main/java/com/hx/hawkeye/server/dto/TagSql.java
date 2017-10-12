package com.hx.hawkeye.server.dto;

import com.hx.hawkeye.server.util.GlobalConstants;
import org.apache.commons.lang.StringUtils;

import java.io.Serializable;

public class TagSql implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	public StringBuffer sqlFrom= new StringBuffer();

	/**
	 * 拼接的语句
	 * @param column   列名
	 * @param conditions   条件
	 * @param type   类型
	 * @param content   列的类容
	 * @return
	 */
	public static String inBuildSql(String conditions , String column, String type, String content , boolean format)  {

		StringBuffer s = new StringBuffer();

		s.append(conditions);
		s.append("(");
		s.append(GlobalConstants.SPACE);

		if(type.equalsIgnoreCase("1") ||type.equalsIgnoreCase("4")){
			s.append(column);
			s.append(GlobalConstants.SPACE);
			s.append("IN");
			s.append(GlobalConstants.SPACE);
			s.append("(");
			if(StringUtils.isNotBlank(content)){
				String[] con = content.split(",");
				if(con!= null && con.length>0){
					for (String string : con) {
						s.append("'"+string+"' ,");
					}
					s.deleteCharAt(s.length()-1);
				}
			}
			s.append(")");

		}else if(type.equalsIgnoreCase("2")){

			if(StringUtils.isNotBlank(content)){
				String[] con = content.split(",");
				if(con !=null && con.length>0){
					for (int i = 0; i < con.length; i++) {
						if(i!=0){
							s.append(GlobalConstants.SPACE);
							s.append("OR");
							s.append(GlobalConstants.SPACE);
							s.append(column);
							s.append(GlobalConstants.SPACE);
						}else{
							s.append(column);
							s.append(GlobalConstants.SPACE);
						}
						s.append("LIKE");
						s.append(GlobalConstants.SPACE);
						s.append("'%"+con[i]+"%'");
					}
				}
			}
		}else if(type.equalsIgnoreCase("3")){
			if(StringUtils.isNotBlank(content)){
				String[] array = content.split(",");
				if(array.length >1){
					s.append(column);
					s.append(GlobalConstants.SPACE);
					if(format){
						s.append(">=").append("'"+array[0].replace("-", "")+"'");
					}else{
						s.append(">=").append("'"+array[0] + "'");
					}

					s.append(GlobalConstants.SPACE);
					s.append("AND");
					s.append(GlobalConstants.SPACE);
					s.append(column);
					if(format){
						s.append("<=").append("'"+array[1].replace("-", "")+"'");
					}else{
						s.append("<=").append("'"+array[1] + "'");
					}

				}
			}

		}
		s.append(")");
		return s.toString().trim();
	}


	public static String exBuildSql(String conditions , String column, String type, String content , boolean format)  {

		StringBuffer s = new StringBuffer();

		s.append(conditions);
		s.append("(");
		s.append(GlobalConstants.SPACE);
		if(type.equalsIgnoreCase("1") ||type.equalsIgnoreCase("4")){
			s.append(column);
			s.append(GlobalConstants.SPACE);
			s.append("NOT IN");
			s.append(GlobalConstants.SPACE);
			s.append("(");
			if(StringUtils.isNotBlank(content)){
				String[] con = content.split(",");
				if(con!= null && con.length>0){
					for (String string : con) {
						s.append("'"+string+"' ,");
					}
					s.deleteCharAt(s.length()-1);
				}
			}
			s.append(")");

		}else if(type.equalsIgnoreCase("2")){

			if(StringUtils.isNotBlank(content)){
				String[] con = content.split(",");
				if(con !=null && con.length>0){
					for (int i = 0; i < con.length; i++) {
						if(i!=0){
							s.append(GlobalConstants.SPACE);
							s.append("OR");
							s.append(GlobalConstants.SPACE);
							s.append(column);
							s.append(GlobalConstants.SPACE);
						}else{
							s.append(column);
							s.append(GlobalConstants.SPACE);
						}
						s.append("NOT LIKE");
						s.append(GlobalConstants.SPACE);
						s.append("'%"+con[i]+"%'");
					}
				}
			}
		}else if(type.equalsIgnoreCase("3")){

			if(StringUtils.isNotBlank(content)){
				String[] array = content.split(",");
				if(array.length >1){
					s.append(column);
					s.append(GlobalConstants.SPACE);
					if(format){
						s.append("<=").append("'" +array[0].replace("-", "") + "'");
					}else{
						s.append("<=").append("'" +array[0] + "'");
					}
					s.append(GlobalConstants.SPACE);
					s.append("AND");
					s.append(GlobalConstants.SPACE);
					s.append(column);
					if(format){
						s.append(">=").append("'"+array[1].replace("-", "") + "'");
					}else{
						s.append(">=").append("'"+array[1] + "'");
					}

				}
			}

		}
		s.append(")");
		return s.toString().trim();
	}

}
