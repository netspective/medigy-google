package com.medigy.webapp.modules;

import com.google.inject.AbstractModule;
import com.google.inject.Scopes;
import com.medigy.dao.person.PersonDao;
import com.medigy.dao.person.impl.PersonDaoImpl;
import com.medigy.service.person.PatientService;
import com.medigy.service.person.impl.PatientServiceImpl;

/**
 * PersonModule specifies the relationship between PersonDao and its implementation
 * PersonDaoImpl to Guice. Similarly PatientService binds with PatientServiceImpl
 * in a Singleton scope.
 * 
 * @author Drupad Panchal
 * @since 0.0.1 *
 */
public class PersonModule extends AbstractModule {
	/* TODO: This should live in a separate project along with others */
	@Override
	public void configure() {
		bind(PersonDao.class).to(PersonDaoImpl.class).in(Scopes.SINGLETON);
		bind(PatientService.class).to(PatientServiceImpl.class).in(Scopes.SINGLETON);
	}
}
