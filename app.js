const apiKey = 'YOUR_AP_NEWS_API_KEY';
const queryUrl = `https://api.apnews.com/v2/search?sort_by=urgency&sort_order=desc&q=urgency:1&fields=title,url,urgency&limit=10&apikey=${apiKey}`;
const newsContainer = document.getElementById("news-container");

const stripe = Stripe("YOUR_STRIPE_PUBLISHABLE_KEY");
const subscribeButton = document.getElementById("subscribe-button");

subscribeButton.addEventListener("click", async event => {
  event.preventDefault();
  const { error } = await stripe.redirectToCheckout({
    items: [{ plan: "plan_HJKLkjhgf", quantity: 1 }],
    successUrl: "https://example.com/success",
    cancelUrl: "https://example.com/cancel"
  });
  if (error) {
    console.log(error);
  }
});

setInterval(() => {
  fetch(queryUrl)
    .then(response => response.json())
    .then(data => {
      const news = data.articles;
      newsContainer.innerHTML = "";
      for (let i = 0; i < news.length; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${news[i].title}</
            <a href="${news[i].url}" class="card-link" target="_blank">Read More</a>
          </div>
        `;
        newsContainer.appendChild(card);
      }
    })
    .catch(error => console.log(error));
}, 10000);