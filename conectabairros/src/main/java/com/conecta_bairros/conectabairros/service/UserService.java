package com.conecta_bairros.conectabairros.service;
import com.conecta_bairros.conectabairros.model.Usuario;            
import com.conecta_bairros.conectabairros.repository.Repository;

import java.util.Optional;

public class UserService {
    private final Repository<Usuario, Long> userRepository;

    public UserService(Repository<Usuario, Long> userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<Usuario> login(String email, String senha) {
        // Simulação: em um cenário real, buscaríamos o usuário pelo email e verificaríamos a senha
        // Aqui, apenas simulamos a busca e a validação
        Optional<Usuario> user = userRepository.findAll().stream()
                .filter(u -> u.getEmail().equals(email))
                .findFirst();

        if (user.isPresent() && user.get().login(email, senha)) {
            System.out.println("Login bem-sucedido para: " + email);
            return user;
        }
        System.out.println("Falha no login para: " + email);
        return Optional.empty();
    }

    public Usuario register(Usuario user) {
        // Lógica de validação e persistência
        System.out.println("Usuário " + user.getNome() + " registrado com sucesso.");
        return userRepository.save(user);
    }
}
