package com.costSimu.Api.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.costSimu.Api.model.User;




@Repository
public interface UserRepository extends CrudRepository<User, Long> {
	
    Optional<User> findByAppname(String username);
    
    Boolean existsByAppname(String username);   
}
