package com.brain.ecommerce.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brain.ecommerce.models.Devis;
import com.brain.ecommerce.services.DevisService;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/devis")
public class DevisController {
    
    @Autowired
	private DevisService devisService;
	
	@GetMapping
	public List<Devis> getAllDevis(){
		return devisService.getAllDevis();
	}
	
	@PostMapping
	public Devis createDevis(@RequestBody Devis devis) {
		return devisService.createDevis(devis);
	}
	
	@GetMapping("/{id}")
	public Devis getDevisById(@PathVariable Long id) {
		return devisService.getDevisById(id);
	}
	
	
	@DeleteMapping("/{id}")
	public void deleteDevis(@PathVariable Long id) {
		devisService.deleteDevis(id);
	}
	
}
