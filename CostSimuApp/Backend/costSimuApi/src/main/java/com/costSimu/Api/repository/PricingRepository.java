package com.costSimu.Api.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.DeleteQuery;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.Query;

import com.costSimu.Api.model.Instance;
import com.costSimu.Api.model.Pricing;


@Repository
public interface PricingRepository extends MongoRepository<Pricing, String>{

	@Query("{name:'?0'}")
	Pricing findItemByAppName(String name);
	
	Long deletePricingByAppName(String name);
	
	@DeleteQuery("{ 'appName': ?0, 'serviceName': ?1 }")
    void deleteByAppNameAndServiceName(String appName, String serviceName);
	
	@Query("{ 'appName': ?0, 'serviceName': ?1 }")
    Pricing findItemByAppNameAndServiceName(String appName, String serviceName);

}