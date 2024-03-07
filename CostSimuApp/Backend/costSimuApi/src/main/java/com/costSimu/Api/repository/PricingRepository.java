package com.costSimu.Api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.Query;

import com.costSimu.Api.model.Pricing;


@Repository
public interface PricingRepository extends MongoRepository<Pricing, String>{

	@Query("{name:'?0'}")
	Pricing findItemByName(String name);
	
	Long deletePricingByName(String name);
	
}