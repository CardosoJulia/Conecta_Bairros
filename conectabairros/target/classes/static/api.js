const BASE_URL = 'http://localhost:8080/api'

async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Erro ${response.status}`)
    }
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json()
    } else {
        return null
    }
}

export async function login(email, senha) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    })
    return handleResponse(response)
}

export async function registerVoluntario(data) {
    const response = await fetch(`${BASE_URL}/auth/register/voluntario`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return handleResponse(response)
}

export async function registerOrganizacao(data) {
    const response = await fetch(`${BASE_URL}/auth/register/organizacao`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return handleResponse(response)
}

export async function getAtividades() {
    const response = await fetch(`${BASE_URL}/atividades`)
    return handleResponse(response)
}

export async function getInscricoes(voluntarioId) {
    const response = await fetch(`${BASE_URL}/inscricoes/voluntario/${voluntarioId}`)
    return handleResponse(response)
}

export async function createAtividade(data, organizacaoId) {
    const response = await fetch(`${BASE_URL}/atividades/organizacao/${organizacaoId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return handleResponse(response)
}

export async function inscrever(voluntarioId, atividadeId) {
    const response = await fetch(`${BASE_URL}/inscricoes/voluntario/${voluntarioId}/atividade/${atividadeId}`, {
        method: 'POST'
    })
    return handleResponse(response)
}