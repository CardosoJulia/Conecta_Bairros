package com.conecta_bairros.conectabairros.repository;
import com.conecta_bairros.conectabairros.model.Atividade;
import com.conecta_bairros.conectabairros.model.TipoAtividade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AtividadeRepository extends JpaRepository<Atividade, Long> {
    List<Atividade> findByLocalContainingIgnoreCase(String local);
    List<Atividade> findByTipo(TipoAtividade tipo);
}
