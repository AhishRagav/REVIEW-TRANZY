package com.example.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.review.model.Review;

@Repository
public interface Repo  extends JpaRepository <Review,Integer>{

}
