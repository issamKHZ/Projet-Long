package com.costSimu.Api.controller;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.costSimu.Api.Utils.JwtUtils;
import com.costSimu.Api.Utils.PropRequest;
import com.costSimu.Api.model.Pricing;
import com.costSimu.Api.model.Services;
import com.costSimu.Api.repository.PricingRepository;
import com.costSimu.Api.repository.ServicesRepository;
import com.costSimu.Api.service.CalculService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "*")
@RestController	
@RequestMapping(path="/eks/estim")
public class CalculController {
	
	@Autowired
	CalculService calculeService;
	
	@Autowired
	JwtUtils jwtUtils;
	
	@Autowired
	ServicesRepository serviceRepo;
	
	@Autowired
	PricingRepository pricingRepo;
	
    ObjectMapper objectMapper = new ObjectMapper();
	
	@PostMapping(path="/calcul")
	public @ResponseBody ResponseEntity<Double> calculerPrice (HttpServletRequest request) {			
		JsonNode propsNode;
		Double price = 0.0;
		try {
			propsNode = objectMapper.readTree(request.getParameter("props"));			
			HashMap<String, Object> propsMap = this.JsonToMap(propsNode);
			String appname = request.getParameter("appName");			
			price = calculeService.calculateServicePrice(appname, propsMap);
		} catch (JsonProcessingException e) {			
			e.printStackTrace();
		}
		String token = jwtUtils.extractJwtTokenFromHeader(request.getHeader("Authorization"));										    	   	  		
		return new ResponseEntity<Double>(price, HttpStatus.OK);
	}
	
	public HashMap<String, Object> JsonToMap(JsonNode propsNode) {
		HashMap<String, Object> propsMap = new HashMap<>();
		String field;

        // Parcourir chaque élément de la liste
        for (JsonNode propNode : propsNode) {
        	if (propNode.get("field") != null) {
        		field = propNode.get("field").asText();
        	} else {
        		field = propNode.get("name").asText();
        	}
            String valueNode = propNode.get("value").asText();

            
            // Convertir la valeur en fonction de son type
            try {
            	int nombre = Integer.parseInt(valueNode);
            	propsMap.put(field, nombre);
            } catch (NumberFormatException e) {
            	propsMap.put(field, valueNode);
            }
            
        }
        return propsMap;
	}
	
	@PostMapping(path="/stocker")
	public @ResponseBody ResponseEntity<String> stockerEksPricing (HttpServletRequest request) {
		JsonNode propsNode;
		try {
			propsNode = objectMapper.readTree(request.getParameter("serivcesApaye"));
			HashMap<String, Object> propsMap = this.JsonToMap(propsNode);
			double totalPrice = Double.parseDouble(request.getParameter("totalPrice"));
			String appName = request.getParameter("appName");
			HashMap<String, Double> doublePropsMap = new HashMap<>();

			for (Map.Entry<String, Object> entry : propsMap.entrySet()) {					
		        doublePropsMap.put(entry.getKey(), Double.parseDouble(entry.getValue().toString()));			
			}
			
			Pricing eksPricing = new Pricing(totalPrice, doublePropsMap, "eks", appName);			
			pricingRepo.deleteByAppNameAndServiceName(appName, "eks");
			pricingRepo.save(eksPricing);
			return new ResponseEntity("ok", HttpStatus.OK);
		} catch (JsonProcessingException e) {		
			e.printStackTrace();
		}			
		
		return new ResponseEntity("error", HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping(path="/stored")
	public @ResponseBody ResponseEntity<String> recuperateEksPricing (HttpServletRequest request) {
		String appName = request.getParameter("appName");
		String serviceName = request.getParameter("serviceName");
		
		Pricing pricing = pricingRepo.findItemByAppNameAndServiceName(appName, serviceName);
		
		return new ResponseEntity(pricing, HttpStatus.OK);
	}
	
}
