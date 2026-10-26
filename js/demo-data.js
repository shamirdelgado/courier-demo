(() => {
    'use strict';
    const packages = [
        {
            code: 'DEMO-1001',
            product: 'Audífonos de ejemplo',
            store: 'Tienda Ejemplo A',
            weight: 1.2,
            status: 'transit',
            step: 1,
            mode: 'Aéreo',
            estimate: '12 oct 2026 · ejemplo',
            events: ['08 oct 2026 · 09:00', '09 oct 2026 · 11:00', null, null],
        },
        {
            code: 'DEMO-1002',
            product: 'Camiseta de ejemplo',
            store: 'Tienda Ejemplo B',
            weight: 0.6,
            status: 'delivered',
            step: 3,
            mode: 'Aéreo',
            estimate: '08 oct 2026 · ejemplo',
            events: [
                '03 oct 2026 · 10:00',
                '04 oct 2026 · 12:00',
                '06 oct 2026 · 15:00',
                '08 oct 2026 · 09:30',
            ],
        },
        {
            code: 'DEMO-1003',
            product: 'Libros de ejemplo',
            store: 'Tienda Ejemplo C',
            weight: 2.4,
            status: 'received',
            step: 0,
            mode: 'Marítimo',
            estimate: '30 oct 2026 · ejemplo',
            events: ['09 oct 2026 · 08:30', null, null, null],
        },
    ];
    const states = {
        received: 'Recibido en almacén',
        transit: 'En tránsito',
        delivered: 'Entregado',
    };
    const timeline = [
        { title: 'Recibido en almacén', description: 'Almacén ficticio · Estados Unidos' },
        {
            title: 'En tránsito internacional',
            description: 'Recorrido ficticio · EE. UU. → Costa Rica',
        },
        { title: 'Gestión de llegada', description: 'Centro ficticio de recepción · Costa Rica' },
        { title: 'Entregado', description: 'Entrega de ejemplo completada' },
    ];
    packages.forEach((p) => {
        Object.freeze(p.events);
        Object.freeze(p);
    });
    timeline.forEach(Object.freeze);
    window.DemoData = Object.freeze({
        packages: Object.freeze(packages),
        states: Object.freeze(states),
        timeline: Object.freeze(timeline),
    });
})();
