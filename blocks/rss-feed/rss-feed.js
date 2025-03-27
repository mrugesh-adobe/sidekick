async function fetchNewsData() {
  const response = await fetch('https://newsdata.io/api/1/news?apikey=pub_74190f1a09ff0aad8b8e1dd35167f33e536f6&q=technology&country=in&language=en');
  if (response.ok) {
    const data = await response.json();
    return data.results || [];
  }
  return [];
}

export default async function decorate(block) {
  const newsItems = await fetchNewsData();
  
  block.innerHTML = `
    <h2>Latest News</h2>
    <div class="rss-feed-grid">
      ${newsItems.map(item => `
        <article class="rss-feed-card">
          <img src="${item.image_url || 'default-image.jpg'}" alt="News Image"/>
          <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
          <p class="source"><a href="${item.source_url}" target="_blank">${item.source_id}</a></p>
          <time datetime="${item.pubDate}">${new Date(item.pubDate).toLocaleDateString()}</time>
        </article>
      `).join('')}
    </div>
  `;
}
