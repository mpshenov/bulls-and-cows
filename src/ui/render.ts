export const el = (tag: string, text?: string, className?: string): HTMLElement => {
  const element = document.createElement(tag);
  if (text) element.textContent = text;
  if (className) element.className = className;
  return element;
};

export const clear = (container: HTMLElement): void => {
  container.replaceChildren();
};
