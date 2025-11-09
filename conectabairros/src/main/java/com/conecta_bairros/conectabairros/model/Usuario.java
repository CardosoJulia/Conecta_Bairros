package com.conecta_bairros.conectabairros.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo_usuario", discriminatorType = DiscriminatorType.STRING)
@Data
@NoArgsConstructor
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "tipo_usuario", // O nome exato do campo que o JS espera!
        visible = true
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = Voluntario.class, name = "VOLUNTARIO"),
        @JsonSubTypes.Type(value = Organizacao.class, name = "ORGANIZACAO")
})
public abstract class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private String senha; // Em um projeto real, a senha seria hasheada
    private String endereco;

    // Construtor para facilitar a criação de objetos
    public Usuario(String nome, String email, String senha, String endereco) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.endereco = endereco;
    }

    public boolean login(String email2, String senha2) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'login'");
    }
}