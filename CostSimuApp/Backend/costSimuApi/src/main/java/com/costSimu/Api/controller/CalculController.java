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
		try {
			propsNode = objectMapper.readTree(request.getParameter("props"));
			System.out.println("props is : " + propsNode);
			HashMap<String, Object> propsMap = this.JsonToMap(propsNode);
			System.out.println("porpsMap is : " + propsMap);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String token = jwtUtils.extractJwtTokenFromHeader(request.getHeader("Authorization"));
		//String appname = jwtUtils.getUsernameFromJWT(token);						
			    	   	    
		//Double price = calculeService.calculateServicePrice(appname, props);
		return new ResponseEntity<Double>(0.0, HttpStatus.OK);
	}
	
	public HashMap<String, Object> JsonToMap(JsonNode propsNode) {
		HashMap<String, Object> propsMap = new HashMap<>();

        // Parcourir chaque élément de la liste
        for (JsonNode propNode : propsNode) {
            String field = propNode.get("field").asText();
            JsonNode valueNode = propNode.get("value");

            // Convertir la valeur en fonction de son type
            Object value;
            if (valueNode.isInt()) {
                value = valueNode.asInt();
            } else if (valueNode.isTextual()) {
                value = valueNode.asText();
            } else {
                // Gérer d'autres types au besoin
                value = null;
            }

            // Mettre la paire clé/valeur dans le HashMap
            propsMap.put(field, value);
        }
        return propsMap;
	}
	
	
	
	
}
