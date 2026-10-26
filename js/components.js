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
    if (header)
        header.innerHTML = `<div class="site-wrap header-inner">${marca}<button class="nav-toggle" type="button" aria-controls="site-navigation" aria-expanded="false">Menú <span aria-hidden="true">☰</span></button><nav class="site-nav" id="site-navigation" aria-label="Navegación principal"><a href="${inicio}"${marcarActual('inicio')}>Inicio</a><a class="nav-business" href="${enlacePagina('para-casilleros')}"${marcarActual('para-casilleros')}>Para casilleros</a><a href="${enlacePagina('cotizar')}"${marcarActual('cotizar')}>Cotizar</a><a href="${enlacePagina('rastreocodigo')}"${marcarActual('rastreocodigo')}>Rastrear</a><a href="${enlacePagina('panel')}"${marcarActual('panel')}>Mi cuenta</a><a href="${enlacePagina('registro')}" class="nav-cta"${marcarActual('registro')}>Probar casillero <span aria-hidden="true">↗</span></a></nav></div>`;
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
