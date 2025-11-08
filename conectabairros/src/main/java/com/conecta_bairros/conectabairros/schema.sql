-- Esquema do Banco de Dados para "Conecta Bairros" (MySQL)

-- Tabela de Usuários (Superclasse para Voluntário e Organização)
CREATE TABLE IF NOT EXISTS usuario (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    endereco VARCHAR(500),
    tipo_usuario ENUM('VOLUNTARIO', 'ORGANIZACAO') NOT NULL
);

-- Tabela de Organizações (Extensão de Usuário)
CREATE TABLE IF NOT EXISTS organizacao (
    usuario_id BIGINT PRIMARY KEY,
    cnpj VARCHAR(18) UNIQUE,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Tabela de Atividades
CREATE TABLE IF NOT EXISTS atividade (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    tipo ENUM('SOCIAL', 'AMBIENTAL', 'EDUCACIONAL') NOT NULL,
    data DATE NOT NULL,
    local VARCHAR(500),
    vagas_disponiveis INT NOT NULL,
    organizacao_id BIGINT NOT NULL,
    FOREIGN KEY (organizacao_id) REFERENCES organizacao(usuario_id) ON DELETE CASCADE
);

-- Tabela de Inscrições
CREATE TABLE IF NOT EXISTS inscricao (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    voluntario_id BIGINT NOT NULL,
    atividade_id BIGINT NOT NULL,
    data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (voluntario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (atividade_id) REFERENCES atividade(id) ON DELETE CASCADE,
    UNIQUE KEY uk_voluntario_atividade (voluntario_id, atividade_id)
);

