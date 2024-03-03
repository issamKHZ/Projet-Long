package com.costSimu.Api.model;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.*;
import java.util.*;

@Document("Services")
public class Services {
	
	
	public HashMap<String, Double> getDirectProprieties() {
		return directProprieties;
	}

	public void setDirectProprieties(HashMap<String, Double> directProprieties) {
		this.directProprieties = directProprieties;
	}

	public HashMap<String, HashMap<String, Double>> getMultipleProprieties() {
		return MultipleProprieties;
	}

	public void setMultipleProprieties(HashMap<String, HashMap<String, Double>> multipleProprieties) {
		MultipleProprieties = multipleProprieties;
	}
	@Id
	private String id;
	
	private String name;
	private HashMap<String, Double> directProprieties;
	private HashMap<String, HashMap<String, Double>> MultipleProprieties;
	
	public Services(String name, HashMap<String, Double> directProprieties,
			HashMap<String, HashMap<String, Double>> multipleProprieties) {
		super();
		this.name = name;
		this.directProprieties = directProprieties;
		MultipleProprieties = multipleProprieties;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
}
