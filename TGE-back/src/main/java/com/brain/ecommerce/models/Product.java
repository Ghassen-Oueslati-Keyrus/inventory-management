package com.brain.ecommerce.models;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "produits")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private double price;

	@Column(nullable = false)
	private String description;

	@Column(nullable = false)
	private Integer quantity;

	@Column(nullable = false)
	private boolean location;

	@Column(nullable = false)
	private Long categoryId;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "photos_produit", joinColumns = {
			@JoinColumn(name = "id_produit")
	}, inverseJoinColumns = {
			@JoinColumn(name = "id_photo")
	})
	private Set<Photo> photos;

	private String reference;

	private double discountedPrice;

	private String brand;

	@CreatedDate
	@Column(name = "createdDate", nullable = false, updatable = false)
	private LocalDateTime createdDate;

	private String groupeElectrogeneType;

	private Long puissanceContinue;

	private String origine;

	private String moteur;

	private String alternateur;

	private String refroidissement;

	private Integer nombreCylindres;

	private String demarrage;

	private String carteDemarrage;

	private String consommation;

	private String capotage;

	private Long poids;

	private String dimension;

	private String volumeExpedie;

	private Long nombreHeures;

	private String typeCarburant;

	private Long capaciteReservoirCarburant;

	private Long vitesseMoteur;

	private int amperage;

	private String typeAlimentation;

	public Product() {
		super();
	}


	public Product(String name, double price, String description, Integer quantity, boolean location, Long categoryId,
			Set<Photo> photos, String reference, double discountedPrice, String brand, LocalDateTime createdDate,
			String groupeElectrogeneType, Long puissanceContinue, String origine, String moteur, String alternateur,
			String refroidissement, Integer nombreCylindres, String demarrage, String carteDemarrage,
			String consommation, String capotage, Long poids, String dimension, String volumeExpedie, Long nombreHeures,
			String typeCarburant, Long capaciteReservoirCarburant, Long vitesseMoteur, int amperage,
			String typeAlimentation) {
		this.name = name;
		this.price = price;
		this.description = description;
		this.quantity = quantity;
		this.location = location;
		this.categoryId = categoryId;
		this.photos = photos;
		this.reference = reference;
		this.discountedPrice = discountedPrice;
		this.brand = brand;
		this.createdDate = createdDate;
		this.groupeElectrogeneType = groupeElectrogeneType;
		this.puissanceContinue = puissanceContinue;
		this.origine = origine;
		this.moteur = moteur;
		this.alternateur = alternateur;
		this.refroidissement = refroidissement;
		this.nombreCylindres = nombreCylindres;
		this.demarrage = demarrage;
		this.carteDemarrage = carteDemarrage;
		this.consommation = consommation;
		this.capotage = capotage;
		this.poids = poids;
		this.dimension = dimension;
		this.volumeExpedie = volumeExpedie;
		this.nombreHeures = nombreHeures;
		this.typeCarburant = typeCarburant;
		this.capaciteReservoirCarburant = capaciteReservoirCarburant;
		this.vitesseMoteur = vitesseMoteur;
		this.amperage = amperage;
		this.typeAlimentation = typeAlimentation;
	}


	public Product(Long id, String name, double price, String description, Integer quantity, boolean location,
			Long categoryId, Set<Photo> photos, String reference, double discountedPrice, String brand,
			LocalDateTime createdDate, String groupeElectrogeneType, Long puissanceContinue, String origine,
			String moteur, String alternateur, String refroidissement, Integer nombreCylindres, String demarrage,
			String carteDemarrage, String consommation, String capotage, Long poids, String dimension,
			String volumeExpedie, Long nombreHeures, String typeCarburant, Long capaciteReservoirCarburant,
			Long vitesseMoteur, int amperage, String typeAlimentation) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.description = description;
		this.quantity = quantity;
		this.location = location;
		this.categoryId = categoryId;
		this.photos = photos;
		this.reference = reference;
		this.discountedPrice = discountedPrice;
		this.brand = brand;
		this.createdDate = createdDate;
		this.groupeElectrogeneType = groupeElectrogeneType;
		this.puissanceContinue = puissanceContinue;
		this.origine = origine;
		this.moteur = moteur;
		this.alternateur = alternateur;
		this.refroidissement = refroidissement;
		this.nombreCylindres = nombreCylindres;
		this.demarrage = demarrage;
		this.carteDemarrage = carteDemarrage;
		this.consommation = consommation;
		this.capotage = capotage;
		this.poids = poids;
		this.dimension = dimension;
		this.volumeExpedie = volumeExpedie;
		this.nombreHeures = nombreHeures;
		this.typeCarburant = typeCarburant;
		this.capaciteReservoirCarburant = capaciteReservoirCarburant;
		this.vitesseMoteur = vitesseMoteur;
		this.amperage = amperage;
		this.typeAlimentation = typeAlimentation;
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

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<Photo> getPhotos() {
		return photos;
	}

	public void setPhotos(Set<Photo> photos) {
		this.photos = photos;
	}

	public String getReference() {
		return reference;
	}

	public void setReference(String reference) {
		this.reference = reference;
	}

	public double getDiscountedPrice() {
		return discountedPrice;
	}

	public void setDiscountedPrice(double discountedPrice) {
		this.discountedPrice = discountedPrice;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public boolean isLocation() {
		return location;
	}

	public void setLocation(boolean location) {
		this.location = location;
	}

	public String getGroupeElectrogeneType() {
		return groupeElectrogeneType;
	}

	public void setGroupeElectrogeneType(String groupeElectrogeneType) {
		this.groupeElectrogeneType = groupeElectrogeneType;
	}

	public Long getPuissanceContinue() {
		return puissanceContinue;
	}

	public void setPuissanceContinue(Long puissanceContinue) {
		this.puissanceContinue = puissanceContinue;
	}

	public String getOrigine() {
		return origine;
	}

	public void setOrigine(String origine) {
		this.origine = origine;
	}

	public String getMoteur() {
		return moteur;
	}

	public void setMoteur(String moteur) {
		this.moteur = moteur;
	}
	public Long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}
	public String getAlternateur() {
		return alternateur;
	}

	public void setAlternateur(String alternateur) {
		this.alternateur = alternateur;
	}

	public String getRefroidissement() {
		return refroidissement;
	}

	public void setRefroidissement(String refroidissement) {
		this.refroidissement = refroidissement;
	}

	public Integer getNombreCylindres() {
		return nombreCylindres;
	}

	public void setNombreCylindres(Integer nombreCylindres) {
		this.nombreCylindres = nombreCylindres;
	}

	public String getDemarrage() {
		return demarrage;
	}

	public void setDemarrage(String demarrage) {
		this.demarrage = demarrage;
	}

	public String getCarteDemarrage() {
		return carteDemarrage;
	}

	public void setCarteDemarrage(String carteDemarrage) {
		this.carteDemarrage = carteDemarrage;
	}

	public String getConsommation() {
		return consommation;
	}

	public void setConsommation(String consommation) {
		this.consommation = consommation;
	}

	public Long getPoids() {
		return poids;
	}

	public void setPoids(Long poids) {
		this.poids = poids;
	}

	public String getDimension() {
		return dimension;
	}

	public void setDimension(String dimension) {
		this.dimension = dimension;
	}

	public String getVolumeExpedie() {
		return volumeExpedie;
	}

	public void setVolumeExpedie(String volumeExpedie) {
		this.volumeExpedie = volumeExpedie;
	}

	public Long getNombreHeures() {
		return nombreHeures;
	}

	public void setNombreHeures(Long nombreHeures) {
		this.nombreHeures = nombreHeures;
	}

	public String getCapotage() {
		return capotage;
	}

	public void setCapotage(String capotage) {
		this.capotage = capotage;
	}


	public String getTypeCarburant() {
		return typeCarburant;
	}


	public void setTypeCarburant(String typeCarburant) {
		this.typeCarburant = typeCarburant;
	}


	public Long getCapaciteReservoirCarburant() {
		return capaciteReservoirCarburant;
	}


	public void setCapaciteReservoirCarburant(Long capaciteReservoirCarburant) {
		this.capaciteReservoirCarburant = capaciteReservoirCarburant;
	}


	public Long getVitesseMoteur() {
		return vitesseMoteur;
	}


	public void setVitesseMoteur(Long vitesseMoteur) {
		this.vitesseMoteur = vitesseMoteur;
	}


	public int getAmperage() {
		return amperage;
	}


	public void setAmperage(int amperage) {
		this.amperage = amperage;
	}


	public String getTypeAlimentation() {
		return typeAlimentation;
	}


	public void setTypeAlimentation(String typeAlimentation) {
		this.typeAlimentation = typeAlimentation;
	}

}
