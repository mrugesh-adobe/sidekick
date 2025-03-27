export default function decorate(block) {
  // Create an array to store download card data
  const downloadCardData = Array.from(block.children).map((item) => {
    const imgSrc = item.querySelector('img').src;
    const imgAlt = item.querySelector('img').alt || item.querySelector('p').textContent.trim();
    const title = item.querySelector('p').textContent.trim();
    const downloadLink = item.querySelector('a').href;

    return { imgSrc, imgAlt, title, downloadLink };
  });

  // Replace block inner HTML with structured HTML
  block.innerHTML = downloadCardData.map((card) => `
    <div class="download-card-card">
      <img src="${card.imgSrc}" alt="${card.imgAlt}">
      <h3>${card.title}</h3>
      <a href="${card.downloadLink}" class="download-card-button">Download</a>
    </div>
  `).join('');
}
