package com.brain.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brain.ecommerce.models.Photo;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long>{

}

