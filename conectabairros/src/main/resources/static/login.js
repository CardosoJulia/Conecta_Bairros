import { login, registerVoluntario, registerOrganizacao } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    const loginContainer = document.getElementById('login-form-container');
    const registerContainer = document.getElementById('register-form-container');
    
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');
    
    const cnpjField = document.getElementById('cnpj-field');
    
    // MUDANÇA AQUI: Agora ele procura o 'name' com underscore
    const tipoUsuarioRadios = document.querySelectorAll('input[name="tipo_usuario"]');

    // Alternar entre forms
    showRegisterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    });

    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    // Mostrar/Esconder campo CNPJ (Essa função não muda)
    tipoUsuarioRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'ORGANIZACAO') {
                cnpjField.style.display = 'block';
            } else {
                cnpjField.style.display = 'none';
            }
        });
    });

    // Handle Login (Essa função não muda)
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const senha = e.target.senha.value;

        try {
            const usuario = await login(email, senha);
            
            localStorage.setItem('usuario', JSON.stringify({
                id: usuario.id,
                nome: usuario.nome,
                tipoUsuario: usuario.tipo_usuario
            }));

            // Se você renomeou o 'app.html', mude o nome aqui
            window.location.href = 'app.html'; 

        } catch (error) {
            alert(`Erro no login: ${error.message}. Verifique email e senha.`);
            console.error(error);
        }
    });

    // Handle Register
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // O 'data' agora já vem com 'tipo_usuario'
        // Não precisamos mais do "tradutor"

        try {
            // MUDANÇA AQUI: O 'if' agora usa a chave com underscore
            if (data.tipo_usuario === 'VOLUNTARIO') {
                await registerVoluntario(data);
            } else {
                await registerOrganizacao(data);
            }
            
            alert('Cadastro realizado com sucesso! Faça o login.');
            e.target.reset();
            cnpjField.style.display = 'none';
            showLoginBtn.click();

        } catch (error) {
            alert(`Erro no cadastro: ${error.message}`);
            console.error(error);
        }
    });
});