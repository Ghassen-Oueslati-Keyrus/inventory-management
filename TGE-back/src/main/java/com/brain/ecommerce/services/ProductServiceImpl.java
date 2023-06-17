package com.brain.ecommerce.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brain.ecommerce.models.Product;
import com.brain.ecommerce.repository.ProductRepository;

import net.bytebuddy.utility.RandomString;

import javax.persistence.EntityNotFoundException;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Override
	public List<Product> getAllProducts() {
		// TODO Auto-generated method stub
		return productRepository.findAll();
	}

	@Override
	public Product getProductById(Long id) {
		// TODO Auto-generated method stub
		return productRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Produit introuvable" + id));
	}

	@Override
	public Product createProduct(Product product) {
		// TODO Auto-generated method stub

		product.setReference(RandomString.make(7));
		return productRepository.save(product);
	}

	@Override
	public Product updateProduct(Product product) {
		// TODO Auto-generated method stub

		return productRepository.save(product);
	}

	@Override
	public void deleteProductById(Long id) {
		// TODO Auto-generated method stub

		productRepository.deleteById(id);
		;
	}

	@Override
	public List<Product> newProducts() {
		return productRepository.findAllByOrderByCreatedDateDesc();
	}

	@Override
	public List<Object[]> findAllBrandsAndProductIds() {
		return productRepository.findAllBrandsAndProductIds();
	}

	@Override
	public List<Product> findProductsByBrands(List<String> brands) {
		return productRepository.findByBrands(brands);
	}
	@Override
	public List<Product> findByCategoryIds(List<Long> categoryIds) {
		return productRepository.findByCategoryIds(categoryIds);
	}

	@Override
	public List<Product> findByCategoryId(Long categoryId) {
		return productRepository.findByCategoryId(categoryId);
	}
}