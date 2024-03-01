package com.costSimu.Api.model;

import com.costSimu.Api.model.enumerate.*;

import jakarta.persistence.*;


@Entity
@Table(name = "app_role")
public class Role {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

	@Enumerated(EnumType.STRING)
    private RoleEnum name;
    
    
    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public RoleEnum getName() {
		return name;
	}

	public void setName(RoleEnum name) {
		this.name = name;
	}
	
}
