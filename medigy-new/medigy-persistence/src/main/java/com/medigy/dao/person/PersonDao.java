package com.medigy.dao.person;

import java.util.List;

import com.medigy.dao.Dao;
import com.medigy.model.person.Person;

/**
 * @author Drupad Panchal
 * @since 0.0.1
 */
public interface PersonDao extends Dao<Long, Person> {
    /**
     * Get all the patients regardless of any condition.
     * <p/>
     * Implementation should preferably paginate results to improve
     * load / performance at the server and the client.
     *
     * @param qp parameter object for this query encapsulating limit and offset.
     * @return list of all patients.
     */
    public List<Person> getPatients();


    /**
     * Get all the patients matching the supplied name parameter.
     *
     * @param name - the search key.
     * @return the list of all patients with the matching names.
     */
    public List<Person> getPatientsByName(String name);
}
