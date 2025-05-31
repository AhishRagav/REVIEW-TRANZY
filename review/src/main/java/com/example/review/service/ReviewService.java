package com.example.review.service;

import com.example.review.model.Review;
import com.example.review.repository.Repo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    @Autowired
    private Repo repo;

    public void saveReview(Review review) {
        repo.save(review);
    }

    public float getrating(){

        List <Review> list=repo.findAll();
        float sum=0;
        for(int i=0;i<list.size();i++){
            sum+=list.get(i).getReview();
        }
        int denominator=Math.max(list.size(),1);
        return sum/denominator;
    }
}
