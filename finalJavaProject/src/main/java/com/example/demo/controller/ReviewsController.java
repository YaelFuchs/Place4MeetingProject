package com.example.demo.controller;

import com.example.demo.model.Bookings;
import com.example.demo.model.Places;
import com.example.demo.model.Reviews;
import com.example.demo.service.BookingsRepository;
import com.example.demo.service.PlacesRepository;
import com.example.demo.service.ReviewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequestMapping("api/Reviews")
@CrossOrigin
@RestController
//תגובות עבור מקום
public class ReviewsController {
    @Autowired
    private ReviewsRepository reviewsRepository;
    private PlacesRepository placesRepository;
    public ReviewsController(ReviewsRepository reviewsRepository, PlacesRepository placesRepository) {
        this.reviewsRepository = reviewsRepository;
        this.placesRepository = placesRepository;
    }
    @GetMapping("/getAllReviews/{id}")
    public ResponseEntity <List<Reviews>> getAllReviews(@PathVariable Long id) {
        Places place=placesRepository.findById(id).orElse(null);
        if(place==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
      List <Reviews> reviews=place.getReviewsList();
        return new ResponseEntity<>(reviews,HttpStatus.OK);
    }
    @GetMapping("/getReviewById/{id}")
    public ResponseEntity<Reviews> getReviewById(@PathVariable Long id) {
        Reviews review = reviewsRepository.findById(id).orElse(null);
        if (review == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(review, HttpStatus.OK);

    }
    @PostMapping("/addReview")
    public ResponseEntity <Reviews> addReview(@RequestBody Reviews review){
        Places place = placesRepository.findById(review.getPlace().getId()).orElse(null);
        if (place == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        place.getReviewsList().add(review);
        Reviews newReviews= reviewsRepository.save(review);
        return new ResponseEntity<>(newReviews, HttpStatus.CREATED);

    }
    @PutMapping("/updateReview/{id}")
    public ResponseEntity<Void> updateReview(@PathVariable Long id, @RequestBody  Reviews review){
        if(!Objects.equals(id, review.getId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        reviewsRepository.save(review);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @DeleteMapping("/deleteReview/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        Reviews reviewToDelete = reviewsRepository.findById(id).orElse(null);
         if (reviewToDelete == null) {
          return new ResponseEntity<>(HttpStatus.NOT_FOUND);
          }
        // מציאת המקום הקשור לתגובה
        Places place = reviewToDelete.getPlace();
        place.getReviewsList().remove(reviewToDelete);
        placesRepository.save(place);

        reviewsRepository.delete(reviewToDelete);
        return new ResponseEntity<>(HttpStatus.OK);
    }
//    @GetMapping("/getReviewsByPlaceId/{id}")
//    public ResponseEntity <List<Reviews>> getReviewsByPlaceId(@PathVariable Long id) {
//        List <Reviews> reviewsList=reviewsRepository.findByPlaceId(id);
//        if(reviewsList.isEmpty()) {
//            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//        }
//        return new ResponseEntity<>(reviewsList, HttpStatus.OK);
//    }



}
