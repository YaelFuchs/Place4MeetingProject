package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Entity
public class Places {

    @Id
    @GeneratedValue
    private Long id;
    private String placeName;
    private String address;
    private String phoneNumber;
    private String email;
    @ManyToOne
    private Category category;
    @ManyToOne
    private Area area;
    private String description;
    private String image;
//    @JsonProperty("openingHours")
//    private String openingHours;
    private String openingHours;
    private String status;
    private String link;
    @Column(nullable = true)
    private double averageRating;
    @OneToMany(mappedBy = "place")
    @JsonIgnore
    private List<Reviews> reviewsList=new ArrayList<>();



    public List<Reviews> getReviewsList() {
        return reviewsList;
    }

    public void setReviewsList(List<Reviews> reviewsList) {
        this.reviewsList = reviewsList;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }


    public String getPlaceName() {
        return placeName;
    }

    public void setPlaceName(String placeName) {
        this.placeName = placeName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }


    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
//
//    public String getOpeningHours() {
//        return openingHours;
//    }
//
//    public void setOpeningHours(String openingHours) {
//        this.openingHours = openingHours;
//    }


    public String getOpeningHours() {
        return openingHours;
    }

    public void setOpeningHours(String openingHours) {
        this.openingHours = openingHours;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public double getAverageRating() {
        averageRating = calculateAverageRating();
        return averageRating;
    }


    public double calculateAverageRating() {
        if (reviewsList == null || reviewsList.isEmpty()) {
            return 0.0;
        }

        double totalRating = 0.0;
        for (Reviews review : reviewsList) {
            totalRating += review.getRating();
        }
        return totalRating / reviewsList.size();
    }

//    public class OpeningHours {
//        @JsonProperty("sunday-thursday")
//        private OpeningHoursRange sundayToThursday;
//        @JsonProperty("friday")
//        private OpeningHoursRange friday;
//
//        public OpeningHoursRange getSundayToThursday() {
//            return sundayToThursday;
//        }
//
//        public void setSundayToThursday(OpeningHoursRange sundayToThursday) {
//            this.sundayToThursday = sundayToThursday;
//        }
//
//        public OpeningHoursRange getFriday() {
//            return friday;
//        }
//
//        public void setFriday(OpeningHoursRange friday) {
//            this.friday = friday;
//        }
//
//        public static class OpeningHoursRange {
//            private String start;
//            private String end;
//
//            public String getStart() {
//                return start;
//            }
//
//            public void setStart(String start) {
//                this.start = start;
//            }
//
//            public String getEnd() {
//                return end;
//            }
//
//            public void setEnd(String end) {
//                this.end = end;
//            }
//        }
//    }
}

