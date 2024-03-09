package com.costSimu.Api.model;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.*;

@Document("Instance")
public class Instance {
	
	@Id
	private String id;
	
	private String instanceType;
    private double price;    
    private String vCPU;
    private String memory;
    private String operatingSystem;
    private String storage;
    private String networkPerformance;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getInstanceType() {
		return instanceType;
	}

	public void setInstanceType(String instanceType) {
		this.instanceType = instanceType;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getvCPU() {
		return vCPU;
	}

	public void setvCPU(String vCPU) {
		this.vCPU = vCPU;
	}

	public String getMemory() {
		return memory;
	}

	public void setMemory(String memory) {
		this.memory = memory;
	}

	public String getOperatingSystem() {
		return operatingSystem;
	}

	public void setOperatingSystem(String operatingSystem) {
		this.operatingSystem = operatingSystem;
	}

	public String getStorage() {
		return storage;
	}

	public void setStorage(String storage) {
		this.storage = storage;
	}

	public String getNetworkPerformance() {
		return networkPerformance;
	}

	public void setNetworkPerformance(String networkPerformance) {
		this.networkPerformance = networkPerformance;
	}
    
	public Instance(String instanceType, double price, String vCPU, String memory, String operatingSystem, String storage,
			String networkPerformance) {
		super();
		this.instanceType = instanceType;
		this.price = price;
		this.vCPU = vCPU;
		this.memory = memory;
		this.operatingSystem = operatingSystem;
		this.storage = storage;
		this.networkPerformance = networkPerformance;
	}
	
	public Instance() {
		
	}

}
