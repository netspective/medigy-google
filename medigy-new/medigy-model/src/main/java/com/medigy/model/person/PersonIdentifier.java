package com.medigy.model.person;

import javax.persistence.Entity;
import javax.persistence.Id;

import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.medigy.reference.type.PersonIdentifierType;
import com.medigy.utils.serializer.JsonIntegerDeserializer;

/**
 * Represents a distinct entity for a person
 * not to be confused with PersonIdentifierType.
 * 
 * @author Drupad Panchal
 */
@Entity
public class PersonIdentifier {
	@Id Long id;
	private PersonIdentifierType type;
	private String identifierValue;

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
	
	public String getIdentifierValue() {
		return identifierValue;
	}

	public void setIdentifierValue(final String identifierValue) {
		this.identifierValue = identifierValue;
	}

	public PersonIdentifierType getType() {
		return type;
	}

	public void setType(final PersonIdentifierType type) {
		this.type = type;
	}
}
