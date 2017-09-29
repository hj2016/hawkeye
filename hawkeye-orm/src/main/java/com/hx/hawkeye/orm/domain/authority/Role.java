package com.hx.hawkeye.orm.domain.authority;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "role")
    private String role;
    @Column(name = "info")
    private String info;

    @OneToMany(mappedBy = "role", fetch = FetchType.EAGER)
    private Set<UserRole> userRoles = new HashSet<UserRole>(0);

    @ManyToMany(mappedBy = "roles", fetch = FetchType.EAGER)
    private Set<Resource> menus = new HashSet<Resource>(0);

    // @ManyToMany()
    // @JoinTable(name = "login_user_authority", joinColumns = @JoinColumn(name
    // = "role_id", referencedColumnName = "id"), inverseJoinColumns =
    // @JoinColumn(name = "user_id"))
    // private Set<User> users= new HashSet<User>(0);

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Set<Resource> getMenus() {
        return menus;
    }

    public void setMenus(Set<Resource> menus) {
        this.menus = menus;
    }

    public Set<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<UserRole> userRoles) {
        this.userRoles = userRoles;
    }

    // public Set<User> getUsers() {
    // return users;
    // }
    //
    // public void setUsers(Set<User> users) {
    // this.users = users;
    // }
}
