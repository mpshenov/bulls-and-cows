import { el } from './render.js';
const STORAGE_KEY = (length, base) => `records:${length}:${base}`;
export const loadRecords = (length, base) => {
    const raw = localStorage.getItem(STORAGE_KEY(length, base));
    return raw ? JSON.parse(raw) : [];
};
export const saveRecord = (length, base, entry) => {
    const records = loadRecords(length, base);
    const updated = [...records, entry]
        .sort((a, b) => a.attempts - b.attempts || a.timeMs - b.timeMs)
        .slice(0, 10);
    localStorage.setItem(STORAGE_KEY(length, base), JSON.stringify(updated));
};
export const renderRecords = (container, length, base) => {
    const records = loadRecords(length, base);
    container.appendChild(el('h2', `Рекорды (длина ${length}, система ${base})`));
    if (records.length === 0) {
        container.appendChild(el('p', 'Пока нет рекордов'));
        return;
    }
    const list = document.createElement('ol');
    for (const r of records) {
        list.appendChild(el('li', `${r.attempts} попыток, ${(r.timeMs / 1000).toFixed(1)} сек`));
    }
    container.appendChild(list);
};
