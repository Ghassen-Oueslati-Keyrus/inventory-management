package com.brain.ecommerce.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brain.ecommerce.models.Category;
import com.brain.ecommerce.repository.CategoryRepository;


@Service
public class CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;
	
	public List<Category> getAllCategories() {
		// TODO Auto-generated method stub
		return categoryRepository.findAll();
	}

	public Category getCategoryById(Long id) {
		// TODO Auto-generated method stub
		return categoryRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Categorie id invalide"));
	}

	public Category createCategory(Category category) {
		// TODO Auto-generated method stub
		return categoryRepository.save(category);
	}

	public Category updateCategory(Long id, Category category) {
		// TODO Auto-generated method stub
		Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Categorie id invalide"));
        existingCategory.setName(category.getName());
        return categoryRepository.save(existingCategory);
	}

	public void deleteCategory(Long id) {
		// TODO Auto-generated method stub
		Category category = categoryRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Categorie id invalide"));
		categoryRepository.delete(category);
	}

}
