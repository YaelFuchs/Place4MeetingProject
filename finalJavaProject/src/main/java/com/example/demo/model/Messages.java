package com.example.demo.model;

import jakarta.persistence.*;
import org.apache.catalina.User;

@Entity
public class Messages {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Users sender;

    @ManyToOne
    private Users receiver;
    private String message;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Users getSender() {
        return sender;
    }

    public void setSender(Users sender) {
        this.sender = sender;
    }

    public Users getReceiver() {
        return receiver;
    }

    public void setReceiver(Users receiver) {
        this.receiver = receiver;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
