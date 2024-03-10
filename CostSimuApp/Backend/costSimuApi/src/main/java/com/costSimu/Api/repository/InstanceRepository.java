package com.costSimu.Api.repository;

import java.util.*;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.costSimu.Api.model.Instance;


@Repository
public interface InstanceRepository extends MongoRepository<Instance, String> {

	@Query("{name:'?0'}")
	Instance findItemByInstanceType(String instanceType);
	
    @Query("{memory:?0, vCPU:?1, networkPerformance:?2, operatingSystem:?3}")
	List<Instance> findInstancesByAttributes(String memory, String vCPUs, String networkPerformance, String opSystem);
	
	List<Instance> findAllByMemory(String memory);
}