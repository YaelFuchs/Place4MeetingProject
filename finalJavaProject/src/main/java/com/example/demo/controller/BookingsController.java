package com.example.demo.controller;

import com.example.demo.model.Bookings;
import com.example.demo.service.BookingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/Bookings")
@CrossOrigin
@RestController
//הזמנות
public class BookingsController {
    @Autowired
    private BookingsRepository bookingsRepository;
    public BookingsController(BookingsRepository bookingsRepository ) {
        this.bookingsRepository = bookingsRepository;
    }

    @GetMapping("/getAllBookings")
    public List<Bookings> getAllBookings() {
        return bookingsRepository.findAll();
    }
    @GetMapping("/getBookingById/{id}")
    public ResponseEntity<Bookings> getBookingById(@PathVariable Long id) {
        Bookings bookings = bookingsRepository.findById(id).orElse(null);
        if (bookings == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(bookings, HttpStatus.OK);

    }
    @PostMapping("/addBooking")
    public ResponseEntity <Bookings> addBooking(@RequestBody Bookings booking){
        Bookings newBookings= bookingsRepository.save(booking);
        return new ResponseEntity<>(newBookings, HttpStatus.CREATED);

    }
    @PutMapping("/updateBooking/{id}")
    public ResponseEntity updateBooking(@PathVariable long id, @RequestBody  Bookings booking){
        if(id!=booking.getId()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        bookingsRepository.save(booking);
        return new ResponseEntity(HttpStatus.OK);
    }


    @DeleteMapping("/deleteBooking/{id}")
    public ResponseEntity deleteBooking(@PathVariable long id) {
        bookingsRepository.deleteById(id);
        return new ResponseEntity(HttpStatus.OK);

    }


}
