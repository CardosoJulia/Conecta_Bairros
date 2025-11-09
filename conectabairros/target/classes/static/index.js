import { getAtividades, getInscricoes, createAtividade, inscrever } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificar autenticação
    const usuarioString = localStorage.getItem('usuario');
    if (!usuarioString) {
        // Se não tiver usuário, chuta ele de volta pro login
        window.location.href = 'login.html';
        return;
    }

    const usuario = JSON.parse(usuarioString);
    const { id: userId, nome: userName, tipoUsuario: userType } = usuario;

    // Elementos da UI
    const welcomeHeader = document.getElementById('welcome-header');
    const logoutBtn = document.getElementById('logout-btn');
    
    const orgSection = document.getElementById('organizacao-section');
    const volSection = document.getElementById('voluntario-section');
    
    const atividadeForm = document.getElementById('atividadeForm');
    const atividadesTbody = document.getElementById('atividadesTbody');
    const minhasInscricoesLista = document.getElementById('minhas-inscricoes-lista');

    // 2. Configurar UI inicial
    welcomeHeader.textContent = `Bem-vindo(a), ${userName}! (${userType})`;

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('usuario');
        window.location.href = 'login.html';
    });

    // 3. Funções de carregamento de dados
    
    /**
     * Carrega e exibe todas as atividades na tabela principal
     */
    async function loadAllAtividades() {
        try {
            const atividades = await getAtividades();
            atividadesTbody.innerHTML = ''; // Limpa tabela

            atividades.forEach(a => {
                const tr = document.createElement('tr');
                
                // Coluna de Ação (Botão)
                let acaoBtn = '';
                if (userType === 'VOLUNTARIO') {
                    // TODO: Adicionar lógica para não mostrar botão se já estiver inscrito
                    acaoBtn = `<button class="inscrever-btn" data-atividade-id="${a.id}">Inscrever-se</button>`;
                } else {
                    acaoBtn = 'N/A';
                }

                tr.innerHTML = `
                    <td>${a.titulo}</td>
                    <td>${a.descricao}</td>
                    <td>${a.tipo}</td>
                    <td>${new Date(a.data).toLocaleDateString('pt-BR')}</td>
                    <td>${a.local}</td>
                    <td>${a.vagasDisponiveis}</td>
                    <td>${a.nomeOrganizacao || 'N/A'}</td> <td>${acaoBtn}</td>
                `;
                atividadesTbody.appendChild(tr);
            });
            
            // Adiciona listeners aos botões de inscrição
            addInscreverListeners();

        } catch (error) {
            console.error('Erro ao carregar atividades:', error);
            atividadesTbody.innerHTML = '<tr><td colspan="8">Erro ao carregar atividades.</td></tr>';
        }
    }

    /**
     * Carrega e exibe as inscrições do voluntário
     */
    async function loadMinhasInscricoes() {
        try {
            const inscricoes = await getInscricoes(userId);
            minhasInscricoesLista.innerHTML = ''; // Limpa lista

            if (inscricoes.length === 0) {
                minhasInscricoesLista.innerHTML = '<li>Você não está inscrito em nenhuma atividade.</li>';
                return;
            }

            inscricoes.forEach(i => {
                const li = document.createElement('li');
                // O backend não manda o nome da atividade no /inscricoes, o que é ruim.
                // Idealmente, o backend deveria mandar mais detalhes.
                // Por agora, vamos mostrar o ID.
                li.textContent = `Inscrição ID: ${i.id} (Atividade ID: ${i.atividade.id}) - Data: ${new Date(i.dataInscricao).toLocaleString('pt-BR')}`;
                minhasInscricoesLista.appendChild(li);
            });

        } catch (error) {
            console.error('Erro ao carregar inscrições:', error);
            minhasInscricoesLista.innerHTML = '<li>Erro ao carregar suas inscrições.</li>';
        }
    }

    // 4. Handlers de Eventos

    /**
     * Adiciona listeners aos botões "Inscrever-se" na tabela
     */
    function addInscreverListeners() {
        document.querySelectorAll('.inscrever-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const atividadeId = e.target.dataset.atividadeId;
                
                if (!confirm(`Confirmar inscrição na atividade ID ${atividadeId}?`)) {
                    return;
                }
                
                try {
                    await inscrever(userId, atividadeId);
                    alert('Inscrição realizada com sucesso!');
                    // Recarrega atividades (para atualizar vagas) e minhas inscrições
                    loadAllAtividades();
                    if (userType === 'VOLUNTARIO') {
                        loadMinhasInscricoes();
                    }
                } catch (error) {
                    alert(`Erro ao inscrever: ${error.message}`);
                    console.error(error);
                }
            });
        });
    }

    /**
     * Handler para o form de criar atividade (Organização)
     */
    atividadeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const dados = {
            titulo: e.target.titulo.value,
            descricao: e.target.descricao.value,
            tipo: e.target.tipo.value,
            data: e.target.data.value,
            local: e.target.local.value,
            vagasDisponiveis: parseInt(e.target.vagasDisponiveis.value)
        };
        
        // O ID da organização vem do usuário logado
        const organizacaoId = userId;

        try {
            await createAtividade(dados, organizacaoId);
            alert('Atividade cadastrada com sucesso!');
            e.target.reset();
            loadAllAtividades(); // Atualiza a tabela
        } catch (error) {
            alert(`Erro ao cadastrar atividade: ${error.message}`);
            console.error(error);
        }
    });


    // 5. Execução inicial (Lógica condicional)
    
    loadAllAtividades(); // Todos veem as atividades

    if (userType === 'VOLUNTARIO') {
        volSection.style.display = 'block';
        loadMinhasInscricoes();
    } else if (userType === 'ORGANIZACAO') {
        orgSection.style.display = 'block';
    }
});