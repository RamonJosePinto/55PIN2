package com.projeto_pin2_dsw.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Genero {

    @Id
    @GeneratedValue
    private Integer id;
    
    private String nome;
    
    @ManyToMany(targetEntity = Album.class, mappedBy = "genero")
    @JsonIgnore
    private Set<Album> albuns;
    
    @ManyToMany(targetEntity = Performance.class, mappedBy = "genero")
    @JsonIgnore
    private Set<Performance> performances;
    
    public Genero() {}

    

    public Genero(Integer id, String nome, Set<Album> albuns, Set<Performance> performances) {
		super();
		this.id = id;
		this.nome = nome;
		this.albuns = albuns;
		this.performances = performances;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
    
    public Set<Album> getAlbuns() {
        return albuns;
    }

    public void setAlbuns(Set<Album> albuns) {
        this.albuns = albuns;
    }

    public Set<Performance> getPerformances() {
        return performances;
    }

    public void setPerformances(Set<Performance> performances) {
        this.performances = performances;
    }
}
