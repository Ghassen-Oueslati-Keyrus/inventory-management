package com.brain.ecommerce.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class Photo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	private String contentType;
	
	@Lob
	@Column(length = 5000000)
	private byte[] data;
    
	public Photo() {
		super();
	}

	public Photo(Long id, String name, String contentType, byte[] data) {
		super();
		this.id = id;
		this.name = name;
		this.contentType = contentType;
		this.data = data;
	}

	public Photo(String name, String contentType, byte[] data) {
		super();
		this.name = name;
		this.contentType = contentType;
		this.data = data;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}
	
}
