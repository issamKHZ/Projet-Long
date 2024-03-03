package com.costSimu.Api.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.costSimu.Api.Utils.JwtUtils;
import com.costSimu.Api.Utils.PropRequest;
import com.costSimu.Api.model.Services;
import com.costSimu.Api.repository.ServicesRepository;
import com.costSimu.Api.service.CalculService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "*")
@RestController	
@RequestMapping(path="/estim")
public class CalculController {
	
	@Autowired
	CalculService calculeService;
	
	@Autowired
	JwtUtils jwtUtils;
	
	@Autowired
	ServicesRepository serviceRepo;
	
    ObjectMapper objectMapper = new ObjectMapper();
	
	@PostMapping(path="/calcul")
	public @ResponseBody ResponseEntity<Double> calculerPrice (HttpServletRequest request) {			
		JsonNode propsNode;
		Double price = 0.0;
		try {
			propsNode = objectMapper.readTree(request.getParameter("props"));			
			HashMap<String, Object> propsMap = this.JsonToMap(propsNode);
			String appname = request.getParameter("appName");
			System.out.println("controller propsMap : " + propsMap);
			System.out.println("controller appname : " + appname);
			price = calculeService.calculateServicePrice(appname, propsMap);
		} catch (JsonProcessingException e) {			
			e.printStackTrace();
		}
		String token = jwtUtils.extractJwtTokenFromHeader(request.getHeader("Authorization"));										    	   	  		
		return new ResponseEntity<Double>(price, HttpStatus.OK);
	}
	
	public HashMap<String, Object> JsonToMap(JsonNode propsNode) {
		HashMap<String, Object> propsMap = new HashMap<>();

        // Parcourir chaque élément de la liste
        for (JsonNode propNode : propsNode) {
            String field = propNode.get("field").asText();
            String valueNode = propNode.get("value").asText();

            
            // Convertir la valeur en fonction de son type
            try {
            	int nombre = Integer.parseInt(valueNode);
            	propsMap.put(field, nombre);
            } catch (NumberFormatException e) {
            	propsMap.put(field, valueNode);
            }
            
        }
        System.out.println("props receivied are : " + propsMap);
        return propsMap;
	}
	
	
	
	
}
