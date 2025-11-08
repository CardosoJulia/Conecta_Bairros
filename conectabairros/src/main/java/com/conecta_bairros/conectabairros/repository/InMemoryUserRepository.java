package com.conecta_bairros.conectabairros.repository;
import com.conecta_bairros.conectabairros.model.Usuario;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

// Esta classe simula a camada de persistência que, em um projeto real,
// faria a comunicação com o banco de dados (MySQL/PostgreSQL) via JDBC ou JPA.
public class InMemoryUserRepository implements Repository<Usuario, Long> {
    private final List<Usuario> users = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    @Override
    public Usuario save(Usuario entity) {
        if (entity.getId() == null) {
            // Simula a geração de ID pelo banco de dados
            entity.setId(idGenerator.getAndIncrement());
            users.add(entity);
            System.out.println("Usuário salvo (simulado): " + entity.getNome());
        } else {
            // Simula a atualização (simples)
            users.removeIf(u -> u.getId().equals(entity.getId()));
            users.add(entity);
            System.out.println("Usuário atualizado (simulado): " + entity.getNome());
        }
        return entity;
    }

    @Override
    public Optional<Usuario> findById(Long id) {
        return users.stream()
                .filter(u -> u.getId().equals(id))
                .findFirst();
    }

    @Override
    public List<Usuario> findAll() {
        return new ArrayList<>(users);
    }

    @Override
    public void deleteById(Long id) {
        users.removeIf(u -> u.getId().equals(id));
        System.out.println("Usuário deletado (simulado) com ID: " + id);
    }
}
