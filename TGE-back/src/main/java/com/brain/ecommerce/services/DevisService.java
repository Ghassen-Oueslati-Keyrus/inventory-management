package com.brain.ecommerce.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brain.ecommerce.models.Devis;
import com.brain.ecommerce.repository.DevisRepository;

@Service
public class DevisService {


	@Autowired
	private DevisRepository devisRepository;
	
	public List<Devis> getAllDevis() {
		// TODO Auto-generated method stub
		return devisRepository.findAll();
	}

	public Devis getDevisById(Long id) {
		// TODO Auto-generated method stub
		return devisRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Categorie id invalide"));
	}

	public Devis createDevis(Devis Devis) {
		// TODO Auto-generated method stub
		return devisRepository.save(Devis);
	}


	public void deleteDevis(Long id) {
		// TODO Auto-generated method stub
		Devis Devis = devisRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Categorie id invalide"));
                devisRepository.delete(Devis);
	}

}
