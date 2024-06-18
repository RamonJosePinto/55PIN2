/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.projeto_pin2_dsw.backend.repository;

import com.projeto_pin2_dsw.backend.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author guilh
 */
public interface AlbumRepository extends JpaRepository<Album, Integer> {
    
    
    
}
