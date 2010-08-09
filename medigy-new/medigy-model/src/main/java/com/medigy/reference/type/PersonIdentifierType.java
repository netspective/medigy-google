package com.medigy.reference.type;

import javax.persistence.Id;

import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.googlecode.objectify.annotation.Cached;
import com.medigy.utils.serializer.JsonIntegerDeserializer;

/**
 * Represents the different types of PersonIdentifierTypes that are available as
 * options to choose from. Mark it @Cached so that the types are cached
 * using memcache and it does not result into a direct Query for each request.
 * 
 * @author Drupad Panchal
 */
@Cached
public enum PersonIdentifierType {
	
	DRIVERS_LICENSE("DVR_LIC", "Driver's License"),
	SSN("SSN", "Social Security Number");

	@Id Long id;
	private String label;
	private String code;
	
	private PersonIdentifierType() {}

	private PersonIdentifierType(final String code, final String label) {
		this.code = code;
		this.label = label;
	}
	
	/*
	 * Uses a Specialized Deserializer, which aids in converting
	 * null/empty values to 0
	 */
	@JsonDeserialize(using = JsonIntegerDeserializer.class)
	public void setId(long id) {
		this.id = id;
	}

	public long getId() {
		return id;
	}

	public String getCode() {
		return code;
	}

	public String getLabel() {
		return label;
	}
}
