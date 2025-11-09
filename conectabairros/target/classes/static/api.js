const BASE_URL = 'http://localhost:8080/api';

/**
 * Lida com respostas da API, convertendo para JSON ou jogando um erro.
 */
async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erro ${response.status}`);
    }
    // Retorna JSON se houver conteúdo, senão retorna null
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
    } else {
        return null; // Para respostas 201 CREATED sem corpo
    }
}

/**
 * Tenta fazer login.
 * @returns {Promise<Object>} Dados do usuário logado
 */
export async function login(email, senha) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    });
    return handleResponse(response);
}

/**
 * Registra um novo Voluntário.
 */
export async function registerVoluntario(data) {
    const response = await fetch(`${BASE_URL}/auth/register/voluntario`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return handleResponse(response);
}

/**
 * Registra uma nova Organização.
 */
export async function registerOrganizacao(data) {
    const response = await fetch(`${BASE_URL}/auth/register/organizacao`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return handleResponse(response);
}

/**
 * Busca todas as atividades.
 * @returns {Promise<Array>} Lista de atividades
 */
export async function getAtividades() {
    const response = await fetch(`${BASE_URL}/atividades`);
    return handleResponse(response);
}

/**
 * Busca inscrições de um voluntário específico.
 * @param {string} voluntarioId
 * @returns {Promise<Array>} Lista de inscrições
 */
export async function getInscricoes(voluntarioId) {
    const response = await fetch(`${BASE_URL}/inscricoes/voluntario/${voluntarioId}`);
    return handleResponse(response);
}

/**
 * Cria uma nova atividade.
 * @param {Object} data Dados da atividade
 * @param {string} organizacaoId
 */
export async function createAtividade(data, organizacaoId) {
    const response = await fetch(`${BASE_URL}/atividades/organizacao/${organizacaoId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return handleResponse(response);
}

/**
 * Inscreve um voluntário em uma atividade.
 * @param {string} voluntarioId
 * @param {string} atividadeId
 */
export async function inscrever(voluntarioId, atividadeId) {
    const response = await fetch(`${BASE_URL}/inscricoes/voluntario/${voluntarioId}/atividade/${atividadeId}`, {
        method: 'POST'
    });
    return handleResponse(response);
}