package com.conecta_bairros.conectabairros.controller;

import com.conecta_bairros.conectabairros.AtividadeDTO;
import com.conecta_bairros.conectabairros.model.Atividade;
import com.conecta_bairros.conectabairros.model.Organizacao;
import com.conecta_bairros.conectabairros.model.TipoAtividade;
import com.conecta_bairros.conectabairros.service.AtividadeService;
import com.conecta_bairros.conectabairros.service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/atividades")
public class AtividadeController {

    @Autowired
    private AtividadeService atividadeService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/organizacao/{organizacaoId}")
    public ResponseEntity<AtividadeDTO> cadastrarAtividade(@PathVariable Long organizacaoId, @RequestBody Atividade atividade) {
        Organizacao organizacao = (Organizacao) usuarioService.buscarPorId(organizacaoId)
                .orElseThrow(() -> new RuntimeException("Organização não encontrada"));

        Atividade novaAtividade = atividadeService.cadastrarAtividade(atividade, organizacao);
        return new ResponseEntity<>(new AtividadeDTO(novaAtividade), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<AtividadeDTO>> buscarAtividades(
            @RequestParam(required = false) String local,
            @RequestParam(required = false) TipoAtividade tipo) {

        List<Atividade> atividades = atividadeService.buscarAtividades(local, tipo);
        List<AtividadeDTO> dtos = atividades.stream()
                                            .map(AtividadeDTO::new)
                                            .toList();
        return ResponseEntity.ok(dtos);
    }
}
