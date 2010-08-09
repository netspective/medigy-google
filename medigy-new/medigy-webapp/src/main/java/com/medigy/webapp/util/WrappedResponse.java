package com.medigy.webapp.util;

import java.util.Date;

/**
 * This class represents a Response object as published in the Gamp api.
 * For example,
 * {
 *   message: {
 *     error: "",
 *     status: SUCCESSFUL
 *   }
 *   result: {
 *     entity: "Patient",
 *     data: {
 *       name: "John",
 *       email: "jdoe@email.com,
 *       phone: "888-999-0000"
 *     }
 *   }
 *   datetime: "6/27/2010 11:10 PM"
 * }
 * <p/>
 * message is a WrappedMessage object
 * result is a WrappedResult object
 * datetime is the time of creation for this response object
 * 
 * @author Drupad Panchal
 * @since 0.0.1
 */
public class WrappedResponse<T> {
	private WrappedMessage message;
	private WrappedResult<T> result;
	private Date datetime;

	public enum ResultStatus {
		SUCCESSFUL,
		ERROR
	}
	
	/**
	 * 
	 * @param success
	 * @param error
	 * @param data
	 */
	public WrappedResponse(boolean success, String error, T data) {
		this.message = new WrappedMessage(error, success ? ResultStatus.SUCCESSFUL : ResultStatus.ERROR);
		this.result = new WrappedResult<T>(data);
		this.datetime = new Date();
	}
	
	public void setMessage(WrappedMessage message) {
		this.message = message;
	}

	public WrappedMessage getMessage() {
		return message;
	}

	public void setResult(WrappedResult<T> result) {
		this.result = result;
	}

	public WrappedResult<T> getResult() {
		return result;
	}

	public void setDatetime(Date datetime) {
		this.datetime = datetime;
	}

	public Date getDatetime() {
		return datetime;
	}
	
	public class WrappedMessage {
		private String error;
		private ResultStatus status;
		
		public WrappedMessage(String error, ResultStatus status) {
			this.error = error;
			this.status = status;
		}

		public void setError(String error) {
			this.error = error;
		}

		public String getError() {
			return error;
		}

		public void setStatus(ResultStatus status) {
			this.status = status;
		}

		public ResultStatus getStatus() {
			return status;
		}
	}
	
	/**
	 * WrappedResult<T> represents a class containing result data 
	 * @author Drupad Panchal
	 *
	 * @param <T> The Entity to create a WrappedResult for
	 */
	public class WrappedResult<T> {
		private String entityType;
		private T data;
		
		public WrappedResult(T data) {
			this.entityType = data.getClass().getSimpleName();
			this.data = data;
		}

		public void setEntityType(String entityType) {
			this.entityType = entityType;
		}

		public String getEntityType() {
			return entityType;
		}

		public void setData(T data) {
			this.data = data;
		}

		public T getData() {
			return data;
		}
	}
}
