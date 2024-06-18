package com.projeto_pin2_dsw.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import java.util.Date;
import java.util.Set;

@Entity
public class Performance /* extends Obra */ {
    
    @Id
    @GeneratedValue
    private Integer id;
    
    @ManyToMany(targetEntity = Usuario.class)
    private Set<Usuario> autores;
    
    private String titulo;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dataLancamento;
    
    @Enumerated(EnumType.STRING)
    private StatusObra status;
    
    public enum StatusObra {
        
        PENDENTE,
        APROVADA
        
    }
    
    @ManyToMany(targetEntity = Usuario.class)
    private Set<Usuario> participacoes;
    
    private String url;

    public Performance() {
    }

    public Performance(Integer id, Set<Usuario> autores, String titulo, Date dataLancamento, StatusObra status, Set<Usuario> participacoes, String url) {
        this.id = id;
        this.autores = autores;
        this.titulo = titulo;
        this.dataLancamento = dataLancamento;
        this.status = status;
        this.participacoes = participacoes;
        this.url = url;
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

    public Set<Usuario> getParticipacoes() {
        return participacoes;
    }

    public void setParticipacoes(Set<Usuario> participacoes) {
        this.participacoes = participacoes;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "Performance{" + "id=" + id + ", autores=" + autores + ", titulo=" + titulo + ", dataLancamento=" + dataLancamento + ", status=" + status + ", url=" + url + '}';
    }
    
}
