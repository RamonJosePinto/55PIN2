package com.projeto_pin2_dsw.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.Size;
import java.util.Set;

@Entity
public class Usuario {
    
    @Id
    @GeneratedValue
    private int id;
    
    @ManyToMany(targetEntity = Album.class, mappedBy = "autores")
    @JsonIgnore
    private Set<Album> albuns;
    
    @ManyToMany(targetEntity = Performance.class, mappedBy = "autores")
    @JsonIgnore
    private Set<Performance> performances;
    
//    @ManyToMany(mappedBy = "participacoesEspeciais")
//    @JsonIgnore
//    private Set<Faixa> participacoesEspeciais;
    
//    @Column(unique = true)
    private String username;
    
    private String nome;
    private String email;
    private String pais;
    private String senha;
    private String biografia;
    private String caminhoImagem;
    
    @Enumerated(EnumType.STRING)
    private TipoUsuario tipo;
    
    public enum TipoUsuario {
        
        ARTISTA,
        REVIEWER

    }

    public Usuario() {
    }

    public Usuario(int id, Set<Album> albuns, Set<Performance> performances, String username, String nome, String email, String pais, String senha, String biografia, TipoUsuario tipo) {
        this.id = id;
        this.albuns = albuns;
        this.performances = performances;
        this.username = username;
        this.nome = nome;
        this.email = email;
        this.pais = pais;
        this.senha = senha;
        this.biografia = biografia;
        this.tipo = tipo;
    }

    public Usuario(int id, Set<Album> albuns, Set<Performance> performances, String username, String nome, String email, String pais, String senha, String biografia, String caminhoImagem, TipoUsuario tipo) {
        this.id = id;
        this.albuns = albuns;
        this.performances = performances;
        this.username = username;
        this.nome = nome;
        this.email = email;
        this.pais = pais;
        this.senha = senha;
        this.biografia = biografia;
        this.caminhoImagem = caminhoImagem;
        this.tipo = tipo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getBiografia() {
        return biografia;
    }

    public void setBiografia(String biografia) {
        this.biografia = biografia;
    }

    public TipoUsuario getTipo() {
        return tipo;
    }

    public void setTipo(TipoUsuario tipo) {
        this.tipo = tipo;
    }

    public String getCaminhoImagem() {
        return caminhoImagem;
    }

    public void setCaminhoImagem(String caminhoImagem) {
        this.caminhoImagem = caminhoImagem;
    }

    @Override
    public String toString() {
        return "Usuario{" + "id=" + id + /* ", albuns=" + albuns + ", performances=" + performances + */ ", username=" + username + ", nome=" + nome + ", email=" + email + ", pais=" + pais + ", senha=" + senha + ", biografia=" + biografia + ", tipo=" + tipo + '}';
    }
    
}
