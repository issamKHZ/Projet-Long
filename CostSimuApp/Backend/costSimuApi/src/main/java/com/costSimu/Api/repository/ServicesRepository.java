package com.costSimu.Api.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.Query;

import com.costSimu.Api.model.Services;


@Repository
public interface ServicesRepository extends MongoRepository<Services, String>{

	@Query("{name:'?0'}")
	Services findItemByName(String name);
	
}
