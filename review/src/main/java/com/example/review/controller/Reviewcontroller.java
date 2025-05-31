package com.example.review.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.review.model.Review;
import com.example.review.service.ReviewService;

@RestController
@CrossOrigin
public class Reviewcontroller {
    @Autowired
    public ReviewService reviewService;

    @PostMapping("/postreview")
    public void postreview(@RequestBody Review review){
        reviewService.saveReview(review);
    }

    @GetMapping("/getavg")
    public float getrating(){
        return reviewService.getrating();
    }

}   
