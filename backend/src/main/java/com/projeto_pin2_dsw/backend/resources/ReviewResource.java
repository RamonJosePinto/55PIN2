package com.projeto_pin2_dsw.backend.resources;

import com.projeto_pin2_dsw.backend.model.Review;
import com.projeto_pin2_dsw.backend.repository.ReviewRepository;
import com.projeto_pin2_dsw.backend.repository.UsuarioRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reviews")
@Validated
public class ReviewResource {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private ReviewRepository reviewRepository;
    
    @PostMapping("/album")
    public ResponseEntity<Review> createAlbumReview(@RequestBody Review review) {
        Review savedReview = reviewRepository.save(review);
        return ResponseEntity.ok(savedReview);
    }

    @PostMapping("/performance")
    public ResponseEntity<Review> createPerformanceReview(@RequestBody Review review) {
        Review savedReview = reviewRepository.save(review);
        return ResponseEntity.ok(savedReview);
    }
    
    @GetMapping
    public ResponseEntity<List<Review>> findAllReviews() {
        List<Review> reviews = this.reviewRepository.findAll();
        return ResponseEntity.ok(reviews);
    }
    
    @GetMapping("/album/{albumId}")
    public List<Review> getReviewsByAlbumId(@PathVariable Long albumId) {
        return reviewRepository.findByAlbumId(albumId);
    }
    
    @GetMapping("/performance/{performanceId}")
    public List<Review> getReviewsByPerformanceId(@PathVariable int performanceId) {
        return reviewRepository.findByPerformanceId(performanceId);
    }
    
}