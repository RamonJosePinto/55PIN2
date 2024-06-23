package com.projeto_pin2_dsw.backend.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;

@Entity
public class Comentario {
    @Id
    @GeneratedValue
    private int id;
    
    @ManyToOne(targetEntity = Usuario.class)
    private Usuario reviewer;
    
    private String texto;
    
    private LocalDateTime dataHora;
    
    @ManyToOne(targetEntity = Review.class)
    @JsonBackReference
    private Review review;
//    private List<Resposta> respostas
    
    @PrePersist
    protected void onCreate() {
    	dataHora = LocalDateTime.now();
    }

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	public LocalDateTime getDataHora() {
		return dataHora;
	}

	public void setDataHora(LocalDateTime dataHora) {
		this.dataHora = dataHora;
	}

	public Review getReview() {
		return review;
	}

	public void setReview(Review review) {
		this.review = review;
	}

	@Override
	public String toString() {
		return "Comentario {id=" + id + ", texto=" + texto + ", dataHora=" + dataHora + ", review=" + review + ", usuario=" + reviewer +"}";
	}

	public Usuario getReviewer() {
		return reviewer;
	}

	public void setReviewer(Usuario reviewer) {
		this.reviewer = reviewer;
	}

}
