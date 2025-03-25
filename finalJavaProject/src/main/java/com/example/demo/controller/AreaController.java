package com.example.demo.controller;

import com.example.demo.model.Area;
import com.example.demo.service.AreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RequestMapping("api/Area")
@CrossOrigin
@RestController
public class AreaController {
    @Autowired
    private AreaRepository areaRepository;
    public AreaController(AreaRepository areaRepository) {
        this.areaRepository = areaRepository;
    }

    @GetMapping("/getAllArea")
    public List<Area> getAllArea() {
        return areaRepository.findAll();
    }

    @GetMapping("/getAreaById/{id}")
    public ResponseEntity<Area> getAreaById(@PathVariable Long id) {
        Area area = areaRepository.findById(id).orElse(null);
        if (area == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(area, HttpStatus.OK);

    }

    @PostMapping("/addArea")
    public ResponseEntity<Area> addArea(@RequestBody Area area) {
        List <Area> list = areaRepository.findAll();
        for (Area a : list) {
            if(a.getAreaName().equals(area.getAreaName())) {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            }
        }
        Area newArea=areaRepository.save(area);
        return new ResponseEntity<>(newArea,HttpStatus.CREATED);
    }

    @PutMapping("/updateArea/{id}")
    public ResponseEntity<Area> updateArea(@PathVariable Long id, @RequestBody Area area){
        if(!Objects.equals(id, area.getId())) {
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }
        areaRepository.save(area);
        return new ResponseEntity<>(area,HttpStatus.OK);
    }


    @DeleteMapping("/deleteArea/{id}")
    public ResponseEntity deleteArea(@PathVariable long id) {
        areaRepository.deleteById(id);
        return new ResponseEntity(HttpStatus.OK);

    }
}
