package com.costSimu.Api.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.costSimu.Api.model.Role;
import com.costSimu.Api.model.enumerate.RoleEnum;

@Repository

public interface RoleRepository extends CrudRepository<Role, Integer> {
    Optional<Role> findByName(RoleEnum roleName);
}

