package com.costSimu.Api.Utils;

public class PropRequest {

	public String getField() {
		return field;
	}
	public void setField(String field) {
		this.field = field;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public PropRequest(String field, String value) {
		super();
		this.field = field;
		this.value = value;
	}
	private String field;
	private String value;
	
	
}
