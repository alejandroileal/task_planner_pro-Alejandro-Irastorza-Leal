import { newsSlice } from "../state/newsSlice.js";
import { htmlActions } from "../utils/htmlActions.js";

export const newsRepo = {
  async fetchNews(topic = "code") {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${topic}&apikey=${newsSlice.apikey}`
      );
      const { articles } = await response.json();
      newsSlice.news = articles;
    } catch (error) {
      htmlActions.showSimpleDialog(error.message);
    }
  },
};
