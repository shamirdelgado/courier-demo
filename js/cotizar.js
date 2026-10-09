// Calculadora de envío con tarifas inventadas.
(() => {
    'use strict';
    const form = document.getElementById('quoteForm');
    if (!form) return;
    const ui = window.DemoUI;
    const result = document.getElementById('quoteResult');
    const empty = document.getElementById('quoteEmpty');
    const round = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
    // Función pura para poder comprobar conversiones, mínimos y totales.
    function calculate({ weight, unit, value, type, category, insurance }) {
        const kg = unit === 'lb' ? weight * 0.45359237 : weight;
        const minimum = type === 'sea' ? 2 : 0.5;
        const billed = Math.max(kg, minimum);
        const freight = round(billed * (type === 'sea' ? 3 : 8));
        const handling = 3;
        const coverage = insurance ? round(Math.max(1, value * 0.01)) : 0;
        const rates = { general: 0.13, books: 0, clothing: 0.2 };
        const taxes = round((value + freight + coverage) * rates[category]);
        return {
            kg,
            billed,
            freight,
            handling,
            coverage,
            taxes,
            total: round(freight + handling + coverage + taxes),
            days: type === 'sea' ? '20–30 días · ejemplo' : '5–8 días · ejemplo',
        };
    }
    window.DemoQuote = Object.freeze({ calculate });
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const unit = document.getElementById('weightUnit').value;
        const valid = ui.validate(form, {
            weight: (val) =>
                Number(val) * (unit === 'lb' ? 0.45359237 : 1) > 500
                    ? 'El máximo de esta simulación es 500 kg.'
                    : '',
        });
        if (!valid) return;
        const data = calculate({
            weight: Number(form.weight.value),
            unit,
            value: Number(form.productValue.value),
            type: form.shippingType.value,
            category: form.productType.value,
            insurance: document.getElementById('insurance').checked,
        });
        ui.summaryRows(result, [
            ['Peso convertido', `${data.kg.toFixed(2)} kg`],
            ['Peso facturable de ejemplo', `${data.billed.toFixed(2)} kg`],
            ['Flete', ui.money(data.freight)],
            ['Manejo', ui.money(data.handling)],
            ['Seguro', ui.money(data.coverage)],
            ['Impuesto ficticio', ui.money(data.taxes)],
        ]);
        const total = ui.text('div', '', 'summary-total');
        total.append(ui.text('span', 'Total del envío'), ui.text('strong', ui.money(data.total)));
        result.append(total, ui.text('p', data.days, 'rate-note'));
        empty.hidden = true;
        result.hidden = false;
    });
    const clearResult = () => {
        result.hidden = true;
        empty.hidden = false;
    };
    form.addEventListener('input', clearResult);
    form.addEventListener('change', clearResult);
    document.getElementById('quoteReset').addEventListener('click', () => {
        form.reset();
        clearResult();
        form.querySelectorAll('[aria-invalid]').forEach((i) => ui.error(i, ''));
        document.getElementById('weight').focus();
    });
})();
