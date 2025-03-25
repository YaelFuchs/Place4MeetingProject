package com.example.demo.controller;

import com.example.demo.model.Bookings;
import com.example.demo.model.OrderHistory;
import com.example.demo.service.BookingsRepository;
import com.example.demo.service.OrderHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/OrderHistory")
@CrossOrigin
@RestController
//היסטוריית הזמנות
public class OrderHistoryController {
    @Autowired
    private OrderHistoryRepository orderHistoryRepository;
    public OrderHistoryController(OrderHistoryRepository orderHistoryRepository ) {
        this.orderHistoryRepository = orderHistoryRepository;
    }
    @GetMapping("/getAllOrderHistory")
    public List<OrderHistory> getAllOrderHistory() {
        return orderHistoryRepository.findAll();
    }
    @GetMapping("/getOrderHistoryById/{id}")
    public ResponseEntity<OrderHistory> getOrderHistoryById(@PathVariable Long id) {
        OrderHistory orderHistory = orderHistoryRepository.findById(id).orElse(null);
        if (orderHistory == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(orderHistory, HttpStatus.OK);

    }
    @PostMapping("/addOrderHistory")
    public ResponseEntity <OrderHistory> addOrderHistory(@RequestBody OrderHistory orderHistory){
        OrderHistory newOrderHistory= orderHistoryRepository.save(orderHistory);
        return new ResponseEntity<>(newOrderHistory, HttpStatus.CREATED);

    }
    @PutMapping("/updateOrderHistory/{id}")
    public ResponseEntity updateOrderHistory(@PathVariable long id, @RequestBody  OrderHistory orderHistory){
        if(id!=orderHistory.getId()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        orderHistoryRepository.save(orderHistory);
        return new ResponseEntity(HttpStatus.OK);
    }


//    @DeleteMapping("/deleteOrderHistory/{id}")
//    public ResponseEntity deleteOrderHistory(@PathVariable long id) {
//        orderHistoryRepository.deleteById(id);
//        return new ResponseEntity(HttpStatus.OK);
//
//    }
}
