package com.conecta_bairros.conectabairros.model;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@DiscriminatorValue("ORGANIZACAO")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class Organizacao extends Usuario {
    private String cnpj;

    @OneToMany(mappedBy = "organizacao")
    private List<Atividade> atividades;

    public Organizacao(String nome, String email, String senha, String endereco, String cnpj) {
        super(nome, email, senha, endereco);
        this.cnpj = cnpj;
    }
}
