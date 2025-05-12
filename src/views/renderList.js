export function renderList({ containerId, items, createElement, sortBy }) {
  const container = document.querySelector(`#${containerId}`);
  if (!container) return;
  container.innerHTML = "";
  items
    .sort((a, b) => new Date(a[sortBy]) - new Date(b[sortBy]))
    .forEach((item) => container.append(createElement(item)));
}
