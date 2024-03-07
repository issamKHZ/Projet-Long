package com.costSimu.Api.model;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.*;
import java.util.*;

@Document("Pricing")
public class Pricing {
	
	
	@Id
	private String id;
	
	private String name;
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
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public Pricing(double totalPrice, HashMap<String, Double> serviceApaye, String name) {
		super();
		this.name = name;
		this.totalPrice = totalPrice;
		this.serviceApaye = serviceApaye;
	}	
	
}
