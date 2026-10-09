// Mostrar los paquetes y filtrar por estado.
(() => {
    'use strict';
    const body = document.getElementById('packageRows');
    if (!body) return;
    const ui = window.DemoUI,
        data = window.DemoData;
    function render(state = 'all') {
        body.replaceChildren();
        const rows = data.packages.filter((p) => state === 'all' || p.status === state);
        rows.forEach((parcel) => {
            const row = document.createElement('tr');
            const cell = (label) => {
                const c = document.createElement('td');
                c.dataset.label = label;
                row.append(c);
                return c;
            };
            const details = document.createElement('div');
            details.append(ui.text('strong', parcel.code), ui.text('small', parcel.product));
            cell('Paquete').append(details);
            cell('Estado').append(
                ui.text(
                    'span',
                    data.states[parcel.status],
                    `badge${parcel.status === 'delivered' ? ' badge-success' : parcel.status === 'received' ? ' badge-neutral' : ''}`,
                ),
            );
            cell('Peso').append(ui.text('span', `${parcel.weight} kg`));
            const link = ui.text('a', 'Ver recorrido →', 'text-link');
            link.href = `rastreo.html#${parcel.code}`;
            link.setAttribute('aria-label', `Ver recorrido ficticio de ${parcel.code}`);
            cell('Seguimiento').append(link);
            body.append(row);
        });
        document.getElementById('packageEmpty').hidden = rows.length !== 0;
    }
    render();
    document
        .getElementById('packageFilter')
        ?.addEventListener('change', (event) => render(event.target.value));
})();
