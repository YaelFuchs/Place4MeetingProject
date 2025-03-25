package com.example.demo.service;

import com.example.demo.model.Places;
import com.example.demo.model.Reviews;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewsRepository extends JpaRepository<Reviews,Long> {
    List<Reviews> findByPlaceId(Long id);

}
