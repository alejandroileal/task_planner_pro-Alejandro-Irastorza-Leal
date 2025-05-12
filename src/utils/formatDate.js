export function formatDate(date) {
  return new Date(date).toLocaleString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
