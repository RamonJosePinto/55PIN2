package com.projeto_pin2_dsw.backend.resources;

import com.projeto_pin2_dsw.backend.model.Album;
import com.projeto_pin2_dsw.backend.model.Usuario;
import com.projeto_pin2_dsw.backend.repository.UsuarioRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.Set;

@RestController
@RequestMapping("/users")
@Validated
public class UsuarioResource {

    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUser(@PathVariable int id, @RequestBody Usuario updatedUser) {
    	return usuarioRepository.findById(id)
            .map(user -> {
            	user.setUsername(updatedUser.getUsername());
                user.setNome(updatedUser.getNome());
                user.setEmail(updatedUser.getEmail());
                user.setPais(updatedUser.getPais());
                user.setSenha(updatedUser.getSenha());
                user.setBiografia(updatedUser.getBiografia());
                user.setTipo(updatedUser.getTipo());
                Usuario savedUser = usuarioRepository.save(user);
                return ResponseEntity.ok(savedUser);
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable int id) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
        if (usuarioOptional.isPresent()) {
            return ResponseEntity.ok(usuarioOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
    @GetMapping("/{id}/albums")
    public ResponseEntity<Set<Album>> getAlbumsDoUsuario(@PathVariable int id) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
        if (usuarioOptional.isPresent()) {
            return ResponseEntity.ok(usuarioOptional.get().getAlbuns());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<Usuario> postUsuario(@RequestBody @Valid Usuario usuario) {
        Usuario usuarioSalvo = usuarioRepository.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioSalvo);
    }
    
    @PostMapping("/login")
    public void login(
            @RequestHeader("Username") String username,
            @RequestHeader("Password") String senha) 
    {
        Optional<Usuario> usuarioOp = usuarioRepository.findByUsernameAndSenha(username, senha);
        if (!usuarioOp.isPresent())
            System.out.println("Não achou");
        else
            System.out.println(" ");
    }
    
    // Future implementation for login feature
    // @PostMapping("/login")
    // public ResponseEntity<String> login(@RequestBody LoginBean login) {
    //     List<Sessao> sessao = sessaoRepository.findByUsername(login.getUsername());
    //     return ResponseEntity.ok(sessao.toString());
    // }
    
    // @GetMapping("/{username}/login")
    // public ResponseEntity<String> teste(@PathVariable String username) {
    //     List<Sessao> sessao = sessaoRepository.findByUsername(username);
    //     return ResponseEntity.ok(sessao.toString());
    // }
}
