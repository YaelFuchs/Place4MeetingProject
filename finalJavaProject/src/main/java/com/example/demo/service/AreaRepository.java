package com.example.demo.service;


import com.example.demo.model.Area;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AreaRepository extends JpaRepository<Area,Long> {
}
