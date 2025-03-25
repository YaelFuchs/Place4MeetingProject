package com.example.demo.controller;


import com.example.demo.dto.PlaceDto;
import com.example.demo.model.Places;
import com.example.demo.model.Users;
import com.example.demo.service.MapStructMapper;
import com.example.demo.service.PlacesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

@RequestMapping("api/Places")
@CrossOrigin
@RestController
//מקומות
public class PlacesController {
    private MapStructMapper mapStructMapper;
    //ניתוב של הפרויקט הנוכחי
    private static final String DIRECTORY_PATH=System.getProperty("user.dir")+"//Images//";
    @Autowired
    private PlacesRepository placesRepository;



    public PlacesController(PlacesRepository placesRepository ,  MapStructMapper mapStructMapper ) {
        this.placesRepository = placesRepository;
        this.mapStructMapper=mapStructMapper;

    }
    @GetMapping("/getAllPlaces")
    public ResponseEntity <List<PlaceDto>> getAllPlaces ()  throws IOException {
        List<Places> places = placesRepository.findAll();
        List<PlaceDto> placesDto = mapStructMapper.mapPlace(places);
        return new ResponseEntity<>(placesDto, HttpStatus.OK);
    }

    @GetMapping("/getPlaceById/{id}")
    public ResponseEntity<PlaceDto> getPlaceById(@PathVariable Long id) throws IOException {
        Places place = placesRepository.findById(id).orElse(null);
        if (place == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(mapStructMapper.placeToDto(place), HttpStatus.OK);

    }
    @GetMapping("/getPlaceByRId/{id}")
    public ResponseEntity<Places> getPlaceByRId(@PathVariable Long id) throws IOException {
        Places place = placesRepository.findById(id).orElse(null);
        if (place == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(place, HttpStatus.OK);

    }
    @PostMapping("/addPlaces")
    public ResponseEntity <PlaceDto> addPlaces(@RequestPart("place") Places place, @RequestPart(value = "image", required = false) MultipartFile file )throws IOException{
        Places existingPlace = placesRepository.findByPlaceName(place.getPlaceName());
        if(existingPlace!=null) {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
        if (file!=null &&!file.isEmpty()) {
            Path pathImage = Paths.get(DIRECTORY_PATH + file.getOriginalFilename());
            //שמירת התמונה בנתיב
            Files.write(pathImage, file.getBytes());
            //עידכון ניתוב בdata
            place.setImage(DIRECTORY_PATH + file.getOriginalFilename());
        }
        else{
            Path pathImage= Paths.get(DIRECTORY_PATH+"//defaultPlace.jpeg");
            place.setImage("E:\\שנה ב\\פרוייקט\\finalJavaProject\\Images\\defaultPlace.jpeg");

        }
        Places newPlaces= placesRepository.save(place);
        return new ResponseEntity<>(mapStructMapper.placeToDto(newPlaces), HttpStatus.CREATED);

    }
    @PutMapping("/updatePlaces/{id}")
    public ResponseEntity<PlaceDto> updatePlaces(@PathVariable Long id,  @RequestBody Places place) throws IOException{
        if(!Objects.equals(id, place.getId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Places existingPlace = placesRepository.findById(id).orElse(null);
        if(existingPlace == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        existingPlace.setPlaceName(place.getPlaceName());
        existingPlace.setAddress(place.getAddress());
        existingPlace.setPhoneNumber(place.getPhoneNumber());
        existingPlace.setEmail(place.getEmail());
        existingPlace.setDescription(place.getDescription());
        existingPlace.setOpeningHours(place.getOpeningHours());
        existingPlace.setStatus(place.getStatus());
        existingPlace.setLink(place.getLink());
        existingPlace.setImage(DIRECTORY_PATH+place.getImage());
        placesRepository.save(existingPlace);
        return new ResponseEntity<>(mapStructMapper.placeToDto(existingPlace), HttpStatus.OK);

    }


    @DeleteMapping("/deletePlaces/{id}")
    public ResponseEntity<Void> deletePlaces(@PathVariable long id) {
        boolean b=placesRepository.existsById(id);
        if(b) {
            placesRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/getImageByPlaceId/{id}")
    public ResponseEntity<String> getImageByPlaceId(@PathVariable Long id) {
        Places place = placesRepository.findById(id).orElse(null);
        if(place == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(place.getImage(), HttpStatus.OK);
    }


    @GetMapping("/getAllBySearch/{search}")
    public ResponseEntity<List<PlaceDto>> getAllBySearch(@PathVariable String search) {
        List<Places> placesList = placesRepository.findByPlaceNameIsContaining(search);
        if(placesList.isEmpty())
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(mapStructMapper.mapPlace(placesList), HttpStatus.OK);
    }

    @GetMapping("/getPlacesByCategory/{id}")
    public ResponseEntity<List<PlaceDto>> getPlacesByCategory(@PathVariable Long id)throws IOException {
        List<Places> places = placesRepository.findByCategoryId(id); // Assuming you have a findByCategoryId method in your repository

        if (places.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(mapStructMapper.mapPlace(places), HttpStatus.OK);
    }


    @GetMapping("/getPlacesByArea/{id}")
    public ResponseEntity<List<PlaceDto>> getPlacesByArea(@PathVariable Long id)throws IOException {
        List<Places> places = placesRepository.findByAreaId(id); // Assuming you have a findByCategoryId method in your repository
        if (places.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(mapStructMapper.mapPlace(places), HttpStatus.OK);

    }
//    @PutMapping("/updatePlaces/{id}")
//    public ResponseEntity<PlaceDto> updatePlaces(@PathVariable Long id,  @RequestPart(value = "place")Places place, @RequestPart(value = "image", required = false) MultipartFile file) throws IOException{
//        if(!Objects.equals(id, place.getId())) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//        Places existingPlace = placesRepository.findById(id).orElse(null);
//        if(existingPlace == null) {
//            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//        }
//        existingPlace.setPlaceName(place.getPlaceName());
//        existingPlace.setAddress(place.getAddress());
//        existingPlace.setPhoneNumber(place.getPhoneNumber());
//        existingPlace.setEmail(place.getEmail());
//        existingPlace.setDescription(place.getDescription());
//        existingPlace.setOpeningHours(place.getOpeningHours());
//        existingPlace.setStatus(place.getStatus());
//        existingPlace.setLink(place.getLink());
//        if (!file.isEmpty()) {
//            Path pathImage = Paths.get(DIRECTORY_PATH + file.getOriginalFilename());
//            //שמירת התמונה בנתיב
//            Files.write(pathImage, file.getBytes());
//            existingPlace.setImage( DIRECTORY_PATH + file.getOriginalFilename());
//        } else {
//            existingPlace.setImage(place.getImage());
//        }
//        Places updatedPlaces = placesRepository.save(existingPlace);
//        return new ResponseEntity<>(mapStructMapper.placeToDto(existingPlace), HttpStatus.OK);
//
//    }
    //למקרה שיהיה בעיה המחלקה הרגילה של המקומות
//package com.example.demo.controller;
//
//
//import com.example.demo.dto.PlaceDto;
//import com.example.demo.model.Places;
//import com.example.demo.service.MapStructMapper;
//import com.example.demo.service.PlacesRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;


//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Objects;
//
//    @RequestMapping("api/Places")
//    @CrossOrigin
//    @RestController
////מקומות
//    public class PlacesController {
//        private MapStructMapper mapStructMapper;
//        //ניתוב של הפרויקט הנוכחי
//        private static final String DIRECTORY_PATH=System.getProperty("user.dir")+"//Images//";
//        @Autowired
//        private PlacesRepository placesRepository;
//
//
//
//        public PlacesController(PlacesRepository placesRepository ,  MapStructMapper mapStructMapper ) {
//            this.placesRepository = placesRepository;
//            this.mapStructMapper=mapStructMapper;
//
//        }
//        @GetMapping("/getAllPlaces")
//        public ResponseEntity <List<PlaceDto>> getAllPlaces ()  throws IOException {
//            List<Places> places = placesRepository.findAll();
//            List<PlaceDto> placesDto = mapStructMapper.mapPlace(places);
//            return new ResponseEntity<>(placesDto, HttpStatus.OK);
//        }
//        @GetMapping("/getAllPlace")
//        public ResponseEntity <List<PlaceDto>> getAllPlace ()   {
//            List<Places> places = placesRepository.findAll();
//            List <PlaceDto> placesDto = mapStructMapper.mapPlace(places);
//            return new ResponseEntity<>(placesDto, HttpStatus.OK);
//        }
//        @GetMapping("/getPlaceById/{id}")
//        public ResponseEntity<PlaceDto> getPlaceById(@PathVariable Long id) throws IOException {
//            Places place = placesRepository.findById(id).orElse(null);
//            if (place == null) {
//                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//            }
//            return new ResponseEntity<>(mapStructMapper.placeToDto(place), HttpStatus.OK);
//
//        }
//        @PostMapping("/addPlaces")
//        public ResponseEntity <Places> addPlaces(@RequestPart("place") Places place, @RequestPart(value = "image", required = false) MultipartFile file )throws IOException{
//            Places existingPlace = placesRepository.findByPlaceName(place.getPlaceName());
//            if(existingPlace!=null) {
//                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
//            }
//            if (!file.isEmpty()) {
//                Path pathImage = Paths.get(DIRECTORY_PATH + file.getOriginalFilename());
//                //שמירת התמונה בנתיב
//                Files.write(pathImage, file.getBytes());
//                //עידכון ניתוב בdata
//                place.setImage(DIRECTORY_PATH + file.getOriginalFilename());
//            }
//            else{
//                Path pathImage= Paths.get(DIRECTORY_PATH+"//defaultPlace.jpeg");
//                place.setImage("E:\\שנה ב\\פרוייקט\\finalJavaProject\\Images\\defaultPlace.jpeg");
//
//            }
//            Places newPlaces= placesRepository.save(place);
//            return new ResponseEntity<>(newPlaces, HttpStatus.CREATED);
//
//        }
//        @PutMapping("/updatePlaces/{id}")
//        public ResponseEntity<PlaceDto> updatePlaces(@PathVariable Long id,  @RequestBody Places place) throws IOException{
//            if(!Objects.equals(id, place.getId())) {
//                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//            }
//            Places existingPlace = placesRepository.findById(id).orElse(null);
//            if(existingPlace == null) {
//                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//            }
//            existingPlace.setPlaceName(place.getPlaceName());
//            existingPlace.setAddress(place.getAddress());
//            existingPlace.setPhoneNumber(place.getPhoneNumber());
//            existingPlace.setEmail(place.getEmail());
//            existingPlace.setDescription(place.getDescription());
//            existingPlace.setOpeningHours(place.getOpeningHours());
//            existingPlace.setStatus(place.getStatus());
//            existingPlace.setLink(place.getLink());
//            existingPlace.setImage(DIRECTORY_PATH+place.getImage());
//            placesRepository.save(existingPlace);
//            return new ResponseEntity<>(mapStructMapper.placeToDto(existingPlace), HttpStatus.OK);
//
//        }
//
//
//        @DeleteMapping("/deletePlaces/{id}")
//        public ResponseEntity<Void> deletePlaces(@PathVariable long id) {
//            boolean b=placesRepository.existsById(id);
//            if(b) {
//                placesRepository.deleteById(id);
//                return new ResponseEntity<>(HttpStatus.OK);
//            }
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//
//
//        @GetMapping("/getByPlaceName")
//        public ResponseEntity<PlaceDto> getByPlaceName(@RequestParam String placeName)throws IOException  {
//            Places places= placesRepository.findByPlaceName(placeName);
//            if (places == null) {
//                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//            }
//            return new ResponseEntity<>(mapStructMapper.placeToDto(places),HttpStatus.OK);
//        }
//        @GetMapping("/getPlacesByCategory/{id}")
//        public ResponseEntity<List<PlaceDto>> getPlacesByCategory(@PathVariable Long id)throws IOException {
//            List <Places> allPlaces =placesRepository.findAll();
//            List <Places> places =new ArrayList<>();
//            for (Places place : allPlaces) {
//                if (place.getCategory().getId() == id) {
//                    places.add(place);
//                }
//            }
//            if (places.isEmpty()) {
//                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//            }
//            return new ResponseEntity<>(mapStructMapper.mapPlace(places), HttpStatus.OK);
//        }

}
