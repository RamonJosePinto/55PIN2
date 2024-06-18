/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.projeto_pin2_dsw.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projeto_pin2_dsw.backend.model.Usuario;

/**
 *
 * @author guilh
 */
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    
}
