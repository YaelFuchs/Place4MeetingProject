package com.example.demo.controller;

import com.example.demo.model.Bookings;
import com.example.demo.model.Category;
import com.example.demo.model.Users;
import com.example.demo.service.BookingsRepository;
import com.example.demo.service.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;
import java.util.Objects;

@RequestMapping("api/Category")
@CrossOrigin
@RestController
//קטגוריה
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/getAllCategory")
    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }

    @GetMapping("/getCategoryById/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Category categories = categoryRepository.findById(id).orElse(null);
        if (categories == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(categories, HttpStatus.OK);

    }

    @PostMapping("/addCategory")
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        List <Category> list = categoryRepository.findAll();
        for (Category c : list) {
            if(c.getCategoryName().equals(category.getCategoryName())) {
                return new ResponseEntity<>(c, HttpStatus.CONFLICT);
            }
        }
        Category newCategory=categoryRepository.save(category);
        return new ResponseEntity<>(newCategory,HttpStatus.CREATED);
    }

    @PutMapping("/updateCategory/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category){
        if(!Objects.equals(id, category.getId())) {
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }
        categoryRepository.save(category);
        return new ResponseEntity<>(category,HttpStatus.OK);
    }


    @DeleteMapping("/deleteCategory/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable long id) {
        categoryRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);

    }

}
