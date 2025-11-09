import { login, registerVoluntario, registerOrganizacao } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    const loginContainer = document.getElementById('login-form-container');
    const registerContainer = document.getElementById('register-form-container');
    
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');
    
    const cnpjField = document.getElementById('cnpj-field');
    const tipoUsuarioRadios = document.querySelectorAll('input[name="tipoUsuario"]');

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

    // Mostrar/Esconder campo CNPJ
    tipoUsuarioRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'ORGANIZACAO') {
                cnpjField.style.display = 'block';
            } else {
                cnpjField.style.display = 'none';
            }
        });
    });

    // Handle Login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const senha = e.target.senha.value;

        try {
            const usuario = await login(email, senha);
            
            // Salva os dados do usuário no localStorage
            localStorage.setItem('usuario', JSON.stringify({
                id: usuario.id,
                nome: usuario.nome,
                tipoUsuario: usuario.tipo_usuario // Cuidado: o backend manda "tipo_usuario"
            }));

            // Redireciona para o app
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

        try {
            if (data.tipoUsuario === 'VOLUNTARIO') {
                await registerVoluntario(data);
            } else {
                await registerOrganizacao(data);
            }
            
            alert('Cadastro realizado com sucesso! Faça o login.');
            // Reseta o form e volta pro login
            e.target.reset();
            cnpjField.style.display = 'none';
            showLoginBtn.click();

        } catch (error) {
            alert(`Erro no cadastro: ${error.message}`);
            console.error(error);
        }
    });
});