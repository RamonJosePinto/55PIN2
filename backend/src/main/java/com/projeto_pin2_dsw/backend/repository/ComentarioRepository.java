package com.projeto_pin2_dsw.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto_pin2_dsw.backend.model.Comentario;
import com.projeto_pin2_dsw.backend.model.Review;

public interface ComentarioRepository extends JpaRepository<Comentario, Integer> { 
	
}