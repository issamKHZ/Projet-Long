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
		// EKS service
		HashMap<String, Double> Sprop1 = new HashMap<String, Double>();
		Sprop1.put("number of eks cluster", 75.00);
		HashMap<String, HashMap<String, Double>> Mprop1 = new HashMap<String, HashMap<String, Double>>();
		
		Services eks = new Services("Eks Cluster Pricing", Sprop1, Mprop1);
		
		serviceRepo.save(eks);
		
		
		// AWS KEY MANAGEMENT
		HashMap<String, Double> Sprop2 = new HashMap<String, Double>();
		HashMap<String, HashMap<String, Double>> Mprop2 = new HashMap<String, HashMap<String, Double>>();
		Sprop2.put("Number of customer managed Customer Master Keys (CMK)", 1.00);
		Sprop2.put("Number of symmetric requests", 0.000003);
		Sprop2.put("Number of asymmetric requests except RSA 2048", 0.000015);
		Sprop2.put("Number of asymmetric requests involving RSA 2048", 0.000003);
		Sprop2.put("Number of ECC GenerateDataKeyPair requests", 0.00001);
		Sprop2.put("Number of RSA GenerateDataKeyPair requests", 0.0012);
		
		Services awsKeys = new Services("AWS Key Management Service", Sprop2, Mprop2);
		
		serviceRepo.save(awsKeys);
		
		// Prometheus
		HashMap<String, Double> Sprop3 = new HashMap<String, Double>();
		HashMap<String, HashMap<String, Double>> Mprop3 = new HashMap<String, HashMap<String, Double>>();
		Sprop3.put("Retention Period (in days)", 0.022674665);
		Sprop3.put("Number of collectors", 29.2);
		Sprop3.put("Number of Samples collected-Per second", 0.007884);
		Sprop3.put("Number of Samples collected-Per month", 0.000000003);
		
		Services prometheus = new Services("Amazon Managed Service for Prometheus", Sprop3, Mprop3);
		serviceRepo.save(prometheus);
		
		//LoadBalancing
		HashMap<String, Double> Sprop4 = new HashMap<String, Double>();
		HashMap<String, HashMap<String, Double>> Mprop4 = new HashMap<String, HashMap<String, Double>>();
		
		Sprop4.put("Number of Application Load Balancers", 16.425);
		
		
		Sprop4.put("LCU price per hour", 0.008);
		
		HashMap<String, Double> map = new HashMap<String, Double>();
		map.put("GB per hour", 2.5);
		map.put("GB per month", 0.00342465);
		map.put("TB per hour", 2560.0);
		map.put("TB per month", 3.5068416);
		
		Mprop4.put("Processed bytes (Lambda functions as targets)", map);		
		
		map = new HashMap<String, Double>();
		map.put("GB per hour", 1.0);
		map.put("GB per month", 0.00136986);
		map.put("TB per hour", 1024.0);
		map.put("TB per month", 1.40273664);
		
		Mprop4.put("Processed bytes (EC2 Instances and IP addresses as targets)", map);		
				
		map = new HashMap<String, Double>();
		map.put("per second", 1.0);
		map.put("per minute", 0.01666666666);
		
		Mprop4.put("Average number of new connections per ALB", map);
		
		map = new HashMap<String, Double>();
		map.put("second", 1.0);
		map.put("minute", 60.0);
		Mprop4.put("Average connection duration", map);
		
		
		Services LB = new Services("Elastic Load Balancing", Sprop4, Mprop4);
		serviceRepo.save(LB);
		
		//VPN 
		HashMap<String, Double> Sprop5 = new HashMap<String, Double>();
		HashMap<String, HashMap<String, Double>> Mprop5 = new HashMap<String, HashMap<String, Double>>();
		
		Sprop5.put("Number of Site-to-Site VPN Connections", 0.05);
		Sprop5.put("hours per day", 30.4166666667);
		Sprop5.put("hours per week", 4.34523809524);
		Sprop5.put("hours per month", 1.0);
		Sprop5.put("Number of subnet associations", 73.0);
		
		Services VPN = new Services("VPN Connection feature", Sprop5, Mprop5);
		serviceRepo.save(VPN);
	}
	
	public HashMap<String, Double> innerMap(String key, Double val) {
		HashMap<String, Double> map = new HashMap<String, Double>();
		map.put(key, val);
		return map;
	}

}
