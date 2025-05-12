export function createNewsItem(newsItem) {
  const li = document.createElement("li");
  li.classList.add("news__item");

  li.innerHTML = `
    <div class="news__photo" style="background-image: url(${
      newsItem.urlToImage
    })"></div>
    <div class="news__info-container">
      <h2 class="news__title">${newsItem.title}</h2>
      <div class="news__aux-info">
        <p class="news__author">${newsItem.author || "Sin autor"}</p>
        <span>|</span>
        <p class="news__source">${newsItem.source.name}</p>
        <span>|</span>
        <p class="news__publishedAt">${new Date(
          newsItem.publishedAt
        ).toLocaleString("es-ES", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}</p>
      </div>
      <p class="news__description">${newsItem.description}</p>
      <a href="${
        newsItem.url
      }" class="news__link" target="_blank" rel="noopener">Leer más</a>
    </div>
  `;

  return li;
}
