package com.conecta_bairros.conectabairros.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("VOLUNTARIO")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class Voluntario extends Usuario {

    public Voluntario(String nome, String email, String senha, String endereco) {
        super(nome, email, senha, endereco);
    }
}
