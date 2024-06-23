package com.projeto_pin2_dsw.backend.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto_pin2_dsw.backend.model.Comentario;
import com.projeto_pin2_dsw.backend.model.Review;
import com.projeto_pin2_dsw.backend.repository.ComentarioRepository;

@RestController
@RequestMapping("/comentarios")
@Validated
public class ComentarioResource {
	
	@Autowired
	private ComentarioRepository comentarioRepository;

	@PostMapping
    public ResponseEntity<Comentario> createComentario(@RequestBody Comentario comentario) {
        Comentario savedReview = this.comentarioRepository.save(comentario);
        return ResponseEntity.ok(savedReview);
    }
	
	  @GetMapping
	    public ResponseEntity<List<Comentario>> findAllComentario() {
	        List<Comentario> reviews = this.comentarioRepository.findAll();
	        return ResponseEntity.ok(reviews);
	    }
	
	
    
}
