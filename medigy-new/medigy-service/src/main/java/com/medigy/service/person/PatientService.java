package com.medigy.service.person;

import java.util.List;

import com.medigy.model.person.Person;

/**
 * Service class for managing Patients
 *
 * @author Drupad Panchal
 * @since 0.0.1
 */
public interface PatientService {

	/**
	 * Return the patient matching the provided id;
	 *
	 * @param id - used as the search key.
	 * @return the patient matching the search key, if no patient is found
	 *         with the matching key, then return null
	 */
	public Person getPatient(Long id);

	/**
	 * Get all patients regardless of any condition.
	 * <p/>
	 * Implementation should preferably paginate results to improve
	 * load / performance at the server and the client.
	 *
	 * @return list of all patients.
	 */
	public List<Person> getPatients();

	/**
	 * Get all patients matching the supplied <code>name</code> criteria.
	 *
	 * @param name the patient name to be searched for.
	 * @return the list of patients having matching names.
	 */
	public List<Person> getPatientsByName(String name);

	/**
	 * Persist the patient and return the id.
	 *
	 * @param patient the patient entity to be saved.
	 * @return the patient instance that just got persisted.
	 */
	public Person save(Person patient);

	/**
	 * Removes the patient from the system
	 *
	 * @param patient the patient who should be removed.
	 */
	public void remove(Person patient);
}
