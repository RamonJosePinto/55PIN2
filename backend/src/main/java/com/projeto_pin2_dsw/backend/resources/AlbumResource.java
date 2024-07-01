package com.projeto_pin2_dsw.backend.resources;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.projeto_pin2_dsw.backend.model.*;
import com.projeto_pin2_dsw.backend.repository.AlbumRepository;
import com.projeto_pin2_dsw.backend.repository.FaixaRepository;
import com.projeto_pin2_dsw.backend.repository.GeneroRepository;
import com.projeto_pin2_dsw.backend.repository.UsuarioRepository;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

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
    
    @Autowired
    private GeneroRepository generoRepository;
    
    @Value("${images_directory}")
    private String IMAGES_DIR;
    
    @GetMapping("/search/{titulo}")
    public ResponseEntity<List<Album>> searchAlbums(@PathVariable String titulo) {
        List<Album> albums = albumRepository.findByTituloContaining(titulo);
        return ResponseEntity.ok(albums);
    }
    
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
        
       
        Set<Genero> generos = album.getGenero();
        if (generos != null) {
            Set<Genero> generosPersisted = new HashSet<>();
            for (Genero genero : generos) {
                Optional<Genero> generoEncontrado = generoRepository.findByNome(genero.getNome());
                if (generoEncontrado.isPresent()) {
                    generosPersisted.add(generoEncontrado.get());
                } else {
                    generosPersisted.add(generoRepository.save(genero));
                }
            }
            album.setGenero(generosPersisted);
        }
        
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
    
    @PutMapping("/{id}/imagem")
    public ResponseEntity<String> atualizarImagemCapa(@PathVariable int id, @RequestParam("imagem") MultipartFile imagem) {
        Optional<Album> albumOp = albumRepository.findById(id);

        if (!albumOp.isPresent()) {
            return new ResponseEntity<>("Álbum não encontrado", HttpStatus.NOT_FOUND);
        }

        Album album = albumOp.get();
        String nomeArquivo = "albums\\" + id + ".jpg";
        Path caminhoImagem = Paths.get(this.IMAGES_DIR + nomeArquivo);

        System.out.println(caminhoImagem.toString());
        
        try {
            Files.createDirectories(caminhoImagem.getParent());
            imagem.transferTo(caminhoImagem.toFile());
            album.setUrlImagemCapa(nomeArquivo.toString());
            albumRepository.save(album);
            return new ResponseEntity<>("Imagem do álbum atualizada com sucesso", HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Erro ao salvar a imagem", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
//    @PostMapping
//    public void setAlbumCover() {
//        
//    }

}
