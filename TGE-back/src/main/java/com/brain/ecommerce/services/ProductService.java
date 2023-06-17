package com.brain.ecommerce.services;

import java.util.List;

import com.brain.ecommerce.models.Product;

public interface ProductService {

	 public List<Product> getAllProducts();
	 
	 public Product getProductById(Long id);
	 
	 public Product createProduct(Product product);
	 
	 public Product updateProduct(Product product);
	 
	 public void deleteProductById(Long id);

	 public List<Product> newProducts();

	 public List<Object[]> findAllBrandsAndProductIds();

	 public List<Product> findProductsByBrands(List<String> brands);
	 public List<Product> findByCategoryIds(List<Long> categoryIds);

	 public List<Product> findByCategoryId(Long categoryId) ;

}
