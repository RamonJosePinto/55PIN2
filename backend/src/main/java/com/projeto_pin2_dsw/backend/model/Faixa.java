package com.projeto_pin2_dsw.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Faixa {

    @Id
    @GeneratedValue
    private Integer id;
    
    private Integer numero;
    
    private String titulo;
    
    private Integer segundos;
    
    @ManyToOne(targetEntity = Album.class)
    @JsonIgnore
    private Album album;
    
//    @ManyToMany(targetEntity = Usuario.class)
//    private Set<Usuario> participacoesEspeciais = new HashSet<>();

    public Faixa() {
    }
    
    public Faixa(Integer id, Integer numero, String titulo, Integer segundos, Album album) {
        this.id = id;
        this.numero = numero;
        this.titulo = titulo;
        this.segundos = segundos;
        this.album = album;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Integer getSegundos() {
        return segundos;
    }

    public void setSegundos(Integer segundos) {
        this.segundos = segundos;
    }

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    @Override
    public String toString() {
        return "Faixa{" + "id=" + id + ", numero=" + numero + ", titulo=" + titulo + ", segundos=" + segundos + ", album=" + album.getTitulo() + '}';
    }
    
}
