export function imgListItem(imgPath) {
  return `<li class="dashboard__img-item" data-src="${imgPath}"><img
            src="http://localhost:3500${imgPath}"
            alt="" srcset="">
          </li>`;
}
