(() => {
    'use strict';
    const search = document.getElementById('faqSearch');
    if (!search) return;
    const normalize = (value) =>
        value
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    search.addEventListener('input', () => {
        const query = normalize(search.value.trim());
        let count = 0;
        document.querySelectorAll('.faq-list details').forEach((item) => {
            const match = normalize(item.textContent).includes(query);
            item.hidden = !match;
            if (match) count++;
        });
        document.getElementById('faqEmpty').hidden = count !== 0;
    });
})();
