package com.projeto_pin2_dsw.backend.resources;

import com.projeto_pin2_dsw.backend.model.Album;
import com.projeto_pin2_dsw.backend.model.Sessao;
import com.projeto_pin2_dsw.backend.model.Usuario;
import com.projeto_pin2_dsw.backend.repository.SessaoRepository;
import com.projeto_pin2_dsw.backend.repository.UsuarioRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/users")
@Validated
public class UsuarioResource {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private SessaoRepository sessaoRepository;
   
    @Value("${images_directory}")
    private String IMAGES_DIR;

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUser(@PathVariable Integer id, @RequestBody Usuario updatedUser) {
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
    //@PostMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable int id, @RequestHeader("Authorization") String auth) {
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

    private boolean validarSessao(@RequestHeader("SessionId") String sessionId) {
        Optional<Sessao> sessaoOp = sessaoRepository.findTopByIdOrderByDataCriacaoDesc(sessionId);
        if (!sessaoOp.isPresent())
            return sessaoOp.get().isValida();

        return false;
    }

    @PostMapping("/login")
    public ResponseEntity<Sessao> login(
            @RequestHeader("Username") String username,
            @RequestHeader("Password") String senha) {
        Optional<Usuario> usuarioOp = usuarioRepository.findByUsernameAndSenha(username, senha);
        if (!usuarioOp.isPresent())
            return null;

        Usuario usuario = usuarioOp.get();

        // Nova sessão
        Sessao novaSessao = criarSessao(usuario);
        return ResponseEntity.ok(novaSessao);
    }

    @PostMapping("/{id}/logout")
    public ResponseEntity logout(@PathVariable int id) {
        Optional<Usuario> usuarioOp = usuarioRepository.findById(id);
        if (!usuarioOp.isPresent())
            return null;

        Usuario usuario = usuarioOp.get();

        List<Sessao> sessoes = sessaoRepository.findByUsername(usuario.getUsername());
        for (Sessao s : sessoes) {
            s.setValida(false);
        }

        sessaoRepository.saveAll(sessoes);
        return ResponseEntity.ok(null);
    }

    private Sessao criarSessao(Usuario usuario) {
        // Inativar última sessão.
        Optional<Sessao> ultimaSessaoOp = sessaoRepository.findTopByUsuarioAndValidaOrderByDataCriacaoDesc(usuario);
        if (ultimaSessaoOp.isPresent()) {
            Sessao ultimaSessao = ultimaSessaoOp.get();
            ultimaSessao.setValida(false);
            sessaoRepository.save(ultimaSessao);
        }

        // Criar nova sessão.
        Sessao sessao = new Sessao(usuario, LocalDateTime.now());
        sessao.setValida(true);
        Sessao sessaoSalva = sessaoRepository.save(sessao);
        return sessaoSalva;
    }

    @GetMapping("/validateAuthors")
    public ResponseEntity<List<Usuario>> validateAuthors(@RequestParam String nomes) {
        List<String> nomeList = Arrays.asList(nomes.split(","));
        List<Usuario> autores = usuarioRepository.findByNomeIn(nomeList);
        return ResponseEntity.ok(autores);
    }
    
    @PutMapping("/{id}/imagem")
    public ResponseEntity<String> atualizarImagemPerfil(@PathVariable int id, @RequestParam("imagem") MultipartFile imagem) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);

        if (!usuarioOpt.isPresent()) {
            return new ResponseEntity<>("Usuário não encontrado", HttpStatus.NOT_FOUND);
        }

        Usuario usuario = usuarioOpt.get();
        String nomeArquivo = "users\\" + id + ".jpg";
        Path caminhoImagem = Paths.get(this.IMAGES_DIR + nomeArquivo);

        System.out.println(caminhoImagem.toString());
        
        try {
            Files.createDirectories(caminhoImagem.getParent());
            imagem.transferTo(caminhoImagem.toFile());
            usuario.setCaminhoImagem(caminhoImagem.toString());
            usuarioRepository.save(usuario);
            return new ResponseEntity<>("Imagem do perfil atualizada com sucesso", HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Erro ao salvar a imagem", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Future implementation for login feature
    // @PostMapping("/login")
    // public ResponseEntity<String> login(@RequestBody LoginBean login) {
    // List<Sessao> sessao = sessaoRepository.findByUsername(login.getUsername());
    // return ResponseEntity.ok(sessao.toString());
    // }

    // @GetMapping("/{username}/login")
    // public ResponseEntity<String> teste(@PathVariable String username) {
    // List<Sessao> sessao = sessaoRepository.findByUsername(username);
    // return ResponseEntity.ok(sessao.toString());
    // }
}
