/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.projeto_pin2_dsw.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import java.sql.Timestamp;

/**
 *
 * @author guilh
 */

@Entity
public class Sessao {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @ManyToOne(targetEntity = Usuario.class)
    private Usuario usuario;
    
    private Timestamp dataCriacao;    
    
    public Sessao(String id, Usuario usuario, Timestamp dataCriacao) {
        this.id = id;
        this.usuario = usuario;
        this.dataCriacao = dataCriacao;
    }
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Timestamp getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(Timestamp dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    @Override
    public String toString() {
        return "Sessao{" + "id=" + id + ", usuario=" + usuario + ", dataCriacao=" + dataCriacao + '}';
    }
    
}
