// El contacto muestra una confirmación local; no envía correos.
(() => {
    'use strict';
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!window.DemoUI.validate(form)) return;
        const status = document.getElementById('contactStatus');
        status.textContent =
            'Mensaje de ejemplo revisado. No se envió ningún correo ni se guardó información.';
        status.hidden = false;
        form.reset();
    });
})();
