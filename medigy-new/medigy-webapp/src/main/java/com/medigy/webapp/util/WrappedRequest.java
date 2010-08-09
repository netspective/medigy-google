package com.medigy.webapp.util;

import java.util.Date;

/**
 * {
 *   userSessionKey: "d788989fe890990-98ra23ds",
 *   operation: "",
 *   entity: "Patient"
 *   data: {
 *     lastname: "doe",
 *     firstname: "john"
 *   }
 *   datetime: "6/27/2010 11:10 PM"
 * }
 * 
 * @author Drupad Panchal
 * @since 0.0.1
 */
public class WrappedRequest<T> {
	private String userSessionKey;
	private String operation;
	private String entity;
	private T data;
	private Date datetime;
	
	public WrappedRequest() {
		this.datetime = new Date();
	}
	
//	public WrappedRequest(String userSessionKey, String operation, String entity, Patient data) {
//		this.userSessionKey = userSessionKey;
//		this.operation = operation;
//		this.entity = entity;
//		this.data = data;
//		this.datetime = new Date();
//	}

	public void setUserSessionKey(String userSessionKey) {
		this.userSessionKey = userSessionKey;
	}

	public String getUserSessionKey() {
		return userSessionKey;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public String getOperation() {
		return operation;
	}

	public void setEntity(String entity) {
		this.entity = entity;
	}

	public String getEntity() {
		return entity;
	}

	public void setData(T data) {
		this.data = data;
	}

	public T getData() {
		return data;
	}

	public void setDatetime(Date datetime) {
		this.datetime = datetime;
	}

	public Date getDatetime() {
		return datetime;
	}
}
