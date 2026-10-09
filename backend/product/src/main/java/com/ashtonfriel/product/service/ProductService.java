package com.ashtonfriel.product.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ashtonfriel.product.dto.CreateProductRequest;
import com.ashtonfriel.product.dto.ProductResponse;
import com.ashtonfriel.product.entity.ProductEntity;
import com.ashtonfriel.product.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<ProductResponse> list() {
        return repo.findAll().stream()
                .map(p -> new ProductResponse(p.getId(), p.getName()))
                .toList();
    }

    public ProductResponse create(CreateProductRequest request) {
        ProductEntity saved = repo.save(new ProductEntity(request.name()));
        return new ProductResponse(saved.getId(), saved.getName());
    }
}
