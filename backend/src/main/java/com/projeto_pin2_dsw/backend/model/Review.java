package com.projeto_pin2_dsw.backend.model;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@Entity
public class Review {
    
    @Id
    @GeneratedValue
    private int id;
    
    @ManyToOne(targetEntity = Usuario.class)
    private Usuario reviewer;
    
    @ManyToOne(targetEntity = Album.class)
    private Album album;

    private String texto;
    
    @Min(0)
    @Max(100)
    private int nota;
    
    private LocalDateTime dataHora;
    
    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Comentario> comentarios;

    public Review() {
    	
    }
    @PrePersist
    protected void onCreate() {
    	setDataHora(LocalDateTime.now());
    }

    public Review(int id, Usuario reviewer, Album album, String texto, int nota) {
        this.id = id;
        this.reviewer = reviewer;
        this.album = album;
        this.texto = texto;
        this.nota = nota;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Usuario getReviewer() {
        return reviewer;
    }

    public void setReviewer(Usuario reviewer) {
        this.reviewer = reviewer;
    }

    public Album getObra() {
        return album;
    }

    public void setObra(Album album) {
        this.album = album;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public int getNota() {
        return nota;
    }

    public void setNota(int nota) {
        this.nota = nota;
    }

    @Override
    public String toString() {
        return "Review{" + "id=" + id + ", reviewer=" + reviewer + ", album=" + album + ", texto=" + texto + ", nota=" + nota + ", data=" + dataHora +", comentarios= "+comentarios+"}'";
    }

	public LocalDateTime getDataHora() {
		return dataHora;
	}

	public void setDataHora(LocalDateTime dataHora) {
		this.dataHora = dataHora;
	}

	public List<Comentario> getComentarios() {
		return comentarios;
	}

	public void setComentarios(List<Comentario> comentarios) {
		this.comentarios = comentarios;
	}
	
	
    
}