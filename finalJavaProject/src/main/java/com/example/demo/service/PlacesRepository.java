package com.example.demo.service;


import com.example.demo.model.Places;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlacesRepository extends JpaRepository<Places,Long> {
    Places findByPlaceName(String name);
    List<Places> findByCategoryId(Long id);
    List<Places> findByAreaId(Long id);
    List<Places> findByPlaceNameIsContaining(String search);




}
