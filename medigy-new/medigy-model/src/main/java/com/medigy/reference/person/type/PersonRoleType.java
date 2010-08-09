package com.medigy.reference.person.type;

import javax.persistence.Id;

import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.googlecode.objectify.annotation.Cached;
import com.medigy.utils.serializer.JsonIntegerDeserializer;

/**
 * Represents the different types of PersonRoleTypes that are available as
 * options to choose from. Mark it @Cached so that the types are cached
 * using memcache and it does not result into a direct Query for each request.
 * 
 * @author Drupad Panchal
 * <p/>
 * <enum>Self</enum> 
 * <enum>Spouse</enum>
 * <enum>Mother</enum>
 * <enum>Father</enum>
 * <enum>Natural/Adopted Child (Insured has Financial Responsibility)</enum>
 * <enum>Natural/Adopted Child (Insured does not have Financial Resp.)</enum>
 * <enum>Step Child</enum>
 * <enum>Foster Child</enum>
 * <enum>Ward of the Court</enum>
 * <enum>Sister</enum>
 * <enum>Brother</enum>
 * <enum>Employee</enum>
 * <enum>Unknown/Other</enum>
 * <enum>Handicapped Dependent</enum>
 * <enum>Organ Donor</enum>
 * <enum>Cadaver Donor</enum>
 * <enum>Niece/Nephew</enum>
 * <enum>Grandchild</enum>
 * <enum>Injured Plaintiff</enum>
 * <enum>Sponsored Dependent</enum>
 * <enum>Minor Dependent of a Minor Dependent</enum>
 * <enum>Parent</enum>
 * <enum>Grandparent</enum>
 * <enum>Cousin</enum>
 * <enum>Emergency Contact</enum>
 * <enum>Care Provider</enum>
 * <enum>Other</enum>
 */
@Cached
public enum PersonRoleType {
	
	SELF("SELF", "Self"),
	SPOUSE("SPOUSE", "Spouse"),
	MOTHER("MOTHER", "Mother"),
	FATHER("FATHER", "Father"),
	CHILD("CHILD", "Natural/Adopted Child"),
	STEP_CHILD("STEP_CHILD", "Step Child"),
	FOSTER_CHILD("FOSTER_CHILD", "Foster Child"),
	SISTER("SISTER", "Sister"),
	BROTHER("BROTHER", "Brother"),
	FAMILY_MEMBER("F", "Family Member"),
	EMPLOYEE("E", "Employee"),
	DEPENDENT("DEP", "Dependent"),
	PARENT("PARENT", "Parent"),
	GRANDPARENT("GPARENT", "Grandparent"),
	GRANDCHILD("GCHILD", "Grandchild"),
	COUSIN("COUSIN", "Cousin"),
	NIECE_NEPHEW("NIECE_NEP", "Niece/Nephew"),
	INDIVIDUAL_HEALTH_CARE_PRACTITIONER("IND_HCP", "Individual Health Care Practitioner"),
	PATIENT("PATIENT", "Patient"),
	OTHER("PERSON_OTHER", "Other");

	@Id Long id;
	private final String label;
	private final String code;

	private PersonRoleType(final String code, final String label) {
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
