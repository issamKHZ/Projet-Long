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
		
		if (serviceName.equals("Amazon CloudWatch")) {
			return this.calculCloudWatch();			
		} else if (serviceName.equals("Amazon Managed Service for Prometheus")) {
			return this.calculPrometheus(serviceName, props);
		} else if (serviceName.equals("VPN Connection feature")) { //todo
			System.out.println(serviceName);
			return this.calculVPN(serviceName, props);			
		} else if (serviceName.equals("Elastic Load Balancing")) { 
			return this.calculLB(serviceName, props);
		} else {
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
		        } else if (value instanceof String) {
		        	HashMap<String,Double> choice = multipProp.get(key);
		        	price = choice.get((String) value);
		        	results.add(price);
		        }	   
			}
			double totalPrice = results.stream().mapToDouble(Double::doubleValue).sum();
		    return totalPrice;	
		}
	}
	
	public Double calculCloudWatch() {
		return 0.0;
	}
	
	public Double calculPrometheus(String serviceName, HashMap<String, Object> props) {
		
		Services service = serviceRepo.findItemByName(serviceName);
		HashMap<String, Double> directProp = service.getDirectProprieties();
		
		List<Double> results = new ArrayList<>();
		String key;
		
		// calcul Metric sample ingestionn 
		key = (String) props.get("Select Metric");
		double n1;
		if (key.equals("Active Series")) {
			n1 = (((Integer) props.get("Average active time series")).doubleValue() * 2628000) / ((Integer) props.get("Avg Collection Interval (in seconds)")).doubleValue();			
		} else {
			n1 = (((Integer) props.get("Ingestion Rate")).doubleValue() * 2628000);
		}
		
		double comp = 2000000000;
		if (n1 <= comp) {
			results.add(n1 * 0.00000009);
		} else {
			results.add(comp * 0.00000009 + (n1 - comp) * 0.000000035);
		}
		
		// calcul storage : 
		key = "Retention Period (in days)";
		results.add(((Integer) props.get(key)).doubleValue() * directProp.get(key));
		
		// clacul monitoring
		double dashboardUsers = ((Integer) props.get("Average Number of Dashboard users per day")).doubleValue();
        double avgQueriesPerUser = ((Integer) props.get("Average number of queries per day per dashboard user")).doubleValue();
        double daysPerMonth = 30.42;
        double avgSamplesPerQueryMonitoring = ((Integer) props.get("Average samples per query for Monitoring queries")).doubleValue();
        double avgSamplesPerQueryAlerting = ((Integer) props.get("Average samples per query for Alerting queries")).doubleValue();
        double prometheusRules = ((Integer) props.get("Number of Prometheus rules")).doubleValue();
        double avgRuleExecutionInterval = ((Integer) props.get("Average rule execution interval (in seconds)")).doubleValue();
        
        double totalMonitoringSamples = calculateTotalMonitoringSamplesP(dashboardUsers, avgQueriesPerUser, daysPerMonth, avgSamplesPerQueryMonitoring);
        double totalAlertingSamples = calculateTotalAlertingSamplesP(prometheusRules, avgRuleExecutionInterval, avgSamplesPerQueryAlerting);
        double totalQuerySamples = calculateTotalQuerySamplesP(totalMonitoringSamples, totalAlertingSamples);
        double totalCost = calculateTotalCostP(totalQuerySamples);
        
        results.add(totalCost);
        // calcul Managed Collector 
        key = "Number of collectors";
        results.add(((Integer) props.get(key)).doubleValue() * directProp.get(key));
        
        key = "Number of Samples collected-Per second";
        if (props.containsKey(key)) {
        	results.add(((Integer) props.get(key)).doubleValue() * directProp.get(key));
        } else {
        	key = "Number of Samples collected-Per month";
        	results.add(((Integer) props.get(key)).doubleValue() * directProp.get(key));
        }                
        return results.stream().mapToDouble(Double::doubleValue).sum();
	}		
    
    public Double calculVPN(String serviceName, HashMap<String, Object> props) {
    	Services service = serviceRepo.findItemByName(serviceName);
		HashMap<String, Double> directProp = service.getDirectProprieties();
		HashMap<String, HashMap<String, Double>> multipProp = service.getMultipleProprieties();
		
		List<Double> results = new ArrayList<>();
		
		// Site-to-Site VPN settings
		
		double siteCnx = ((Integer) props.get("Number of Site-to-Site VPN Connections")).doubleValue();
		double duration;
		String key = "Average duration for each connection";
		if (props.containsKey(key + "-hours per day")) {
			duration = ((Integer) props.get(key + "-hours per day")).doubleValue() * directProp.get("hours per day");
		} else if (props.containsKey(key + "-hours per week")) {
			duration = ((Integer) props.get(key + "-hours per week")).doubleValue() * directProp.get("hours per week");
		} else {
			duration = ((Integer) props.get(key + "-hours per month")).doubleValue() * directProp.get("hours per month");
		}
		
		results.add(siteCnx * duration * directProp.get("Number of Site-to-Site VPN Connections"));
		
		// Client VPN settings 
		results.add(((Integer) props.get("Number of subnet associations")).doubleValue() * directProp.get("Number of subnet associations"));
		
		double arg1, arg2, arg3;
		arg1 = ((Integer) props.get("Value (per day)")).doubleValue();
		arg2 = ((Integer) props.get("Average duration for each connection (hours per day)")).doubleValue();
		arg3 = ((Integer) props.get("Working days per month")).doubleValue();
		
		results.add(arg1 * arg2 * arg3 * 0.05);
		
		return results.stream().mapToDouble(Double::doubleValue).sum();
    }
    
    public Double calculLB(String serviceName, HashMap<String, Object> props) {
    	Services service = serviceRepo.findItemByName(serviceName);
		HashMap<String, Double> directProp = service.getDirectProprieties();
		HashMap<String, HashMap<String, Double>> multipProp = service.getMultipleProprieties();
		
		String field;
		String unit;
		double val;
		double arg1;
		double arg2;
		
		double[] args = {0.0, 0.0, 0.0, 0.0};
		HashMap<String, HashMap<String, Double>> filtredData = new HashMap<String, HashMap<String, Double>>();
		
		for (Map.Entry<String, Object> entry : props.entrySet()) {			
			String key = entry.getKey();
	        Object value = entry.getValue();	
	        
	        if (key.contains("-")) {
	        	field = key.split("-")[0];
	        	unit = key.split("-")[1];
	        	val = ((Integer) value).doubleValue();
	        	filtredData.put(field, innerMap(unit, val));
	        }	        
		}		
		
		// calcul args :
		//arg 0		
		String secondkey = filtredData.get("Processed bytes (Lambda functions as targets)").keySet().iterator().next();		
		arg1 = filtredData.get("Processed bytes (Lambda functions as targets)").values().iterator().next() * multipProp.get("Processed bytes (Lambda functions as targets)").get(secondkey);		
		secondkey = filtredData.get("Processed bytes (EC2 Instances and IP addresses as targets)").keySet().iterator().next();
		arg2 = filtredData.get("Processed bytes (EC2 Instances and IP addresses as targets)").values().iterator().next() * multipProp.get("Processed bytes (EC2 Instances and IP addresses as targets)").get(secondkey);
		
		args[0] = calculateprocessedBytesLCUsLB(arg1, arg2);
		
		//arg 1
		secondkey = filtredData.get("Average number of new connections per ALB").keySet().iterator().next();
		arg1 = filtredData.get("Average number of new connections per ALB").values().iterator().next() * multipProp.get("Average number of new connections per ALB").get(secondkey);
		args[1] = calculateNewConnectionsLCUs(arg1);
    	
    	
    	//arg 2
    	
    	secondkey = filtredData.get("Average connection duration").keySet().iterator().next();
    	arg2 = filtredData.get("Average connection duration").values().iterator().next() * multipProp.get("Average connection duration").get(secondkey);
    	args[2] = calculateActiveConnections(arg1, arg2);
    	
    	//arg 3
    	arg1 = ((Integer) props.get("Average number of requests per second per ALB")).doubleValue();    			
    	arg2 = ((Integer) props.get("Average number of rule evaluations per request")).doubleValue();
    	args[3] = calculateRuleEvaluationLCUs(arg1, arg2);
    	
    	//max
    	double max = findMax(args);
    	double n1 = ((Integer) props.get("Number of Application Load Balancers")).doubleValue() * max * directProp.get("LCU price per hour") * 730;
    	double n2 = ((Integer) props.get("Number of Application Load Balancers")).doubleValue() * directProp.get("Number of Application Load Balancers");
    	return n1 + n2;
    }
    
    
    private static double calculateprocessedBytesLCUsLB(double pblLambda, double pblEC2) {
    	return pblLambda + pblEC2;
    }
    
    private static double calculateNewConnectionsLCUs(double result) {
    	return result / 25.0;
    }
    
    private static double calculateActiveConnections (double cnxALB, double duration) {
    	return (cnxALB * duration) / 3000;
    }
    
    private static double calculateRuleEvaluationLCUs(double requestsPerSecond, double ruleEvaluationsPerRequest) {
    	double maxFreeRules = 10.0;
    	double paidRulesPerRequest = Math.max(ruleEvaluationsPerRequest - maxFreeRules, 0);
    	double totalRulesEvaluatedPerSecond = paidRulesPerRequest * requestsPerSecond;
    	double ruleEvaluationLCUs = totalRulesEvaluatedPerSecond / 1000;
    	return ruleEvaluationLCUs;    	
    }
    
    private static double findMax(double[] numbers) {
    	if (numbers.length == 0) {
            throw new IllegalArgumentException("Aucun nombre fourni");
        }

        double max = numbers[0];

        for (int i = 1; i < numbers.length; i++) {
            max = Math.max(max, numbers[i]);
        }
        return max;
    }

    private static double calculateTotalMonitoringSamplesP(double dashboardUsers, double avgQueriesPerUser, double daysPerMonth, double avgSamplesPerQueryMonitoring) {
        return dashboardUsers * avgQueriesPerUser * daysPerMonth * avgSamplesPerQueryMonitoring;
    }

    private static double calculateTotalAlertingSamplesP(double prometheusRules, double avgRuleExecutionInterval, double avgSamplesPerQueryAlerting) {
        double executionsPerMonth = 60.0 / avgRuleExecutionInterval * 60 * 24 * 30.42;
        return prometheusRules * executionsPerMonth * avgSamplesPerQueryAlerting;
    }

    private static double calculateTotalQuerySamplesP(double totalMonitoringSamples, double totalAlertingSamples) {
        return totalMonitoringSamples + totalAlertingSamples;
    }

    private static double calculateTotalCostP(double totalQuerySamples) {
        return totalQuerySamples * 0.0000000001;
    }
    
    public HashMap<String, Double> innerMap(String key, Double val) {
		HashMap<String, Double> map = new HashMap<String, Double>();
		map.put(key, val);
		return map;
	}
}
