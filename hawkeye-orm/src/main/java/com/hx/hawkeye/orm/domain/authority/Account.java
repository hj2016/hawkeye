package com.hx.hawkeye.orm.domain.authority;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;


@Entity
@Table(name = "account")
public class Account {

    // 帐号
    @Id
    @Column(name = "account", unique = true, nullable = false)
    private String account;

    // 每个账户配置的私钥, 根据参数信息加上私钥才能成功访问接口
    @Column(name = "private_key")
    private String privateKey;

    // 账户名称
    @Column(name = "account_name")
    private String accountName;

    // 账户联系邮箱
    @Column(name = "email")
    private String email;

    // 账户联系mobile
    @Column(name = "mobile")
    private String mobile;

    // 创建时间
    @Column(name = "create_time")
    private Date createTime;

    // 更新时间
    @Column(name = "update_time")
    private Date updateTime;

    // 状态, 是否可用, 1:可用 0:不可用
    @Column(name = "status")
    private Integer status;

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPrivateKey() {
        return privateKey;
    }

    public void setPrivateKey(String privateKey) {
        this.privateKey = privateKey;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
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

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
