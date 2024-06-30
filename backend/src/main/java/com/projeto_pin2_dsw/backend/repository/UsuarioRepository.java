/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.projeto_pin2_dsw.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projeto_pin2_dsw.backend.model.Usuario;
import java.util.Optional;

/**
 *
 * @author guilh
 */
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    
    public Optional<Usuario> findByUsernameAndSenha(String username, String senha);
    
	List<Usuario> findByNomeIn(List<String> nomes);
}
