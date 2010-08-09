package com.medigy.utils.serializer;

import java.io.IOException;

import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.DeserializationContext;
import org.codehaus.jackson.map.JsonDeserializer;

/**
 * Deserializer for Integer types.
 * <p/>
 * Difference with provided Jackson Integer de-serializer is that this
 * one converts null/empty values to 0.
 *
 * @author Drupad Panchal
 * @since 0.0.1
 */
public class JsonIntegerDeserializer extends JsonDeserializer<Integer> {


	public Integer deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
		return deserializeInternal(jp, ctxt);
	}

	private Integer deserializeInternal(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
		String valueString = jp.getText().trim();
		if (null == valueString || 0 == valueString.length()) {
			return Integer.valueOf(0);
		}
		return Integer.valueOf(valueString);
	}

}
