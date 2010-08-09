package com.medigy.reference.person.type;

import javax.persistence.Id;

import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.googlecode.objectify.annotation.Cached;
import com.medigy.utils.serializer.JsonIntegerDeserializer;

/**
 * Represents the different types of MaritalStatuses that are available as
 * options to choose from. Mark it @Cached so that the types are cached
 * using memcache and it does not result into a direct Query for each request.
 * 
 * @author Drupad Panchal
 */
@Cached
public enum MaritalStatusType {
	
    UNKNOWN("?", "Unkown", ""),
    SINGLE("S", "Single", ""),
    MARRIED("M", "Married", ""),
    DIVORCED("D", "Divorced", "");
    
    @Id Long id;
    private final String code;
    private final String label;
    private final String description;
    
    private MaritalStatusType(final String code, final String label, final String description) {
        this.code = code;
        this.label = label;
        this.description = description;
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

    public final String getCode() {
        return code;
    }

    public final String getLabel() {
        return label;
    }

    public String getDescription() {
        return description;
    }
}
