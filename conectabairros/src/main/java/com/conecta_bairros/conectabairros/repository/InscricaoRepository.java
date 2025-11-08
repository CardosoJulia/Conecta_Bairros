package com.conecta_bairros.conectabairros.repository;
import com.conecta_bairros.conectabairros.model.Atividade;
import com.conecta_bairros.conectabairros.model.Inscricao;
import com.conecta_bairros.conectabairros.model.Voluntario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InscricaoRepository extends JpaRepository<Inscricao, Long> {
    List<Inscricao> findByVoluntario(Voluntario voluntario);
    List<Inscricao> findByAtividade(Atividade atividade);
}
