package com.example.demo.model;

import jakarta.persistence.*;

import java.sql.Time;

@Entity
public class OpeningHours {
    @Id
    @GeneratedValue
    private Long id;

    private String day1;
    private Time startTime;
    private Time endTime;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }



    public String getDay() {
        return day1;
    }

    public void setDay(String day) {
        this.day1 = day;
    }

    public Time getStartTime() {
        return startTime;
    }

    public void setStartTime(Time startTime) {
        this.startTime = startTime;
    }

    public Time getEndTime() {
        return endTime;
    }

    public void setEndTime(Time endTime) {
        this.endTime = endTime;
    }
}
