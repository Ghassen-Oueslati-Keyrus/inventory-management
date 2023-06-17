package com.brain.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brain.ecommerce.models.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{

}
