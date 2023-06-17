package com.brain.ecommerce.controllers;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.brain.ecommerce.models.Photo;
import com.brain.ecommerce.models.Product;
import com.brain.ecommerce.services.ProductServiceImpl;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("api/products")
public class ProductController {


	@Autowired
	private ProductServiceImpl productService;

	@GetMapping("/getAllProducts")
	public List<Product> getProducts() {
		return productService.getAllProducts();
	}

	@GetMapping("/{id}")
	public Product getProduct(@PathVariable Long id) {
		return productService.getProductById(id);
	}

	@PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	@ResponseBody
	public Product createProduct(@RequestPart("product") Product product,
			@RequestPart("imageFile") MultipartFile[] file) {
		try {
			product.setBrand(product.getBrand().toUpperCase());
			Set<Photo> photos = uploadImage(file);
			product.setPhotos(photos);

			return productService.createProduct(product);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}

	}

	public Set<Photo> uploadImage(MultipartFile[] multipartFiles) throws IOException {
		Set<Photo> photos = new HashSet<>();

		for (MultipartFile file : multipartFiles) {
			Photo photo = new Photo(
					file.getOriginalFilename(),
					file.getContentType(),
					file.getBytes());

			photos.add(photo);
		}

		return photos;
	}

	@PutMapping("/{id}")
	public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
		product.setId(id);
		product.setBrand(product.getBrand().toUpperCase());
		return productService.updateProduct(product);
	}

	@DeleteMapping("/{id}")
	public void deleteProduct(@PathVariable Long id) {
		productService.deleteProductById(id);
	}

	@GetMapping("/new")
	public List<Product> getNewProducts() {
		return productService.newProducts();
	}


	@GetMapping("/brands")
	public List<Object[]> getAllBrandsAndProductIds() {
		return productService.findAllBrandsAndProductIds();
	}

	@GetMapping("/by-brands")
	public List<Product> findProductsByBrand(@RequestParam("brands") List<String> brands) {
		return productService.findProductsByBrands(brands);
	}
	@GetMapping("/byCategoryIds")
	public List<Product> findByCategoryIds(@RequestParam("ids") List<Long> categoryIds) {
		return productService.findByCategoryIds(categoryIds);
	}

	@GetMapping("/byCategoryId/{id}")
	public List<Product> findByCategoryId(@PathVariable("id") Long categoryId) {
		return productService.findByCategoryId(categoryId);
	}
}
