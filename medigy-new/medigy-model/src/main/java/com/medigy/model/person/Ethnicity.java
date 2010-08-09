package com.medigy.model.person;

import javax.persistence.Entity;
import javax.persistence.Id;

import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.medigy.reference.person.type.EthnicityType;
import com.medigy.utils.serializer.JsonIntegerDeserializer;

/**
 * Represents a distinct entity for a person
 * not to be confused with EthnicityType.
 * 
 * @author Drupad Panchal
 */
@Entity
public class Ethnicity 
{
    @Id Long id;
    private EthnicityType type;
    
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
	
    public EthnicityType getType()
    {
        return type;
    }

    public void setType(final EthnicityType type)
    {
        this.type = type;
    }
}
