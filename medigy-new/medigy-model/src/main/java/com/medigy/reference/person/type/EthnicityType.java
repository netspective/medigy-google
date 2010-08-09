package com.medigy.reference.person.type;

import javax.persistence.Id;

import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.googlecode.objectify.annotation.Cached;
import com.medigy.utils.serializer.JsonIntegerDeserializer;

/**
 * Represents the different types of Ethnicities that are available as
 * options to choose from. Mark it @Cached so that the types are cached
 * using memcache and it does not result into a direct Query for each request.
 * 
 * @author Drupad Panchal
 */
@Cached
public enum EthnicityType {
	
	CAUCASIAN("C", "Caucasian"),
    HISPANIC("H", "Hispanic"),
    ASIAN_PACIFIC_ISLANDER("A", "Asian/Pacific Islander"),
    AFRICAN_AMERICAN("AF", "African American"),
    NATIVE_AMERICAN("NA", "Native American");
	
	@Id Long id;
    private final String label;
    private final String code;

    private EthnicityType(final String code, final String label) {
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
