package com.costSimu.Api.service;

import java.util.*;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.costSimu.Api.repository.InstanceRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.*;
import com.costSimu.Api.model.Instance;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class InstanceService {

    private final InstanceRepository instanceRepository;
    private final RestTemplate restTemplate;

    public InstanceService(InstanceRepository instanceRepository, RestTemplate restTemplate) {
        this.instanceRepository = instanceRepository;
        this.restTemplate = restTemplate;
    }

    public void fetchDataAndSave(String regionName) {
        // Utilisez RestTemplate pour extraire les données depuis linUrl
        String linUrl = "https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/ec2/USD/current/ec2-ondemand-without-sec-sel/"
                + regionName + "/Linux/index.json?timestamp=1639230933739";

        String linData = restTemplate.getForObject(linUrl, String.class);

        // Parsez les données JSON en objets
        List<Instance> instances = parseJsonToInstances(linData, regionName);

        // Enregistrez les instances dans la base de données
        instanceRepository.deleteAll();
        instanceRepository.saveAll(instances);
    }

    private List<Instance> parseJsonToInstances(String jsonData, String regionName) {
        List<Instance> instances = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            JsonNode jsonNode = objectMapper.readTree(jsonData);
            JsonNode regionsNode = jsonNode.get("regions");
            JsonNode regionNode = regionsNode.get(regionName);

            Iterator<JsonNode> instancesIterator = regionNode.elements();
            while (instancesIterator.hasNext()) {
                JsonNode instanceNode = instancesIterator.next();
                Instance instance = new Instance();
                
                instance.setPrice(instanceNode.get("price").asDouble());                
                instance.setvCPU(instanceNode.get("vCPU").asText());
                instance.setInstanceType(instanceNode.get("Instance Type").asText());
                instance.setMemory(instanceNode.get("Memory").asText());
                instance.setStorage(instanceNode.get("Storage").asText());
                instance.setNetworkPerformance(instanceNode.get("Network Performance").asText());
                instance.setOperatingSystem(instanceNode.get("Operating System").asText());

                instances.add(instance);
            }

        } catch (JsonProcessingException e) {
            // Gérez les erreurs de conversion
            e.printStackTrace();
        }

        return instances;
    }
}
