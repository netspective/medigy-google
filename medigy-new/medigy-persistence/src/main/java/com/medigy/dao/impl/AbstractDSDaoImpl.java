package com.medigy.dao.impl;

import java.lang.reflect.ParameterizedType;

import com.googlecode.objectify.Key;
import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.ObjectifyFactory;
import com.medigy.dao.Dao;

/**
 * Super class for all applications DAOs.
 * @param <K> - Should be the Entity id specified with annotation @Id
 * @param <E> - Should be the Entity type being persisted
 * 
 * @author Drupad Panchal
 * @since 0.0.1
 */
public abstract class AbstractDSDaoImpl<K, E> implements Dao<K, E> {
	protected Class<E> entityClass;

	private final ObjectifyFactory factory;

	/** A single objectify interface, lazily created */
	private Objectify lazyOfy = null;

	/**
	 * Creates the DAO, injecting the {@link ObjectifyFactory}.
	 * 
	 * @param factory The injected factory.
	 */
	public AbstractDSDaoImpl(final ObjectifyFactory factory) {
		ParameterizedType genericType = (ParameterizedType) getClass().getGenericSuperclass();
		this.entityClass = (Class<E>) genericType.getActualTypeArguments()[1];

		this.factory = factory;
		ensureObjectsAreRegistered();
	}

	@Override
	public E save(E entity) {
		return findWithKey(ofy().put(entity));
	}

	@Override
	public void delete(E entity) {
		//TODO:Implement me
	}

	@Override
	public E findById(K id) {
		if (id instanceof Long)
			return ofy().get(entityClass, (Long)id);
		else if (id instanceof String)
			return ofy().get(entityClass, (String)id);
		else
			return (E) ofy().get(entityClass, id);
	}

	/**
	 * Utility method to find a given entity using its
	 * {@link Key}
	 * @param key
	 * @return
	 */
	public E findWithKey(Key<E> key) {
		return ofy().get( key );
	}

	/**
	 * Ensures the objects controlled by this DAO are registered
	 * towards objectify exactly once. The method is synchronized
	 * for thread safety. 
	 */
	private synchronized void ensureObjectsAreRegistered() {
		if( areObjectsRegistered() )
			return;
		registerObjects(factory);
	}

	/**
	 * Override this method to check whether the objects controlled by
	 * this DAO have been registered (exactly once). To implement this
	 * method, you should declare a field:
	 * <pre>
	 *   private static boolean objectsRegistered = false;
	 * </pre>
	 * The {@link #areObjectsRegistered()} method should return the content of that field, while
	 * the {@link #registerObjects()} method should set that field
	 * to {@code true}.
	 * 
	 * @return
	 */
	protected abstract boolean areObjectsRegistered();

	/**
	 * Override this method to register the objects controlled by this
	 * DAO towards objectify. 
	 * Your implementation should contain calls like:
	 * <pre>
	 *   ofyFactory.register(MyClass.class);
	 * </pre>
	 * Make sure you set your static {@code objectsRegistered} field to {@code true}
	 * within this method. See {@link #areObjectsRegistered()} for more details.
	 * 
	 * @param ofyFactory The {@link ObjectifyFactory} on which to register objects.
	 */
	protected abstract void registerObjects( ObjectifyFactory ofyFactory );

	/**
	 * Access the injected factory object.
	 * 
	 * @return The injected {@link ObjectifyFactory}.
	 */
	public ObjectifyFactory ofyFactory()
	{
		return factory;
	}

	/**
	 * Access the non-transactional and unique {@link Objectify} object
	 * for this DAO. To start a transaction, call {@link #newOfyTransaction()} instead.
	 * 
	 * @return The {@link Objectify} object.
	 */
	public Objectify ofy()
	{
		if (this.lazyOfy == null)
			this.lazyOfy = factory.begin();

		return this.lazyOfy;
	}

	/**
	 * Creates a new transactional {@link Objectify} object.
	 * 
	 * @return A new transactional {@link Objectify} object.
	 */
	public Objectify newOfyTransaction()
	{
		return factory.beginTransaction();
	} 
}
