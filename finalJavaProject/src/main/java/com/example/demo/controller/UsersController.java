package com.example.demo.controller;

import com.example.demo.dto.UsersDto;
import com.example.demo.model.FavoritePlaces;
import com.example.demo.model.Users;
import com.example.demo.service.MapStructMapper;
import com.example.demo.service.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;


@RequestMapping("api/Users")
@CrossOrigin
@RestController
//משתמש
public class UsersController {
    //המרה למחלקות שונות
    private MapStructMapper mapStructMapper;
    //ניתוב של הפרויקט הנוכחי
    private static String DIRECTORY_PATH = System.getProperty("user.dir") + "//Images//";

    @Autowired
    private UsersRepository usersRepository;

    public UsersController(UsersRepository usersRepository, MapStructMapper mapStructMapper) {
        this.usersRepository = usersRepository;
        this.mapStructMapper = mapStructMapper;
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<UsersDto>> getAllUsers() throws IOException{
        List<Users> users = usersRepository.findAll();
        List<UsersDto> usersDto = mapStructMapper.mapUsers(users);
        return new ResponseEntity<>(usersDto, HttpStatus.OK);
    }
    @GetMapping("/getUserById/{id}")
    public ResponseEntity<UsersDto> getUserById(@PathVariable Long id) throws IOException {
        Users user = usersRepository.findById(id).orElse(null);
        if(user == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(mapStructMapper.usersToDto(user), HttpStatus.OK);

    }
    @GetMapping("/getImageByUserId/{id}")
    public ResponseEntity<String> getImageByUserId(@PathVariable Long id) {
        Users user = usersRepository.findById(id).orElse(null);
        if(user == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(user.getImage(), HttpStatus.OK);
    }

    @GetMapping("/getId/{id}")
    public ResponseEntity<Users> getId(@PathVariable Long id){
        Users user = usersRepository.findById(id).orElse(null);
        if(user == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @PutMapping("/updateUser/{id}")
    public ResponseEntity<UsersDto> updateUser(@PathVariable Long id, @RequestPart(value = "users")Users user, @RequestPart(value = "image", required = false) MultipartFile file) throws IOException {
        if (!Objects.equals(id, user.getId())) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Users existingUser = usersRepository.findById(id).orElse(null);
        if (existingUser == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        existingUser.setUserName(user.getUserName());
        existingUser.setPassword(user.getPassword());
        existingUser.setEmail(user.getEmail());
        existingUser.setPhone(user.getPhone());
        if (file!=null && !file.isEmpty()) {
            Path pathImage = Paths.get(DIRECTORY_PATH + file.getOriginalFilename());
            //שמירת התמונה בנתיב
            Files.write(pathImage, file.getBytes());
            existingUser.setImage( DIRECTORY_PATH + file.getOriginalFilename());
        } else {
            System.out.println(user.getImage());
            existingUser.setImage(user.getImage());
            System.out.println(existingUser.getImage());
        }
        UsersDto usersDto = mapStructMapper.usersToDto(existingUser);
        Users updatedUser = usersRepository.save(existingUser);
        return new ResponseEntity<>(usersDto, HttpStatus.OK);

    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity <Void> deleteUser(@PathVariable Long id) {
        boolean b=usersRepository.existsById(id);
        if(b) {
            usersRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    }

    @PostMapping("/signup")
    public ResponseEntity<Users> signup(@RequestPart("users") Users user, @RequestPart(value = "image", required = false) MultipartFile file ) throws IOException {
        Users existingUser =usersRepository.findByUserNameEquals(user.getUserName());
        if(existingUser!=null) {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }

        if(file !=null && !file.isEmpty() ) {
            Path pathImage= Paths.get(DIRECTORY_PATH+file.getOriginalFilename());
//            byte [] arr= Files.readAllBytes(pathImage);
            //שמירת התמונה בנתיב
            Files.write(pathImage,file.getBytes());
            //עידכון ניתוב בdata
            user.setImage(DIRECTORY_PATH+file.getOriginalFilename());
        }
        else {
            Path pathImage= Paths.get(DIRECTORY_PATH+"//option1.jpg");
            //נתיב מוחלט
            user.setImage("E:\\שנה ב\\פרוייקט\\finalJavaProject\\Images\\option1.jpg");
        }
        Users newUser=usersRepository.save(user);
        return new ResponseEntity<>(newUser,HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity <UsersDto> login(@RequestBody Users newUser) throws IOException{
        Users users =usersRepository.findByUserNameEquals(newUser.getUserName());
        if(users==null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        if(users.getUserName().equals(newUser.getUserName()) && users.getPassword().equals(newUser.getPassword())) {
            return new ResponseEntity<>(mapStructMapper.usersToDto(users), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    @GetMapping("/findIdByName")
    public ResponseEntity<Long> findIdByName(@RequestBody String user) {
        List<Users> usersList = usersRepository.findAll();
        for (Users u : usersList) {
            if (u.getUserName().equals(user)){
                return ResponseEntity.ok(u.getId());
            }
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
//    @GetMapping("/")
//   @GetMapping("/getAllFavoritePlacesByUser/{id}")
//    public ResponseEntity findAllFavoritePlacesByUser(@PathVariable Long id){
//        List<FavoritePlaces> favoritePlaces=
//   }

    //    @PostMapping("/upload")
    //    public ResponseEntity<Users> upload(@RequestPart("users") Users users, @RequestPart("image") MultipartFile file ) throws IOException {
    //       Path pathImage= Paths.get(DIRECTORY_PATH+file.getOriginalFilename());
    //
    //       //שמירת התמונה בנתיב
    //       Files.write(pathImage,file.getBytes());
    //       //עידכון ניתוב בdata
    //       users.setImage(pathImage.toString());
    //      Users newUser= usersRepository.save(users);
    //      return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    //    }
    //    @PostMapping("/signup")
    //    public ResponseEntity<UsersDto> signup(@RequestBody Users user) throws IOException {
    //        Users users =usersRepository.findByUserNameEquals(user.getUserName());
    //        if(users!=null) {
    //            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
    //        }
    //        user.setImage(DIRECTORY_PATH+"JUMPRO~4.BMP");
    //        Users newUser=usersRepository.save(user);
    //        return new ResponseEntity<>(mapStructMapper.usersToDto(newUser),HttpStatus.CREATED);
    //    }
    //    @GetMapping("getById/{id}")
    //    public ResponseEntity <UsersDto> getById(@PathVariable Long id) throws IOException {
    //        Users newUser = usersRepository.findById(id).orElse(null);
    //        Path path=Paths.get(newUser.getImage());
    //        byte[] bytes= Files.readAllBytes(path);
    //        UsersDto usersDto=new UsersDto();
    //        usersDto.setId(newUser.getId());
    //        usersDto.setImage(bytes);
    //        return new ResponseEntity<>(mapStructMapper.usersToDto(newUser), HttpStatus.OK);
    //
    //    }

    //    @PutMapping("/updateUser/{id}")
    //    public ResponseEntity<Void> updateUser(@PathVariable Long id, @RequestBody  Users user){
    //        if(id!=user.getId()) {
    //            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    //        }
    //        usersRepository.save(user);
    //        return new ResponseEntity<>(HttpStatus.OK);
    //    }

    //    public ResponseEntity<UsersDto> signup(@RequestPart("users") Users user, @RequestPart("file") byte[] file ) throws IOException {

    //    @PostMapping("/signup")
    //   public ResponseEntity<UsersDto> signup(@RequestPart("users") Users user, @RequestPart(value = "image", required = false) MultipartFile file ) throws IOException {
    //        Users existingUser =usersRepository.findByUserNameEquals(user.getUserName());
    //            if(existingUser!=null) {
    //                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
    //            }
    //            if(!file.isEmpty()) {
    //            Path pathImage= Paths.get(DIRECTORY_PATH+file.getOriginalFilename());
    ////            byte [] arr= Files.readAllBytes(pathImage);
    //               //שמירת התמונה בנתיב
    //            Files.write(pathImage,file.getBytes());
    //            //עידכון ניתוב בdata
    //            user.setImage(pathImage.toString());
    //            }
    //            else {
    //            user.setImage(DEFALT_PATH);
    //            }
    //        Users newUser=usersRepository.save(user);
    //        return new ResponseEntity<>(mapStructMapper.usersToDto(newUser),HttpStatus.CREATED);
    //    }
}
