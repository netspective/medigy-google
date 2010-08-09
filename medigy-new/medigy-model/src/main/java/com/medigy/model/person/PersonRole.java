package com.medigy.model.person;

import javax.persistence.Entity;
import javax.persistence.Id;

import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.medigy.reference.person.type.PersonRoleType;
import com.medigy.utils.serializer.JsonIntegerDeserializer;

/**
 * Represents a distinct entity for a person
 * not to be confused with PersonRoleType.
 * 
 * @author Drupad Panchal
 */
@Entity
public class PersonRole {
	@Id Long id;
	private PersonRoleType type;

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
	
	public PersonRoleType getType() {
		return type;
	}

	public void setType(final PersonRoleType type) {
		this.type = type;
	}
}
