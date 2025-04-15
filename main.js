document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    // Função para validar e-mail
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Validação em tempo real enquanto o usuário digita
    emailInput.addEventListener('input', function() {
        const email = emailInput.value.trim();
        const inputGroup = emailInput.parentElement;
        
        if (email === '') {
            inputGroup.classList.remove('success', 'error');
            emailError.style.display = 'none';
            return;
        }
        
        if (validateEmail(email)) {
            inputGroup.classList.remove('error');
            inputGroup.classList.add('success');
            emailError.style.display = 'none';
        } else {
            inputGroup.classList.remove('success');
            inputGroup.classList.add('error');
            emailError.textContent = 'Por favor, insira um e-mail válido';
            emailError.style.display = 'block';
        }
    });

    // Validação ao enviar o formulário
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o envio do formulário para testar
        
        const email = emailInput.value.trim();
        const inputGroup = emailInput.parentElement;
        
        if (email === '') {
            inputGroup.classList.add('error');
            emailError.textContent = 'O campo e-mail é obrigatório';
            emailError.style.display = 'block';
            return;
        }
        
        if (!validateEmail(email)) {
            inputGroup.classList.add('error');
            emailError.textContent = 'Por favor, insira um e-mail válido';
            emailError.style.display = 'block';
            return;
        }
        
        // Se chegou aqui, o e-mail é válido
        inputGroup.classList.remove('error');
        inputGroup.classList.add('success');
        emailError.style.display = 'none';
        
        // Aqui você pode adicionar o código para enviar o formulário
        alert('Login efetuado com sucesso!!!');
        // loginForm.submit(); // Descomente esta linha para enviar o formulário de verdade
    });
});