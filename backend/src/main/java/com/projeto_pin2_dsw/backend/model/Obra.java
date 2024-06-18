/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.projeto_pin2_dsw.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.MappedSuperclass;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 *
 * @author guilh
 */

//@Entity
public abstract class Obra {
    
//    @Id
//    @GeneratedValue
    private Integer id;
    
//    @ManyToMany(targetEntity = Usuario.class)
    private Set<Usuario> autores;
    
    private String titulo;
    
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dataLancamento;
    
//    @Enumerated(EnumType.STRING)
    private StatusObra status;
    
    public enum StatusObra {
        
        PENDENTE,
        APROVADA
        
    }

    public Obra() {
        this.autores = new HashSet<>();
    }
    
    public Obra(Integer id, Set<Usuario> autores, String titulo, Date dataLancamento, StatusObra status) {
        this.id = id;
        this.autores = autores;
        this.titulo = titulo;
        this.dataLancamento = dataLancamento;
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Set<Usuario> getAutores() {
        return autores;
    }

    public void setAutores(Set<Usuario> autores) {
        this.autores = autores;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Date getDataLancamento() {
        return dataLancamento;
    }

    public void setDataLancamento(Date dataLancamento) {
        this.dataLancamento = dataLancamento;
    }

    public StatusObra getStatus() {
        return status;
    }

    public void setStatus(StatusObra status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Obra{" + "id=" + id + ", autores=" + autores + ", titulo=" + titulo + ", dataLancamento=" + dataLancamento + ", status=" + status + '}';
    }
    
}
