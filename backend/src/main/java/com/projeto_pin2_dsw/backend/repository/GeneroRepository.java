package com.projeto_pin2_dsw.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto_pin2_dsw.backend.model.Genero;

@Repository
public interface GeneroRepository extends JpaRepository<Genero, Integer> {
	 Optional<Genero> findByNome(String nome);
}