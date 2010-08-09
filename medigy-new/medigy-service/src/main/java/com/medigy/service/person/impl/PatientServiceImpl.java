package com.medigy.service.person.impl;

import java.util.List;

import com.google.inject.Inject;
import com.medigy.dao.person.PersonDao;
import com.medigy.model.person.Person;
import com.medigy.service.person.PatientService;

/**
 * 
 * @author Drupad Panchal
 * @since 0.0.1
 */
public class PatientServiceImpl implements PatientService {

	@Inject private PersonDao patientDao;

	public PersonDao getPatientDao() {
		return patientDao;
	}

	public void setPatientDao(PersonDao patientDao) {
		this.patientDao = patientDao;
	}
	
	@Override
	public Person getPatient(Long id) {
		return getPatientDao().findById(id);
	}
	
	@Override
	public List<Person> getPatientsByName(String name) {
		return getPatientDao().getPatientsByName(name);
	}

	public List<Person> getPatients() {
		return getPatientDao().getPatients();
	}

	@Override
	public Person save(Person patient) {
		return getPatientDao().save(patient);
	}

	@Override
	public void remove(Person patient) {
	}
}
