(() => {
    'use strict';
    const prefix = document.body.dataset.root === '..' ? '../' : '';
    let toastTimer;
    const money = (value) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    const text = (tag, value, className = '') => {
        const node = document.createElement(tag);
        node.textContent = String(value);
        if (className) node.className = className;
        return node;
    };
    const toast = (message) => {
        const node = document.getElementById('toast');
        if (!node) return;
        clearTimeout(toastTimer);
        node.textContent = message;
        node.hidden = false;
        toastTimer = setTimeout(() => {
            node.hidden = true;
        }, 6000);
    };
    const error = (input, message) => {
        let node = document.getElementById(`${input.id}-error`);
        if (!node) {
            node = text('p', '', 'error-message');
            node.id = `${input.id}-error`;
            input.insertAdjacentElement('afterend', node);
        }
        node.textContent = message;
        node.hidden = !message;
        if (message) {
            input.setAttribute('aria-invalid', 'true');
            const ids = new Set(
                (input.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean),
            );
            ids.add(node.id);
            input.setAttribute('aria-describedby', [...ids].join(' '));
        } else {
            input.removeAttribute('aria-invalid');
        }
    };
    const validate = (form, custom = {}) => {
        let first;
        form.querySelectorAll('input:not([type="file"]),select,textarea').forEach((input) => {
            if (input.disabled || !input.id) return;
            let message = '';
            const val = input.value.trim();
            if (input.required && (input.type === 'checkbox' ? !input.checked : !val))
                message =
                    input.type === 'checkbox'
                        ? 'Confirma que usarás datos ficticios.'
                        : 'Completa este campo.';
            else if (input.type === 'email' && val && input.validity.typeMismatch)
                message = 'Usa un correo de ejemplo con formato válido.';
            else if (
                val &&
                input.type === 'number' &&
                (!Number.isFinite(Number(val)) || input.validity.badInput)
            )
                message = 'Introduce un número válido.';
            else if (val && input.min && Number(val) < Number(input.min))
                message = `El valor mínimo es ${input.min}.`;
            else if (val && input.max && Number(val) > Number(input.max))
                message = `El valor máximo es ${input.max}.`;
            else if (val && input.minLength > 0 && val.length < input.minLength)
                message = `Usa al menos ${input.minLength} caracteres.`;
            else if (val && input.maxLength > 0 && val.length > input.maxLength)
                message = `Usa como máximo ${input.maxLength} caracteres.`;
            if (!message && custom[input.id]) message = custom[input.id](val, input) || '';
            error(input, message);
            if (message && !first) first = input;
        });
        if (first) {
            first.focus();
            return false;
        }
        return true;
    };
    const summaryRows = (container, rows) => {
        container.replaceChildren();
        rows.forEach(([label, value]) => {
            const row = text('div', '', 'summary-row');
            row.append(text('span', label), text('strong', value));
            container.append(row);
        });
    };
    const setName = () => {
        try {
            sessionStorage.setItem('courierDemoName', 'Alex Demo');
        } catch {
            /* La demo funciona también sin almacenamiento. */
        }
    };
    // Borro solo los datos del registro antiguo que guardaba contraseñas.
    try {
        const old = JSON.parse(localStorage.getItem('userData'));
        if (
            old &&
            typeof old.password === 'string' &&
            typeof old.email === 'string' &&
            typeof old.firstName === 'string' &&
            typeof old.lastName1 === 'string'
        )
            localStorage.removeItem('userData');
    } catch {
        /* file:// o almacenamiento deshabilitado. */
    }
    document.querySelectorAll('[data-demo-name]').forEach((node) => {
        node.textContent = 'Alex Demo';
    });
    document.querySelectorAll('[data-logout]').forEach((button) =>
        button.addEventListener('click', () => {
            try {
                sessionStorage.removeItem('courierDemoName');
            } catch {
                /* No afecta a la navegación. */
            }
            location.href = `${prefix}index.html`;
        }),
    );
    document.querySelectorAll('[data-password-toggle]').forEach((button) => {
        const input = document.getElementById(button.dataset.passwordToggle);
        if (!input) return;
        button.addEventListener('click', () => {
            const show = input.type === 'password';
            input.type = show ? 'text' : 'password';
            button.setAttribute('aria-pressed', String(show));
            button.setAttribute(
                'aria-label',
                show ? 'Ocultar contraseña de ejemplo' : 'Mostrar contraseña de ejemplo',
            );
        });
    });
    const track = (code) => {
        code = code.trim().toUpperCase();
        if (document.body.dataset.page === 'rastreo') {
            location.hash = encodeURIComponent(code);
            window.dispatchEvent(new CustomEvent('demo:tracking', { detail: code }));
        } else location.href = `${prefix}paginas/rastreo.html#${encodeURIComponent(code)}`;
    };
    document.querySelectorAll('[data-tracking-form]').forEach((form) =>
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const input = form.querySelector('input');
            if (!input.value.trim()) {
                input.focus();
                return;
            }
            track(input.value);
        }),
    );
    document
        .querySelectorAll('[data-example-code]')
        .forEach((button) =>
            button.addEventListener('click', () => track(button.dataset.exampleCode)),
        );
    // El historial puede restaurar contraseñas al volver a esta página.
    const clearPasswords = () =>
        document
            .querySelectorAll(
                'input[type="password"],input[name="password"],input[name="confirmPassword"]',
            )
            .forEach((input) => {
                input.value = '';
            });
    window.addEventListener('pagehide', clearPasswords);
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) clearPasswords();
    });
    window.DemoUI = Object.freeze({
        money,
        text,
        toast,
        error,
        validate,
        summaryRows,
        setName,
        track,
        prefix,
    });
})();
