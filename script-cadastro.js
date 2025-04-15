document.addEventListener('DOMContentLoaded', function() {
    // Função para mostrar/esconder senha
    const toggleButtons = document.querySelectorAll('.password-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        });
    });

    // Validação de força da senha
    const senhaInput = document.getElementById('senha');
    const strengthBar = document.querySelector('.strength-bar');
    
    senhaInput.addEventListener('input', function() {
        const strength = calculateStrength(this.value);
        updateStrengthBar(strength);
    });

    function calculateStrength(password) {
        let strength = 0;
        
        // Verifica o comprimento
        if (password.length > 0) strength += 1;
        if (password.length >= 8) strength += 1;
        
        // Verifica caracteres diversos
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        return Math.min(strength, 5); // Máximo de 5
    }

    function updateStrengthBar(strength) {
        const colors = ['#e74c3c', '#f39c12', '#f1c40f', '#2ecc71', '#27ae60'];
        const width = strength * 20;
        
        strengthBar.style.width = width + '%';
        strengthBar.style.backgroundColor = colors[strength - 1] || '#f0f0f0';
        
        const textMap = [
            'Muito fraca',
            'Fraca',
            'Média',
            'Forte',
            'Muito forte'
        ];
        
        document.querySelector('.strength-text').textContent = textMap[strength - 1] || 'Força da senha';
    }

    // Validação de confirmação de senha
    const form = document.getElementById('form-cadastro');
    const senhaError = document.getElementById('senha-error');
    const confirmarSenhaInput = document.getElementById('confirmar-senha');
    
    confirmarSenhaInput.addEventListener('input', function() {
        const senha = document.getElementById('senha').value;
        const confirmarSenha = this.value;
        
        if (confirmarSenha && senha !== confirmarSenha) {
            senhaError.textContent = 'As senhas não coincidem';
            senhaError.classList.add('show');
        } else {
            senhaError.classList.remove('show');
        }
    });

    form.addEventListener('submit', function(e) {
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmar-senha').value;
        
        if (senha !== confirmarSenha) {
            e.preventDefault();
            senhaError.textContent = 'As senhas não coincidem';
            senhaError.classList.add('show');
            confirmarSenhaInput.focus();
        }
    });
});