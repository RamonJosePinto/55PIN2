/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.projeto_pin2_dsw.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto_pin2_dsw.backend.model.Review;

/**
 *
 * @author guilh
 */
public interface ReviewRepository extends JpaRepository<Review, Integer> {
	  List<Review> findByAlbumId(Long obraId);
}