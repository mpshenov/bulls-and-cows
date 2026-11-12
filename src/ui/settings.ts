import { clear, el } from './render.js';

export type OnStart = (length: number, base: number) => void;

export const renderSettings = (container: HTMLElement, onStart: OnStart): void => {
  clear(container);

  const h1Element = el('h1', 'Cows and Bulls game', 'heading-1');
  container.append(h1Element);

  const baseSelectElement = document.createElement('select');
  const bases = [
    { value: 2, label: 'bin' },
    { value: 8, label: 'oct' },
    { value: 10, label: 'dec' },
    { value: 16, label: 'hex' },
  ];
  for (const element of bases) {
    const optionElement = document.createElement('option');
    optionElement.value = String(element.value);
    optionElement.textContent = element.label;
    baseSelectElement.appendChild(optionElement);
  }
  baseSelectElement.value = '10';

  const lengthSelectElement = document.createElement('select');
  for (let len = 2; len <= 6; len++) {
    const optionElement = document.createElement('option');
    optionElement.value = String(len);
    optionElement.textContent = String(len);
    lengthSelectElement.appendChild(optionElement);
  }

  const updateLengthOptions = (base: number): void => {
    for (const option of Array.from(lengthSelectElement.options)) {
      const len = Number(option.value);
      option.disabled = base === 2 && len > 2;
    }
    if (base === 2 && Number(lengthSelectElement.value) > 2) {
      lengthSelectElement.value = '2';
    }
  };
  updateLengthOptions(Number(baseSelectElement.value));

  baseSelectElement.addEventListener('change', () => {
    updateLengthOptions(Number(baseSelectElement.value));
  });

  const startButton = document.createElement('button');
  startButton.textContent = 'Старт';
  startButton.addEventListener('click', () => {
    const length = Number(lengthSelectElement.value);
    const base = Number(baseSelectElement.value);
    onStart(length, base);
  });

  container.appendChild(el('label', 'Система: '));
  container.appendChild(baseSelectElement);
  container.appendChild(el('label', 'Длина: '));
  container.appendChild(lengthSelectElement);
  container.appendChild(startButton);
};
