package com.costSimu.Api.model;

import java.util.*;

import jakarta.persistence.*;

@Entity
@Table(name="AppUser")
public class User {	

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
    private String appname;
    
    private String password;
    
    private int price;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(  name = "app_roles", 
          joinColumns = @JoinColumn(name = "app_id"), 
          inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<Role>();
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAppname() {
		return appname;
	}

	public void setAppname(String appName) {
		this.appname = appName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}
    
    
}
