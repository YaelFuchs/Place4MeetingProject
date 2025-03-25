package com.example.demo.service;

import com.example.demo.model.FavoritePlaces;
import com.example.demo.model.Places;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoritePlacesRepository extends JpaRepository<FavoritePlaces,Long> {
FavoritePlaces findByPlaceId(Long placeId);
}
