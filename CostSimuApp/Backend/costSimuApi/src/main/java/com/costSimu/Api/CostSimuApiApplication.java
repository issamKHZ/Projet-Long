package com.costSimu.Api;

import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.*;

import com.costSimu.Api.model.Services;
import com.costSimu.Api.repository.ServicesRepository;

@SpringBootApplication
public class CostSimuApiApplication implements CommandLineRunner{

	@Autowired
	ServicesRepository serviceRepo;
	
	public static void main(String[] args) {
		SpringApplication.run(CostSimuApiApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {
		serviceRepo.deleteAll();
		HashMap<String, Double> prop1 = new HashMap<String, Double>();
		prop1.put("number of eks cluster", 75.00);
		HashMap<String, HashMap<String, Double>> prop2 = new HashMap<String, HashMap<String, Double>>();
		
		Services service1 = new Services("Eks Cluster Pricing", prop1, prop2);
		
		serviceRepo.save(service1);
	}

}
