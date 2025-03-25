package com.example.demo.service;

import com.example.demo.model.OpeningHours;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OpeningHoursRepository extends JpaRepository<OpeningHours,Long> {
}
