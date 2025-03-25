package com.example.demo.service;

import com.example.demo.model.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingsRepository extends JpaRepository<Bookings,Long> {
}
