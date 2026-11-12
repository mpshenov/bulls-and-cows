export const el = (tag, text, className) => {
    const element = document.createElement(tag);
    if (text)
        element.textContent = text;
    if (className)
        element.className = className;
    return element;
};
export const clear = (container) => {
    container.replaceChildren();
};
