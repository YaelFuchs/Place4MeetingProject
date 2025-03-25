package com.example.demo.controller;

import com.example.demo.model.Bookings;
import com.example.demo.model.OpeningHours;
import com.example.demo.service.BookingsRepository;
import com.example.demo.service.OpeningHoursRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/OpeningHours")
@RestController
@CrossOrigin
//שעות פתיחה עבור מקום
public class OpeningHoursController {
    @Autowired
    private OpeningHoursRepository openingHoursRepository;
    public OpeningHoursController(OpeningHoursRepository openingHoursRepository ) {
        this.openingHoursRepository = openingHoursRepository;
    }
//    @GetMapping("/getAllOpeningHours")
//    public List<OpeningHours> getAllOpeningHours() {
//        return openingHoursRepository.findAll();
//    }
@GetMapping("/getByPlaceId/{id}")
public ResponseEntity<OpeningHours> getByPlaceId(@PathVariable Long id) {
    OpeningHours openingHour = openingHoursRepository.findById(id).orElse(null);
    if (openingHour == null) {
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(openingHour, HttpStatus.OK);
}
    @GetMapping("/getOpeningHourById/{id}")
    public ResponseEntity<OpeningHours> getOpeningHourById(@PathVariable Long id) {
        OpeningHours openingHour = openingHoursRepository.findById(id).orElse(null);
        if (openingHour == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(openingHour, HttpStatus.OK);

    }
    @PostMapping("/addOpeningHour")
    public ResponseEntity <OpeningHours> addOpeningHour(@RequestBody OpeningHours openingHour){
        OpeningHours newOpeningHour= openingHoursRepository.save(openingHour);
        return new ResponseEntity<>(newOpeningHour, HttpStatus.CREATED);

    }
    @PutMapping("/updateOpeningHour/{id}")
    public ResponseEntity updateOpeningHour(@PathVariable long id, @RequestBody  OpeningHours openingHour){
        if(id!=openingHour.getId()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        openingHoursRepository.save(openingHour);
        return new ResponseEntity(HttpStatus.OK);
    }


    @DeleteMapping("/deleteOpeningHour/{id}")
    public ResponseEntity deleteOpeningHour(@PathVariable long id) {
        openingHoursRepository.deleteById(id);
        return new ResponseEntity(HttpStatus.OK);

    }


}
