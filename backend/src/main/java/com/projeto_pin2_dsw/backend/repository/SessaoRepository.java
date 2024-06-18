/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.projeto_pin2_dsw.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projeto_pin2_dsw.backend.model.Sessao;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author guilh
 */
public interface SessaoRepository extends JpaRepository<Sessao, String> {
    
    @Query("SELECT s FROM Sessao s WHERE s.usuario.username = :username")
    List<Sessao> findByUsername(@Param("username") String username);
    
}
