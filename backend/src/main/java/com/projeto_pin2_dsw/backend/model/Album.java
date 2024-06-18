package com.projeto_pin2_dsw.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
public class Album /*extends Obra*/ {
    
    @Id
    @GeneratedValue
    private Integer id;
    
    @ManyToMany(targetEntity = Usuario.class)
    private Set<Usuario> autores;
    
    private String titulo;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dataLancamento;
    
    @OneToMany(targetEntity = Faixa.class, mappedBy = "album")
    private List<Faixa> faixas;
    
    private String urlImagemCapa;
    
    @Enumerated(EnumType.STRING)
    private TipoAlbum tipo;

    public enum TipoAlbum {
        LP,
        EP,
        SINGLE
    }
    
/*  
    @Enumerated(EnumType.STRING)
    private StatusObra status;
    
    public enum StatusObra {
        
        PENDENTE,
        APROVADA
        
    }
*/

    public Album() {
    }

    public Album(Integer id, Set<Usuario> autores, String titulo, LocalDate dataLancamento, List<Faixa> faixas, String urlImagemCapa, TipoAlbum tipo) {
        this.id = id;
        this.autores = autores;
        this.titulo = titulo;
        this.dataLancamento = dataLancamento;
        this.faixas = faixas;
        this.urlImagemCapa = urlImagemCapa;
        this.tipo = tipo;
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

    public LocalDate getDataLancamento() {
        return dataLancamento;
    }

    public void setDataLancamento(LocalDate dataLancamento) {
        this.dataLancamento = dataLancamento;
    }

    public List<Faixa> getFaixas() {
        return faixas;
    }

    public void setFaixas(List<Faixa> faixas) {
        this.faixas = faixas;
    }

    public String getUrlImagemCapa() {
        return urlImagemCapa;
    }

    public void setUrlImagemCapa(String urlImagemCapa) {
        this.urlImagemCapa = urlImagemCapa;
    }

    public TipoAlbum getTipo() {
        return tipo;
    }

    public void setTipo(TipoAlbum tipo) {
        this.tipo = tipo;
    }

    @Override
    public String toString() {
        return "Album{" + "id=" + id + ", autores=" + autores + ", titulo=" + titulo + ", dataLancamento=" + dataLancamento + ", faixas=" + faixas + ", urlImagemCapa=" + urlImagemCapa + ", tipo=" + tipo + '}';
    }
    
}
