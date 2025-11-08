package com.conecta_bairros.conectabairros.controller;
import com.conecta_bairros.conectabairros.model.Atividade;
import com.conecta_bairros.conectabairros.model.Inscricao;
import com.conecta_bairros.conectabairros.model.Voluntario;
import com.conecta_bairros.conectabairros.service.AtividadeService;
import com.conecta_bairros.conectabairros.service.InscricaoService;
import com.conecta_bairros.conectabairros.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inscricoes")
public class InscricaoController {

    @Autowired
    private InscricaoService inscricaoService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private AtividadeService atividadeService;

    @PostMapping("/voluntario/{voluntarioId}/atividade/{atividadeId}")
    public ResponseEntity<Inscricao> inscrever(
            @PathVariable Long voluntarioId,
            @PathVariable Long atividadeId) {

        Voluntario voluntario = (Voluntario) usuarioService.buscarPorId(voluntarioId)
                .orElseThrow(() -> new RuntimeException("Voluntário não encontrado"));

        Atividade atividade = atividadeService.buscarPorId(atividadeId)
                .orElseThrow(() -> new RuntimeException("Atividade não encontrada"));

        Inscricao novaInscricao = inscricaoService.inscreverVoluntario(voluntario, atividade);
        return new ResponseEntity<>(novaInscricao, HttpStatus.CREATED);
    }

    @GetMapping("/voluntario/{voluntarioId}")
    public ResponseEntity<List<Inscricao>> minhasInscricoes(@PathVariable Long voluntarioId) {
        Voluntario voluntario = (Voluntario) usuarioService.buscarPorId(voluntarioId)
                .orElseThrow(() -> new RuntimeException("Voluntário não encontrado"));

        List<Inscricao> inscricoes = inscricaoService.buscarInscricoesPorVoluntario(voluntario);
        return ResponseEntity.ok(inscricoes);
    }
}
