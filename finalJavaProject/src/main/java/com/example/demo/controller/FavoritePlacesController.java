package com.example.demo.controller;

import com.example.demo.dto.PlaceDto;
import com.example.demo.model.Bookings;
import com.example.demo.model.FavoritePlaces;
import com.example.demo.model.Places;
import com.example.demo.model.Users;
import com.example.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequestMapping("api/FavoritePlaces")
@CrossOrigin
@RestController
//מקומות שהמשתמש אהב

public class FavoritePlacesController {
    @Autowired
    private FavoritePlacesRepository favoritePlacesRepository;
    private PlacesRepository placesRepository;
    private MapStructMapper mapStructMapper;
    private UsersRepository usersRepository;

    public FavoritePlacesController(FavoritePlacesRepository favoritePlacesRepository,UsersRepository usersRepository,PlacesRepository placesRepository,MapStructMapper mapStructMapper ) {
        this.favoritePlacesRepository= favoritePlacesRepository;
        this.usersRepository = usersRepository;
        this.placesRepository = placesRepository;
        this.mapStructMapper = mapStructMapper;
    }
    @GetMapping("/getAllFavoritePlaces/{id}")
    public ResponseEntity<List<PlaceDto>> getAllFavoritePlaces(@PathVariable Long id) throws Exception {
        Users user = usersRepository.findById(id).orElse(null);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<FavoritePlaces> favoritePlaces = user.getFavoritePlaces();

        if (favoritePlaces.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        List <PlaceDto> placesDto = new ArrayList<>();
        for (FavoritePlaces favoritePlace : favoritePlaces) {
            placesDto.add(mapStructMapper.placeToDto(favoritePlace.getPlace()));
        }
        return new ResponseEntity<>(placesDto, HttpStatus.OK);
    }

    @PostMapping("/addFavoritePlace")
    public ResponseEntity <Void> addFavoritePlace(@RequestBody FavoritePlaces favoritePlace){
        Users user = usersRepository.findById(favoritePlace.getUsers().getId()).orElse(null);
        if(user==null ) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

        }
        for (FavoritePlaces favoritePlace2: user.getFavoritePlaces()){
            if (favoritePlace2.getPlace().getId().equals(favoritePlace.getPlace().getId())) {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            }
        }
        user.getFavoritePlaces().add(favoritePlace);
        favoritePlacesRepository.save(favoritePlace);
        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    @DeleteMapping("/deleteFavoritePlace/{id}")
    public ResponseEntity deleteFavoritePlace(@PathVariable Long id) {
       FavoritePlaces favoritePlace = favoritePlacesRepository.findByPlaceId(id);
       if(favoritePlace == null) {
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
       }
       Users user=favoritePlace.getUsers();
       user.getFavoritePlaces().remove(favoritePlace);
       favoritePlacesRepository.deleteById(favoritePlace.getId());
        return new ResponseEntity(HttpStatus.OK);

    }



}
