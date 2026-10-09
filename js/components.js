// El menú y el footer van aquí para no copiarlos en cada página.
(() => {
    'use strict';
    const prefijo = document.body.dataset.root === '..' ? '../' : '';
    const paginaActual = document.body.dataset.page;
    const inicio = `${prefijo}index.html`;
    const enlacePagina = (name) => `${prefijo}paginas/${name}.html`;
    const marca = `<a class="site-brand" href="${inicio}"><img src="${prefijo}img/logo/logo.svg" width="42" height="42" alt=""><span><span class="brand-title">Courier Demo<span class="brand-dot">.</span></span><span class="brand-subtitle">EE. UU. → COSTA RICA</span></span></a>`;
    const marcarActual = (id) =>
        paginaActual === id ||
        (id === 'rastreocodigo' && paginaActual === 'rastreo') ||
        (id === 'panel' && ['paquetes', 'prealerta'].includes(paginaActual))
            ? ' aria-current="page"'
            : '';
    const header = document.getElementById('site-header');
    const footer = document.getElementById('site-footer');
    if (header)
        header.innerHTML = `<div class="site-wrap header-inner">${marca}<button class="nav-toggle" type="button" aria-controls="site-navigation" aria-expanded="false">Menú <span aria-hidden="true">☰</span></button><nav class="site-nav" id="site-navigation" aria-label="Navegación principal"><a href="${inicio}"${marcarActual('inicio')}>Inicio</a><a href="${inicio}#como-funciona">Cómo funciona</a><a href="${inicio}#servicios">Servicios</a><a href="${enlacePagina('cotizar')}"${marcarActual('cotizar')}>Cotizar</a><a href="${enlacePagina('rastreocodigo')}"${marcarActual('rastreocodigo')}>Rastrear</a><a href="${enlacePagina('panel')}"${marcarActual('panel')}>Mi cuenta</a><a href="${enlacePagina('registro')}" class="nav-cta"${marcarActual('registro')}>Probar casillero <span aria-hidden="true">↗</span></a></nav></div>`;
    if (footer)
        footer.innerHTML = `<div class="site-wrap"><div class="footer-grid"><div class="footer-about">${marca}<p>Sitio de práctica sobre un casillero de compras en Estados Unidos con envíos a Costa Rica.</p><span class="small">Marca ficticia · sin servicios comerciales</span></div><div><h2>HERRAMIENTAS</h2><ul><li><a href="${enlacePagina('cotizar')}">Cotizador de envío</a></li><li><a href="${enlacePagina('rastreocodigo')}">Rastreo de paquetes</a></li><li><a href="${enlacePagina('prealerta')}">Prealerta</a></li><li><a href="${enlacePagina('panel')}">Mi casillero de ejemplo</a></li></ul></div><div><h2>INFORMACIÓN</h2><ul><li><a href="${enlacePagina('preguntas')}">Preguntas frecuentes</a></li><li><a href="${enlacePagina('productos')}">Artículos restringidos</a></li><li><a href="${enlacePagina('asesores')}">Ayuda de ejemplo</a></li><li><a href="${inicio}#contacto">Contacto ficticio</a></li></ul></div></div><div class="footer-author">
    <div class="footer-author-info">
        <span class="footer-author-label">Proyecto de portafolio</span>
        <p>Shamir Delgado</p>
        <span class="small">HTML, CSS y JavaScript</span>
    </div>
    <nav class="footer-author-links" aria-label="Enlaces de Shamir Delgado">
        <a href="https://github.com/shamirdelgado" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span><span class="sr-only"> (abre una pestaña nueva)</span></a>
        <a href="https://www.linkedin.com/in/shamir-delgado-lanuza-0b7274314" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span><span class="sr-only"> (abre una pestaña nueva)</span></a>
        <a href="mailto:uzziellanuza@gmail.com">uzziellanuza@gmail.com</a>
    </nav>
</div><div class="footer-bottom"><p>Courier Demo no presta servicios, procesa pagos ni envía paquetes. Las marcas y logos de tiendas pertenecen a sus dueños. Demo sin afiliación, patrocinio ni respaldo de esas marcas.</p><p class="footer-project">Shamir Delgado · 2026</p></div></div>`;
    const botonMenu = header?.querySelector('.nav-toggle');
    const menu = header?.querySelector('.site-nav');
    if (!botonMenu || !menu) return;
    const cerrarMenu = () => {
        botonMenu.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
    };
    botonMenu.addEventListener('click', () => {
        const open = botonMenu.getAttribute('aria-expanded') !== 'true';
        botonMenu.setAttribute('aria-expanded', String(open));
        menu.classList.toggle('is-open', open);
    });
    menu.addEventListener('click', (event) => {
        if (event.target.closest('a')) cerrarMenu();
    });
    header.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            cerrarMenu();
            botonMenu.focus();
        }
    });
    document.addEventListener('click', (event) => {
        if (!header.contains(event.target)) cerrarMenu();
    });
    header.addEventListener('focusout', (event) => {
        if (!header.contains(event.relatedTarget)) cerrarMenu();
    });
    window.matchMedia('(min-width:1101px)').addEventListener('change', cerrarMenu);
})();
