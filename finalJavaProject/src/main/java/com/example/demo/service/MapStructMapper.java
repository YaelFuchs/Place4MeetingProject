package com.example.demo.service;


import com.example.demo.dto.PlaceDto;
import com.example.demo.dto.UsersDto;
import com.example.demo.model.Places;
import com.example.demo.model.Users;
import org.mapstruct.Mapper;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.util.List;

//ממשק המאפשר לבצע המרה ממחלקה אחת למחלקה אחרת
@Mapper(componentModel = "spring")
public interface MapStructMapper {
List <UsersDto> mapUsers(List<Users> users);
List <PlaceDto> mapPlace(List<Places>places );


    default UsersDto usersToDto(Users user) throws IOException {
        UsersDto usersDto = new UsersDto();
        usersDto.setId(user.getId());
        usersDto.setUserName(user.getUserName());
        usersDto.setEmail(user.getEmail());
        usersDto.setPassword(user.getPassword());
        usersDto.setPhone(user.getPhone());

//     //המרה ממחרוזת לביטים
        Path path= Paths.get(user.getImage());
        byte[] bytes= Files.readAllBytes(path);
        if (bytes != null) {
            usersDto.setImage(bytes);
        }

        return usersDto;
    }

    default PlaceDto placeToDto(Places place) throws IOException {
        PlaceDto placeDtos = new PlaceDto();
        placeDtos.setId(place.getId());
        placeDtos.setPlaceName(place.getPlaceName());
        placeDtos.setEmail(place.getEmail());
        placeDtos.setAddress(place.getAddress());
        placeDtos.setPhoneNumber(place.getPhoneNumber());
        placeDtos.setCategory(place.getCategory());
        placeDtos.setArea(place.getArea());
        placeDtos.setDescription(place.getDescription());
        placeDtos.setStatus(place.getStatus());
        placeDtos.setLink(place.getLink());
//     //המרה ממחרוזת לביטים
        Path path= Paths.get(place.getImage());
        byte[] bytes= Files.readAllBytes(path);
        if (bytes != null) {
            placeDtos.setImage(bytes);
        }

        return placeDtos;
    }



}
