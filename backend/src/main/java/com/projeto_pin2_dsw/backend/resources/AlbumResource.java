package com.projeto_pin2_dsw.backend.resources;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.projeto_pin2_dsw.backend.model.*;
import com.projeto_pin2_dsw.backend.repository.AlbumRepository;
import com.projeto_pin2_dsw.backend.repository.FaixaRepository;
import com.projeto_pin2_dsw.backend.repository.UsuarioRepository;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/albums")
@Validated
public class AlbumResource {

    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private FaixaRepository faixaRepository;
    
    @GetMapping
    public ResponseEntity<List<Album>> getAllAlbums() {
        List<Album> albums = albumRepository.findAll();
        return ResponseEntity.ok().body(albums);
    }
    
    
    @GetMapping("/{id}")
    public ResponseEntity<Album> getAlbum(@PathVariable int id) {
        Optional<Album> albumOptional = albumRepository.findById(id);
        if (albumOptional.isPresent()) {
            return ResponseEntity.ok(albumOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
    @PostMapping
    @Transactional
    public ResponseEntity createAlbum(@RequestBody Album album) {
        
        // Recupera e associa os autores ao álbum.
        Set<Usuario> autores = album.getAutores();
        
        if (autores != null) {
            Set<Usuario> autoresPersisted = new HashSet<>();
            for (Usuario autor : autores) {
                Optional<Usuario> autorEncontrado = usuarioRepository.findById(autor.getId());
                if (autorEncontrado.isPresent())
                    autoresPersisted.add(autorEncontrado.get());
                else
                    throw new RuntimeException("Autor não encontrado");
            }
            System.out.println(autoresPersisted);
            album.setAutores(autoresPersisted);
        }
        // else... bad request
        
        // Associa o álbum a cada faixa informada.
        List<Faixa> faixas = album.getFaixas();
        if (faixas != null) {
            for (Faixa faixa : faixas) {
                faixa.setAlbum(album);
            }
        }
        
        Album savedAlbum = albumRepository.save(album);
        if (faixas != null)
            faixaRepository.saveAll(faixas);

        return ResponseEntity.ok(savedAlbum);
    }
    
    
//    @PostMapping
//    public void setAlbumCover() {
//        
//    }

}
