package com.medigy.dao.person.impl;

import java.util.List;
import java.util.logging.Logger;

import com.google.inject.Inject;
import com.googlecode.objectify.ObjectifyFactory;
import com.googlecode.objectify.Query;
import com.medigy.dao.impl.AbstractDSDaoImpl;
import com.medigy.dao.person.PersonDao;
import com.medigy.model.person.Person;

/**
 * @author Drupad Panchal
 * @since 0.0.1
 */
public class PersonDaoImpl extends AbstractDSDaoImpl<Long, Person> implements PersonDao {
	Logger log = Logger.getLogger(PersonDaoImpl.class.getName());
	
	private static boolean objectsRegistered = false;
	
	@Inject
	public PersonDaoImpl(final ObjectifyFactory objectifyFactory) {
		super(objectifyFactory);
	}
	
    public List<Person> getPatients() {
    	final Query<Person> q = ofy().query(Person.class);
		log.info("Count of patients in query: " + q.countAll());
		List<Person> patients = q.list();
		return patients;
    }

    public List<Person> getPatientsByName(String name) {
    	final Query<Person> q = newOfyTransaction().query(Person.class).filter("name", name);
    	List<Person> patients = q.list();
    	return patients;
    }

	@Override
	protected boolean areObjectsRegistered() {
		return objectsRegistered;
	}

	@Override
	protected void registerObjects(ObjectifyFactory ofyFactory) {
		objectsRegistered = true;
	    ofyFactory.register(Person.class);
	}
}
