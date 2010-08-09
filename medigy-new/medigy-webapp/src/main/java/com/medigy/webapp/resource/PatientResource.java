package com.medigy.webapp.resource;

import java.util.logging.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.inject.Inject;
import com.medigy.model.person.Person;
import com.medigy.service.person.PatientService;
import com.medigy.webapp.util.WrappedRequest;
import com.medigy.webapp.util.WrappedResponse;

/**
 * Patient resource class hosted at the URI path "/patient"
 * 
 * @author Drupad Panchal
 * @since 0.0.1
 */
@Path("/patient")
public class PatientResource {
	Logger log = Logger.getLogger(PatientResource.class.getName());

	private final PatientService patientService;

	@Inject
	public PatientResource(PatientService patientService) {
		this.patientService = patientService;
	}

	/**
	 * Handles GET requests at the URI path "/patient/id"
	 * @param id id of the Patient
	 * @return response in format specified by {@code WrappedResponse}
	 */
	@GET
	@Produces({MediaType.APPLICATION_JSON, "text/json"})
	@Path("{id}")
	public WrappedResponse<Person> getPatient(@PathParam("id") String id) {
		Person patient = patientService.getPatient(Long.valueOf(id));
		WrappedResponse<Person> response = new WrappedResponse<Person>(true, "", patient);
		return response;
	}

	/**
	 * Handles POST requests at the URI path "/patient/save"
	 * @param request Request in format specified by {@code WrappedRequest}
	 * @return response in format specified by {@code WrappedResponse}
	 */
	@Path("/save")
	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public WrappedResponse<Person> savePatient(WrappedRequest<Person> request) {
		Person patient = request.getData();
		Person persisted = patientService.save(patient);
		return new WrappedResponse<Person>(true, "", persisted);
	}
}
