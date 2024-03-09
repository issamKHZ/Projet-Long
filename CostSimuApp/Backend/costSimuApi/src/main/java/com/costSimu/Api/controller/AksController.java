package com.costSimu.Api.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.costSimu.Api.model.Pricing;
import com.costSimu.Api.repository.PricingRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;



@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/aks/estim")
class AksController {
	
	ObjectMapper objectMapper = new ObjectMapper();
	
	@Autowired
	PricingRepository pricingRepo;
	
    // Prix des clusters et des instances
    private final double clusterPrice = 73; // Prix du cluster
    private final Map<String, Map<Integer, Double>> diskPrices = new HashMap<>();
    private final Map<String, Double> instancePrices = Map.of(
            "D2s V3", 0.117,
            "D4s V3", 0.234,
            "D8S V3", 0.468,
            "D165 v3", 0.936,
            "D32s v3", 1.872,
            "D485 v3", 3.744,
            "D64s v3", 2.808
    );

    // Prix des disques OS
    private void initializeDiskPrices() {
        diskPrices.put("Standard HDD", createDiskPriceMap(32, 1.54, 64, 3.01, 128, 5.89, 256, 11.33, 512, 21.76, 1024, 40.96, 2048, 81.92, 4096, 163.84, 8192, 327.68, 16384, 655.36, 32767, 1310.72));
        diskPrices.put("Premium SSD", createDiskPriceMap(4, 0.78, 8, 1.56, 16, 3.12, 32, 5.28, 64, 10.21, 128, 19.71, 256, 38.01, 512, 73.22, 1024, 135.17, 2048, 259.05, 4096, 495.57, 8192, 946.08, 16384, 1802.06, 32767, 3604.11));
        diskPrices.put("Standard SSD", createDiskPriceMap(4, 0.3, 8, 0.6, 16, 1.2, 32, 2.4, 64, 4.8, 128, 9.6, 256, 19.2, 512, 38.4, 1024, 76.8, 2048, 153.6, 4096, 307.2, 8192, 614.4, 16384, 1228.8, 32768, 2457.6));
    }


    @PostMapping("/calcul")
    public double calculatePrice(HttpServletRequest request) {    	
        initializeDiskPrices();
        // Récupérer les données du formulaire
        int numClusters = Integer.parseInt(request.getParameter("numClusters"));
        String osType = request.getParameter("osType");
        String instanceType = request.getParameter("instanceType");
        int numVMs = Integer.parseInt(request.getParameter("numVMs"));
        int numHours = Integer.parseInt(request.getParameter("numHours"));
        String managedDiskTier = request.getParameter("managedDiskTier");
        int diskSize = Integer.parseInt(request.getParameter("diskSize"));
        int numDisks = Integer.parseInt(request.getParameter("numDisks"));
                
        // Calculer le prix des clusters
        double clustersTotalPrice = numClusters * clusterPrice;

        // Calculer le prix des instances
        double instanceHourlyPrice = instancePrices.get(instanceType);
        double instancesTotalPrice = numVMs * numHours * instanceHourlyPrice;

        // Calculer le prix des disques OS
        double diskPrice = diskPrices.get(managedDiskTier).get(diskSize);
        double disksTotalPrice = numDisks * diskPrice;

        // Calculer le prix total
        double totalPrice = clustersTotalPrice + instancesTotalPrice + disksTotalPrice;

        // Renvoyer le prix total au front-end
        return totalPrice;
    }
    
    private Map<Integer, Double> createDiskPriceMap(Object... values) {
        if (values.length % 2 != 0) {
            throw new IllegalArgumentException("Les valeurs doivent être fournies par paires (clé, valeur).");
        }

        Map<Integer, Double> map = new HashMap<>();
        for (int i = 0; i < values.length; i += 2) {
            if (!(values[i] instanceof Integer)) {
                throw new IllegalArgumentException("La clé doit être de type Integer.");
            }
            if (!(values[i + 1] instanceof Double)) {
                throw new IllegalArgumentException("La valeur doit être de type Double.");
            }
            map.put((Integer) values[i], (Double) values[i + 1]);
        }
        return map;
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
	public @ResponseBody ResponseEntity<Double> stockerAksPricing (HttpServletRequest request) {
    	System.out.println("controller stockerAks in");
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
			
			Pricing aksPricing = new Pricing(totalPrice, doublePropsMap, "aks", appName);			
			pricingRepo.deleteByAppNameAndServiceName(appName, "aks");
			pricingRepo.save(aksPricing);
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
