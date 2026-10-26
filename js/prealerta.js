(() => {
    'use strict';
    const form = document.getElementById('prealertForm');
    if (!form) return;
    const ui = window.DemoUI;
    const invoice = document.getElementById('invoice');
    const preview = document.getElementById('filePreview');
    const fileStatus = document.getElementById('fileStatus');
    const result = document.getElementById('prealertResult');
    const empty = document.getElementById('prealertEmpty');
    let imageUrl;
    const release = () => {
        if (imageUrl) {
            URL.revokeObjectURL(imageUrl);
            imageUrl = undefined;
        }
        preview.hidden = true;
        preview.removeAttribute('src');
    };
    const fileError = () => {
        const file = invoice.files[0];
        if (!file) return '';
        if (file.size > 2 * 1024 * 1024)
            return 'El máximo es 2 MB. Elige un archivo ficticio más pequeño.';
        if (
            !/\.(jpe?g|png|pdf)$/i.test(file.name) ||
            (file.type && !['image/jpeg', 'image/png', 'application/pdf'].includes(file.type))
        )
            return 'Usa un archivo de ejemplo JPG, PNG o PDF.';
        return '';
    };
    const clearSummary = () => {
        result.hidden = true;
        empty.hidden = false;
    };
    invoice.addEventListener('change', () => {
        release();
        clearSummary();
        const error = fileError();
        ui.error(invoice, error);
        fileStatus.textContent = '';
        const file = invoice.files[0];
        if (error || !file) return;
        fileStatus.textContent = `Seleccionado localmente: ${file.name} (${Math.ceil(file.size / 1024)} KB). No se sube.`;
        if (['image/jpeg', 'image/png'].includes(file.type)) {
            imageUrl = URL.createObjectURL(file);
            preview.src = imageUrl;
            preview.hidden = false;
        }
    });
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const valid = ui.validate(form, {
            tracking: (val) =>
                /^DEMO-\d{4}$/i.test(val) ? '' : 'Usa un código ficticio con el formato DEMO-2001.',
        });
        const error = fileError();
        ui.error(invoice, error);
        if (error) {
            invoice.focus();
            return;
        }
        if (!valid) return;
        const file = invoice.files[0];
        ui.summaryRows(result, [
            ['Código de ejemplo', form.tracking.value.trim().toUpperCase()],
            ['Tienda ficticia', form.store.value.trim()],
            ['Producto ficticio', form.description.value.trim()],
            ['Valor declarado', ui.money(Number(form.value.value))],
            ['Archivo local', file ? file.name : 'Sin archivo'],
        ]);
        result.append(
            ui.text(
                'p',
                'Prealerta revisada en modo demo. No se envió, no se guardó y no se añadió a la lista de paquetes.',
                'status-message',
            ),
        );
        empty.hidden = true;
        result.hidden = false;
    });
    form.addEventListener('input', clearSummary);
    form.addEventListener('reset', () => {
        release();
        clearSummary();
        fileStatus.textContent = '';
        form.querySelectorAll('input,textarea').forEach((i) => ui.error(i, ''));
    });
    window.addEventListener('pagehide', release);
})();
