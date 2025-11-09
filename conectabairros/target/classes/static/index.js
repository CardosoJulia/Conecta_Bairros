import { getAtividades, getInscricoes, createAtividade, inscrever } from './api.js'

document.addEventListener('DOMContentLoaded', () => {
    const usuarioString = localStorage.getItem('usuario')
    if (!usuarioString) {
        window.location.href = 'login.html'
        return
    }

    const usuario = JSON.parse(usuarioString)
    const { id: userId, nome: userName, tipoUsuario: userType } = usuario

    const welcomeHeader = document.getElementById('welcome-header')
    const logoutBtn = document.getElementById('logout-btn')
    
    const orgSection = document.getElementById('organizacao-section')
    const volSection = document.getElementById('voluntario-section')
    
    const atividadeForm = document.getElementById('atividadeForm')
    const atividadesTbody = document.getElementById('atividadesTbody')
    const minhasInscricoesLista = document.getElementById('minhas-inscricoes-lista')

    welcomeHeader.textContent = `Bem-vindo(a), ${userName}! (${userType})`

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('usuario')
        window.location.href = 'login.html'
    })

    async function loadAllAtividades() {
        try {
            const atividades = await getAtividades()
            atividadesTbody.innerHTML = ''

            atividades.forEach(a => {
                const tr = document.createElement('tr')
                
                let acaoBtn = ''
                if (userType === 'VOLUNTARIO') {
                    acaoBtn = `<button class="inscrever-btn" data-atividade-id="${a.id}">Inscrever-se</button>`
                } else {
                    acaoBtn = 'N/A'
                }

                tr.innerHTML = `
                    <td>${a.titulo}</td>
                    <td>${a.descricao}</td>
                    <td>${a.tipo}</td>
                    <td>${new Date(a.data).toLocaleDateString('pt-BR')}</td>
                    <td>${a.local}</td>
                    <td>${a.vagasDisponiveis}</td>
                    <td>${a.nomeOrganizacao || 'N/A'}</td> <td>${acaoBtn}</td>
                `
                atividadesTbody.appendChild(tr)
            })
            
            addInscreverListeners()

        } catch (error) {
            console.error('Erro ao carregar atividades:', error)
            atividadesTbody.innerHTML = '<tr><td colspan="8">Erro ao carregar atividades.</td></tr>'
        }
    }

    async function loadMinhasInscricoes() {
        try {
            const inscricoes = await getInscricoes(userId)
            minhasInscricoesLista.innerHTML = ''

            if (inscricoes.length === 0) {
                minhasInscricoesLista.innerHTML = '<li>Você não está inscrito em nenhuma atividade.</li>'
                return
            }

            inscricoes.forEach(i => {
                const li = document.createElement('li')
                li.textContent = `Inscrição ID: ${i.id} (Atividade ID: ${i.atividade.id}) - Data: ${new Date(i.dataInscricao).toLocaleString('pt-BR')}`
                minhasInscricoesLista.appendChild(li)
            })

        } catch (error) {
            console.error('Erro ao carregar inscrições:', error)
            minhasInscricoesLista.innerHTML = '<li>Erro ao carregar suas inscrições.</li>'
        }
    }

    function addInscreverListeners() {
        document.querySelectorAll('.inscrever-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const atividadeId = e.target.dataset.atividadeId
                
                if (!confirm(`Confirmar inscrição na atividade ID ${atividadeId}?`)) {
                    return
                }
                
                try {
                    await inscrever(userId, atividadeId)
                    alert('Inscrição realizada com sucesso!')
                    loadAllAtividades()
                    if (userType === 'VOLUNTARIO') {
                        loadMinhasInscricoes()
                    }
                } catch (error) {
                    alert(`Erro ao inscrever: ${error.message}`)
                    console.error(error)
                }
            })
        })
    }

    atividadeForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        
        const dados = {
            titulo: e.target.titulo.value,
            descricao: e.target.descricao.value,
            tipo: e.target.tipo.value,
            data: e.target.data.value,
            local: e.target.local.value,
            vagasDisponiveis: parseInt(e.target.vagasDisponiveis.value)
        }
        
        const organizacaoId = userId

        try {
            await createAtividade(dados, organizacaoId)
            alert('Atividade cadastrada com sucesso!')
            e.target.reset()
            loadAllAtividades()
        } catch (error) {
            alert(`Erro ao cadastrar atividade: ${error.message}`)
            console.error(error)
        }
    })

    loadAllAtividades()

    if (userType === 'VOLUNTARIO') {
        volSection.style.display = 'block'
        loadMinhasInscricoes()
    } else if (userType === 'ORGANIZACAO') {
        orgSection.style.display = 'block'
    }
})