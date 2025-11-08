package com.conecta_bairros.conectabairros.service;
import com.conecta_bairros.conectabairros.model.Atividade;
import com.conecta_bairros.conectabairros.model.Inscricao;
import com.conecta_bairros.conectabairros.model.Voluntario;
import com.conecta_bairros.conectabairros.repository.InscricaoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InscricaoService {

    @Autowired
    private InscricaoRepository inscricaoRepository;

    public Inscricao inscreverVoluntario(Voluntario voluntario, Atividade atividade) {
        // Lógica de validação (ex: vagas disponíveis, voluntário já inscrito)
        if (atividade.getVagasDisponiveis() <= 0) {
            throw new RuntimeException("Não há vagas disponíveis para esta atividade.");
        }

        Inscricao inscricao = new Inscricao();
        inscricao.setVoluntario(voluntario);
        inscricao.setAtividade(atividade);

        // Decrementa vagas (em um projeto real, isso seria transacional)
        atividade.setVagasDisponiveis(atividade.getVagasDisponiveis() - 1);

        return inscricaoRepository.save(inscricao);
    }

    public List<Inscricao> buscarInscricoesPorVoluntario(Voluntario voluntario) {
        return inscricaoRepository.findByVoluntario(voluntario);
    }

    public List<Inscricao> buscarInscricoesPorAtividade(Atividade atividade) {
        return inscricaoRepository.findByAtividade(atividade);
    }
}
