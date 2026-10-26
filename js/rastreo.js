(() => {
    'use strict';
    const target = document.getElementById('trackingResult');
    if (!target) return;
    const ui = window.DemoUI,
        data = window.DemoData;
    const badge = (status) =>
        ui.text(
            'span',
            data.states[status],
            `badge${status === 'delivered' ? ' badge-success' : status === 'received' ? ' badge-neutral' : ''}`,
        );
    function render(code) {
        target.replaceChildren();
        const input = document.getElementById('tracking');
        input.value = code;
        const parcel = data.packages.find((p) => p.code === code);
        if (!parcel) {
            const error = ui.text('div', '', 'tracking-error');
            error.append(
                ui.text('h2', 'No encontramos ese paquete de ejemplo.'),
                ui.text(
                    'p',
                    'Prueba DEMO-1001, DEMO-1002 o DEMO-1003. Esta demo no consulta tracking real.',
                ),
            );
            target.append(error);
            return;
        }
        const head = ui.text('div', '', 'tracking-heading'),
            titles = ui.text('div', '');
        titles.append(
            ui.text('h2', parcel.code),
            ui.text('p', `${parcel.product} · ${parcel.store}`),
        );
        head.append(titles, badge(parcel.status));
        target.append(head);
        const meta = ui.text('div', '', 'tracking-meta');
        [
            ['Modalidad de ejemplo', parcel.mode],
            ['Peso de ejemplo', `${parcel.weight} kg`],
            ['Entrega estimada ficticia', parcel.estimate],
        ].forEach(([l, v]) => {
            const n = ui.text('div', '');
            n.append(ui.text('span', l), ui.text('strong', v));
            meta.append(n);
        });
        target.append(meta);
        const timeline = ui.text('ol', '', 'timeline');
        timeline.setAttribute('aria-label', 'Recorrido ficticio del paquete');
        data.timeline.forEach((stage, i) => {
            const status = i < parcel.step ? 'done' : i === parcel.step ? 'current' : 'upcoming';
            const item = ui.text('li', '', status);
            if (i === parcel.step) item.setAttribute('aria-current', 'step');
            item.append(
                ui.text('strong', stage.title),
                ui.text('p', stage.description),
                ui.text('p', parcel.events[i] || 'Pendiente · ejemplo'),
            );
            timeline.append(item);
        });
        target.append(timeline);
    }
    const fromHash = () => {
        try {
            return decodeURIComponent(location.hash.slice(1)).trim().toUpperCase() || 'DEMO-1001';
        } catch {
            return 'CÓDIGO NO VÁLIDO';
        }
    };
    render(fromHash());
    window.addEventListener('hashchange', () => render(fromHash()));
    window.addEventListener('demo:tracking', (event) => render(event.detail));
})();
