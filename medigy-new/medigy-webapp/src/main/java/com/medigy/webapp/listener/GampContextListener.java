package com.medigy.webapp.listener;

import java.util.HashMap;
import java.util.Map;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.servlet.GuiceServletContextListener;
import com.google.inject.servlet.ServletModule;
import com.medigy.webapp.modules.PersonModule;
import com.sun.jersey.api.core.PackagesResourceConfig;
import com.sun.jersey.guice.spi.container.servlet.GuiceContainer;

/**
 * Responsible for the following tasks
 * <ol>
 * <li> Provides the list scanning locations/ packages for resources and providers for Jersey Servlet</li>
 * <li> Provides Guice Integration of dependence injection, transaction support and servlet modules</li>
 * <li> Routes any REST / JSON request through security filter for checking authenticity of the calls</li>
 * <li> Forwards any REST / JSON calls to its handler</li>
 * </ol>
 *
 * @author Drupad Panchal
 * @since 0.0.1
 */
public class GampContextListener extends GuiceServletContextListener {
	/**
	 * Jersey scanner will be looking in these packages for resources and providers
	 */
	private static final String SCANNING_LOCATIONS = "com.medigy.webapp.resource;com.medigy.utils.serializer;org.codehaus.jackson.jaxrs";

	@Override
	protected Injector getInjector() {
		final Map<String, String> servletParameters = new HashMap<String, String>();
		servletParameters.put(PackagesResourceConfig.PROPERTY_PACKAGES, SCANNING_LOCATIONS);
		servletParameters.put("com.sun.jersey.config.feature.Trace", "true");

		Injector injector = Guice.createInjector(new PersonModule(),
                new ServletModule() {

                    @Override
                    protected void configureServlets() {
                        //forward all JSON Requests through SecurityFilter implementation
                        //TODO: Implement filtersfilter("/api/*").through(GampSecurityFilter.class);
                        serve("/api/*").with(GuiceContainer.class, servletParameters);
                    }
                });
		
		return injector;
	}
}
