package com.example.demo.controller;

import com.example.demo.model.Bookings;
import com.example.demo.model.Messages;
import com.example.demo.service.BookingsRepository;
import com.example.demo.service.MessagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/Messages")
@CrossOrigin
@RestController
//הודעות בין משתמשים
public class MessagesController {
    @Autowired
    private MessagesRepository messagesRepository;
    public MessagesController(MessagesRepository messagesRepository) {
        this.messagesRepository = messagesRepository;
    }

    @GetMapping("/getAllMessages")
    public List<Messages> getAllMessages() {
        return messagesRepository.findAll();
    }
    @GetMapping("/getMessageById/{id}")
    public ResponseEntity<Messages> getMessageById(@PathVariable Long id) {
        Messages message= messagesRepository.findById(id).orElse(null);
        if (message == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(message, HttpStatus.OK);

    }
    @PostMapping("/addMessage")
    public ResponseEntity <Messages> addMessage(@RequestBody Messages message){
        Messages newMessage= messagesRepository.save(message);
        return new ResponseEntity<>(newMessage, HttpStatus.CREATED);

    }
    @PutMapping("/updateMessage/{id}")
    public ResponseEntity updateMessage(@PathVariable long id, @RequestBody  Messages message){
        if(id!=message.getId()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        messagesRepository.save(message);
        return new ResponseEntity(HttpStatus.OK);
    }


    @DeleteMapping("/deleteMessage/{id}")
    public ResponseEntity deleteMessage(@PathVariable long id) {
        messagesRepository.deleteById(id);
        return new ResponseEntity(HttpStatus.OK);

    }

}
