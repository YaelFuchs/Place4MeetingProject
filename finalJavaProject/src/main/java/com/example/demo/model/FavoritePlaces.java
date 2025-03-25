package com.example.demo.model;

import jakarta.persistence.*;
@Entity
public class FavoritePlaces {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    @JoinColumn(name = "PLACE_ID")
    private Places place;
    @ManyToOne
    @JoinColumn(name = "USERS_ID")
    private Users users;


    public Places getPlace() {
        return place;
    }

    public void setPlace(Places place) {
        this.place = place;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }


}
