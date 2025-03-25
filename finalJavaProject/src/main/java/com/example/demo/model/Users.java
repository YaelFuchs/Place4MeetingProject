package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.*;

@Entity
public class Users {
    @Id
    @GeneratedValue
    private Long id;
    private String userName;
    private String password;
    private String email;
    private String phone;


   @OneToMany(mappedBy = "users")
   @JsonIgnore
    private List<FavoritePlaces> favoritePlaces = new LinkedList<>();
    private String image;



    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<FavoritePlaces> getFavoritePlaces() {
        return favoritePlaces;
    }

    public void setFavoritePlaces(List<FavoritePlaces> favoritePlaces) {
        this.favoritePlaces = favoritePlaces;
    }
}