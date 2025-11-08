package com.conecta_bairros.conectabairros.service;
import com.conecta_bairros.conectabairros.model.Atividade;
import com.conecta_bairros.conectabairros.model.Organizacao;
import com.conecta_bairros.conectabairros.model.TipoAtividade;
import com.conecta_bairros.conectabairros.repository.AtividadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AtividadeService {

    @Autowired
    private AtividadeRepository atividadeRepository;

    public Atividade cadastrarAtividade(Atividade atividade, Organizacao organizacao) {
        atividade.setOrganizacao(organizacao);
        return atividadeRepository.save(atividade);
    }

    public List<Atividade> buscarAtividades(String local, TipoAtividade tipo) {
        if (local != null && !local.isEmpty()) {
            return atividadeRepository.findByLocalContainingIgnoreCase(local);
        }
        if (tipo != null) {
            return atividadeRepository.findByTipo(tipo);
        }
        return atividadeRepository.findAll();
    }

    public Optional<Atividade> buscarPorId(Long id) {
        return atividadeRepository.findById(id);
    }
}
