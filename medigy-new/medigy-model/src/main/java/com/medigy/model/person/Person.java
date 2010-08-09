package com.medigy.model.person;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;

import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.googlecode.objectify.Key;
import com.medigy.utils.serializer.JsonIntegerDeserializer;

/**
 * Represents a patient entity in the system.
 */
@Entity
public class Person {
	@Id Long id;
	private String firstName;
	private String lastName;
	private String middleName;
	private String suffix;
	private Date birthDate;
	private Date deathDate;
	//private byte[] photo;

	/*
	private List<Key<PersonIdentifier>> personIdentifiers = new ArrayList<Key<PersonIdentifier>>();
	private List<Key<Gender>> genders = new ArrayList<Key<Gender>>();
	private List<Key<MaritalStatus>> maritalStatuses = new ArrayList<Key<MaritalStatus>>();
	private Set<Key<Ethnicity>> ethnicities = new HashSet<Key<Ethnicity>>();
	private Set<Key<Language>> languages = new HashSet<Key<Language>>();
	private List<Key<PersonRole>> roles = new ArrayList<Key<PersonRole>>();
	private List<Key<ContactMechanism>> contactMechanisms = new ArrayList<Key<ContactMechanism>>();
	*/
	
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

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(final String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(final String lastName) {
		this.lastName = lastName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(final String middleName) {
		this.middleName = middleName;
	}

	public String getSuffix() {
		return suffix;
	}

	public void setSuffix(String suffix) {
		this.suffix = suffix;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public Date getDeathDate() {
		return deathDate;
	}

	public void setDeathDate(final Date deathDate) {
		this.deathDate = deathDate;
	}

	/*
	public byte[] getPhoto() {
		return photo;
	}

	public void setPhoto(final byte[] photo) {
		this.photo = photo;
	}
	 */
	/*
	public List<Key<PersonIdentifier>> getPersonIdentifiers() {
		return personIdentifiers;
	}

	public void setPersonIdentifiers(final List<Key<PersonIdentifier>> personIdentifiers) {
		this.personIdentifiers = personIdentifiers;
	}
	
	public void addPersonIdentifier(final Key<PersonIdentifier> personIdentifier) {
		this.personIdentifiers.add(personIdentifier);
	}

	public List<Key<Gender>> getGenders() {
		return genders;
	}

	public void setGenders(final List<Key<Gender>> genders) {
		this.genders = genders;
	}
	
	public void addGender(final Key<Gender> gender) {
		this.genders.add(gender);
	}

	public List<Key<MaritalStatus>> getMaritalStatuses() {
		return maritalStatuses;
	}

	public void setMaritalStatuses(final List<Key<MaritalStatus>> maritalStatuses) {
		this.maritalStatuses = maritalStatuses;
	}

	public Set<Key<Ethnicity>> getEthnicities() {
		return ethnicities;
	}

	public void setEthnicities(final Set<Key<Ethnicity>> ethnicities) {
		this.ethnicities = ethnicities;
	}

	public Set<Key<Language>> getLanguages() {
		return languages;
	}

	public void setLanguages(final Set<Key<Language>> languages) {
		this.languages = languages;
	}

	public List<Key<PersonRole>> getRoles() {
		return roles;
	}

	public void setRoles(final List<Key<PersonRole>> roles) {
		this.roles = roles;
	}

	public List<Key<ContactMechanism>> getContactMechanisms() {
		return contactMechanisms;
	}

	public void setContactMechanisms(final List<Key<ContactMechanism>> contactMechanisms) {
		this.contactMechanisms = contactMechanisms;
	}
	*/
}
