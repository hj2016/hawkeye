package com.hx.hawkeye.orm.domain.tag;

import javax.persistence.*;
import java.util.Date;

import static javax.persistence.GenerationType.IDENTITY;


@Entity
@Table(name = "tag")
public class Tag {


    // 主键
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private long id;

    // tag_id
    @Column(name = "tag_id")
    private String tagId;

    // tableName
    @Column(name = "table_name")
    private String tableName;

    // column_name
    @Column(name = "column_name")
    private String columnName;

    // data_src
    @Column(name = "data_src")
    private String dataSrc;

    // choice_type
    @Column(name = "choice_type")
    private String choiceType;

    // 标签名
    @Column(name = "name")
    private String name;


    // 值类型, 0: 字符单值型, 1: 字符多值型
    @Column(name = "value_type")
    private String valueType;


    // 标签拥有的值, long text类型
    @Column(name = "val_kvs", length = 16777216)
    private String valKvs;

    // 标签类型
    @Column(name = "tag_type_id")
    private String tagTypeId;

    // 创建时间
    @Column(name = "create_time")
    private Date createTime;

    // 更新时间
    @Column(name = "update_time")
    private Date updateTime;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getValueType() {
        return valueType;
    }

    public void setValueType(String valueType) {
        this.valueType = valueType;
    }


    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTagId() {
        return tagId;
    }

    public void setTagId(String tagId) {
        this.tagId = tagId;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public String getDataSrc() {
        return dataSrc;
    }

    public void setDataSrc(String dataSrc) {
        this.dataSrc = dataSrc;
    }

    public String getChoiceType() {
        return choiceType;
    }

    public void setChoiceType(String choiceType) {
        this.choiceType = choiceType;
    }

    public String getValKvs() {
        return valKvs;
    }

    public void setValKvs(String valKvs) {
        this.valKvs = valKvs;
    }

    public String getTagTypeId() {
        return tagTypeId;
    }

    public void setTagTypeId(String tagTypeId) {
        this.tagTypeId = tagTypeId;
    }
}
