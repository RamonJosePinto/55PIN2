package com.projeto_pin2_dsw.backend.resources;

import com.projeto_pin2_dsw.backend.model.Album;
import com.projeto_pin2_dsw.backend.model.Genero;
import com.projeto_pin2_dsw.backend.model.Performance;
import com.projeto_pin2_dsw.backend.model.Usuario;
import com.projeto_pin2_dsw.backend.repository.PerformanceRepository;
import com.projeto_pin2_dsw.backend.repository.UsuarioRepository;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/performances")
@Validated
public class PerformanceResource {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PerformanceRepository performanceRepository;
    
    
    @GetMapping("/{id}")
    public ResponseEntity<Performance> getPerformance(@PathVariable int id) {
        Optional<Performance> albumOptional = performanceRepository.findById(id);
        if (albumOptional.isPresent()) {
            return ResponseEntity.ok(albumOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
	   @GetMapping
	    public ResponseEntity<List<Performance>> getAllPerformances() {
	        List<Performance> performance = performanceRepository.findAll();
	        return ResponseEntity.ok().body(performance);
	    }
    
    @PostMapping
    @Transactional
    public ResponseEntity createPerformance(@RequestBody Performance performance) {
        
        // Recupera e associa os autores ao álbum.
        Set<Usuario> autores = performance.getAutores();
        
        if (autores != null) {
            System.out.println("Autores: " + autores.toString());
            Set<Usuario> autoresPersisted = new HashSet<>();
            for (Usuario autor : autores) {
                Optional<Usuario> autorEncontrado = usuarioRepository.findById(autor.getId());
                if (autorEncontrado.isPresent())
                    autoresPersisted.add(autorEncontrado.get());
                else
                    throw new RuntimeException("Autor não encontrado");
            }
            System.out.println(autoresPersisted);
            performance.setAutores(autoresPersisted);
        }
        // else... bad request
        
        System.out.println(performance);
        
        Performance savedPerformance = performanceRepository.save(performance);

        return ResponseEntity.ok(savedPerformance);
    }
    
}
