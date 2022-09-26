export default function markupImages(data) {
  const hits = data.hits;
  return hits
    .map(
      ({ webformatURL, largeImageURL, views, likes, comments, downloads }) => {
        return `

<div class="photo-card">
  <a class="photo-card__link" href="${largeImageURL}">
  <img class="photo-card__img" src="${webformatURL}" alt="" loading="lazy"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div> 
    `;
      }
    )
    .join('');
}
