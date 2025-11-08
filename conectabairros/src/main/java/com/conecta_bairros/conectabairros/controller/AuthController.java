package com.conecta_bairros.conectabairros.controller;
import com.conecta_bairros.conectabairros.model.Organizacao;
import com.conecta_bairros.conectabairros.model.Usuario;
import com.conecta_bairros.conectabairros.model.Voluntario;
import com.conecta_bairros.conectabairros.service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/register/voluntario")
    public ResponseEntity<Voluntario> registerVoluntario(@RequestBody Voluntario voluntario) {
        Voluntario novoVoluntario = (Voluntario) usuarioService.cadastrarUsuario(voluntario);
        return new ResponseEntity<>(novoVoluntario, HttpStatus.CREATED);
    }

    @PostMapping("/register/organizacao")
    public ResponseEntity<Organizacao> registerOrganizacao(@RequestBody Organizacao organizacao) {
        Organizacao novaOrganizacao = (Organizacao) usuarioService.cadastrarUsuario(organizacao);
        return new ResponseEntity<>(novaOrganizacao, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String senha = loginRequest.get("senha");

        Optional<Usuario> usuarioOpt = usuarioService.login(email, senha);

        if (usuarioOpt.isPresent()) {
            return ResponseEntity.ok(usuarioOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
