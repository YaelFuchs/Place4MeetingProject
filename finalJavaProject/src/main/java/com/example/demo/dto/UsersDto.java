package com.example.demo.dto;

import com.example.demo.model.FavoritePlaces;
import com.example.demo.model.Messages;
import com.example.demo.model.OrderHistory;

import java.util.List;

public class UsersDto {
    private Long id;
    private String userName;
    private String password;
    private String email;
    private String phone;
    private byte [] image;
    private List<FavoritePlaces> favoritePlaces;
    private List<OrderHistory> orderHistory;
    private List<Messages> sentMessages;
    private List<Messages> receivedMessages;

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


    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public List<FavoritePlaces> getFavoritePlaces() {
        return favoritePlaces;
    }

    public void setFavoritePlaces(List<FavoritePlaces> favoritePlaces) {
        this.favoritePlaces = favoritePlaces;
    }

    public List<OrderHistory> getOrderHistory() {
        return orderHistory;
    }

    public void setOrderHistory(List<OrderHistory> orderHistory) {
        this.orderHistory = orderHistory;
    }

    public List<Messages> getSentMessages() {
        return sentMessages;
    }

    public void setSentMessages(List<Messages> sentMessages) {
        this.sentMessages = sentMessages;
    }

    public List<Messages> getReceivedMessages() {
        return receivedMessages;
    }

    public void setReceivedMessages(List<Messages> receivedMessages) {
        this.receivedMessages = receivedMessages;
    }
}
