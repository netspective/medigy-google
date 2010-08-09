package com.medigy.dao;


/**
 * All DAOs should implement this interface either directly or indirectly. Also
 * it is assumed that the save method will work for both transient and detached
 * entities.
 * 
 * @author Drupad Panchal
 * @since 0.0.1
 */
public interface Dao<K, E> {
    /**
     * Save a transient entity or merge a detached entity.
     * 
     * @param entity
     *            the entity to be persisted.
     * @return the persisted instance.
     */
    E save(E entity);

    /**
     * Delete an entity.
     * 
     * @param entity
     *            the entity to be saved.
     */
    void delete(E entity);

    /**
     * Find the entity using the primary key.
     * 
     * @param id
     *            the primary key of the entity.
     * @return the entity
     */
    E findById(K id);
}
