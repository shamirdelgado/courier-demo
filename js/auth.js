(() => {
    'use strict';
    const ui = window.DemoUI;
    const rulePassword = (val) =>
        /[a-zA-Z]/.test(val) && /\d/.test(val) && val.length >= 8
            ? ''
            : 'Usa al menos 8 caracteres, una letra y un número.';
    const forget = (form) =>
        form
            .querySelectorAll('input[name="password"],input[name="confirmPassword"]')
            .forEach((i) => {
                i.value = '';
            });
    const register = document.getElementById('registrationForm');
    if (register)
        register.addEventListener('submit', (event) => {
            event.preventDefault();
            if (
                !ui.validate(register, {
                    password: rulePassword,
                    confirmPassword: (val) =>
                        val === register.password.value
                            ? ''
                            : 'Las contraseñas de ejemplo no coinciden.',
                })
            )
                return;
            forget(register);
            register.reset();
            location.href = 'verificacion.html';
        });
    const login = document.getElementById('loginForm');
    if (login)
        login.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!ui.validate(login, { password: rulePassword })) return;
            forget(login);
            login.reset();
            location.href = 'panel.html';
        });
    const verify = document.getElementById('verifyForm');
    if (verify) {
        verify.addEventListener('submit', (event) => {
            event.preventDefault();
            if (
                !ui.validate(verify, {
                    verificationCode: (val) =>
                        val === '123456' ? '' : 'En esta demo el código es 123456.',
                })
            )
                return;
            verify.reset();
            location.href = 'identificacion.html';
        });
        document.getElementById('showCode').addEventListener('click', () => {
            const node = document.getElementById('codeStatus');
            node.hidden = false;
            node.textContent = 'Tu código de ejemplo es 123456. No se ha enviado ningún mensaje.';
        });
    }
    const identity = document.getElementById('identityForm');
    if (identity)
        identity.addEventListener('submit', (event) => {
            event.preventDefault();
            if (
                !ui.validate(identity, {
                    idNumber: (val) =>
                        val.toUpperCase() === 'DEMO-ID-001'
                            ? ''
                            : 'Usa únicamente el identificador ficticio DEMO-ID-001.',
                })
            )
                return;
            identity.reset();
            location.href = 'confirmacion.html';
        });
})();
