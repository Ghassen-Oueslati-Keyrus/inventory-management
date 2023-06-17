package com.brain.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brain.ecommerce.models.Devis;

@Repository
public interface DevisRepository extends JpaRepository<Devis, Long>{
    
}
