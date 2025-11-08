package com.conecta_bairros.conectabairros;
import com.conecta_bairros.conectabairros.model.Atividade;

public class AtividadeDTO {

    private Long id;
    private String titulo;
    private String descricao;
    private String tipo;
    private String data;
    private String local;
    private int vagasDisponiveis;

    public AtividadeDTO(Atividade atividade) {
        this.id = atividade.getId();
        this.titulo = atividade.getTitulo();
        this.descricao = atividade.getDescricao();
        this.tipo = atividade.getTipo().name();
        this.data = atividade.getData().toString();
        this.local = atividade.getLocal();
        this.vagasDisponiveis = atividade.getVagasDisponiveis();
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getData() { return data; }
    public void setData(String data) { this.data = data; }
    public String getLocal() { return local; }
    public void setLocal(String local) { this.local = local; }
    public int getVagasDisponiveis() { return vagasDisponiveis; }
    public void setVagasDisponiveis(int vagasDisponiveis) { this.vagasDisponiveis = vagasDisponiveis; }
}
