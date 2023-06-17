package com.brain.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.brain.ecommerce.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAllByOrderByCreatedDateDesc();

    @Query("SELECT p FROM Product p WHERE p.brand IN :brands")
    List<Product> findByBrands(@Param("brands") List<String> brands);
    
    @Query("SELECT p FROM Product p WHERE p.categoryId IN :categoryIds")
    List<Product> findByCategoryIds(@Param("categoryIds") List<Long> categoryIds);

    List<Product> findByCategoryId( Long categoryId);


    @Query("SELECT DISTINCT p.brand FROM Product p")
    List<Object[]> findAllBrandsAndProductIds();
}