package com.costSimu.Api.model;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.*;
import java.util.*;

@Document("Pricing")
public class Pricing {
	
	
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public String getAppName() {
		return appName;
	}
	public void setAppName(String appName) {
		this.appName = appName;
	}


	@Id
	private String id;
	
	private String serviceName;
	private String appName;
	private double totalPrice;
	private HashMap<String, Double> serviceApaye;

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public double getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}
	public HashMap<String, Double> getServiceApaye() {
		return serviceApaye;
	}
	public void setServiceApaye(HashMap<String, Double> serviceApaye) {
		this.serviceApaye = serviceApaye;
	}
	
	
	public Pricing(double totalPrice, HashMap<String, Double> serviceApaye, String serviceName, String appName) {
		super();
		this.appName = appName;
		this.serviceName = serviceName;
		this.totalPrice = totalPrice;
		this.serviceApaye = serviceApaye;
	}	
	
}
