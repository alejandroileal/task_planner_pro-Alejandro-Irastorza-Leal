import { newsRepo } from "../api/news.api.js";
import { app } from "../app.js";
import { newsSlice } from "../state/newsSlice.js";
import { withLoading } from "../utils/withLoading.js";
import { createNewsItem } from "../ui/newsUI.js";

export async function renderNews() {
  if (!newsSlice.news) {
    await withLoading(() => newsRepo.fetchNews());
  }

  const newsHTML = `
    <section id="section-3" class="dashboard__section">
      <div class="dashboard__top-navigator">
        <div class="dashboard__top-left">
          <p class="dashboard__top-back" id="newsBackBtn">Back</p>
          <div class="dashboard__top-left-page-title">
            <p>📰</p>
            <p>Noticias</p>
          </div>
        </div>
      </div>

      <header class="news__header">
        <p class="dashboard__icon">📰</p>
      </header>

      <div class="dasboard__section-content">
        <h1 class="dashboard__main-title">Últimas noticias</h1>
        <section class="news__widget">
          <div class="news__search-container">
            <input class="news__search-input" type="text" placeholder="Busca un tema en específico" id="searchTopicInput">
            <button class="news__search-button" id="newsSearchBtn">Buscar</button>
          </div>
          <ul class="news__list" id="newsList"></ul>
        </section>
      </div>
    </section>
  `;

  app.elements.main.element.innerHTML = newsHTML;

  // Event listeners
  document.querySelector("#newsBackBtn").addEventListener("click", () => {
    app.navigate("nav");
  });

  document
    .querySelector("#newsSearchBtn")
    .addEventListener("click", async () => {
      const topic = document.querySelector("#searchTopicInput").value;
      await withLoading(() => newsRepo.fetchNews(topic));
      renderNews(); // Re-render with new results
    });

  // Render noticias
  const newsListElement = document.querySelector("#newsList");
  const news = newsSlice.news;

  if (news?.length) {
    news.forEach((item) => newsListElement.append(createNewsItem(item)));
  } else {
    newsListElement.innerHTML = `<li class="news__empty">No hay noticias disponibles.</li>`;
  }
}
