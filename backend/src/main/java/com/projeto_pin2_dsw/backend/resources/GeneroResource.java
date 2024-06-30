package com.projeto_pin2_dsw.backend.resources;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto_pin2_dsw.backend.model.Album;
import com.projeto_pin2_dsw.backend.model.Genero;
import com.projeto_pin2_dsw.backend.repository.GeneroRepository;

@RestController
@RequestMapping("/gender")
public class GeneroResource {
	
	@Autowired
	private GeneroRepository generoRepository;
	
	   @GetMapping
	    public ResponseEntity<List<Genero>> getAllAlbums() {
	        List<Genero> genero = generoRepository.findAll();
	        return ResponseEntity.ok().body(genero);
	    }
	   
	    @PostMapping
	    public ResponseEntity<Genero> createGenero(@RequestBody Genero genero) {
	        Genero savedGenero = generoRepository.save(genero);
	        return ResponseEntity.status(201).body(savedGenero);
	    }
}
