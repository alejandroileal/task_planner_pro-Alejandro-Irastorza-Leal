export function getFormData(form) {
  const data = {};
  Array.from(form.elements).forEach((input) => {
    if (input instanceof HTMLButtonElement || !input.name) return;
    data[input.name] = input.value;
  });
  return data;
}
