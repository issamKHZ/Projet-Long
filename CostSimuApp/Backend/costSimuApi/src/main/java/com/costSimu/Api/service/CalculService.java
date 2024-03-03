package com.costSimu.Api.service;

import org.springframework.stereotype.Service;

import com.costSimu.Api.model.Services;
import com.costSimu.Api.repository.ServicesRepository;

import java.util.*;

import org.springframework.beans.factory.annotation.*;

@Service
public class CalculService {
	
	@Autowired 
	private ServicesRepository serviceRepo;
	
	public Double calculateServicePrice(String serviceName, HashMap<String, Object> props) {
		Services service = serviceRepo.findItemByName(serviceName);	
		HashMap<String, Double> directProp = service.getDirectProprieties();
		HashMap<String, HashMap<String,Double>> multipProp = service.getMultipleProprieties();

		List<Double> results = new ArrayList<>();
		Double price = 0.0;
		
		for (Map.Entry<String, Object> entry : props.entrySet()) {
			String key = entry.getKey();
	        Object value = entry.getValue();
	        
	        if (value instanceof Integer) {
	        	price = directProp.get(key);
	        	results.add(((Integer) value).doubleValue() * price);	        	
	        } else if (value instanceof Integer) {
	        	HashMap<String,Double> choice = multipProp.get(key);
	        	price = choice.get((String) value);
	        	results.add(price);
	        }	   
		}
		double totalPrice = results.stream().mapToDouble(Double::doubleValue).sum();
	    return totalPrice;
	}

}
