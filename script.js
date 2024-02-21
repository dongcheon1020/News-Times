const APT_KEY = "3458d4bb705d428295269fe64ff576b0";
let newsList = [];
const getLatestNews = async () => {
  const url = new URL(
    // `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
    `https://tiny-melba-6e7595.netlify.app/top-headlines?country=kr`
  );
  // https://tiny-melba-6e7595.netlify.app
  const response = await fetch(url);
  const data = await response.json();

  newsList = data.articles;
  render();

  console.log("ddd", newsList);
};
const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `
         <div class="row news">
          <div class="col-lg-4">
            <img
              class="news-img-size"
              src="${
                news.urlToImage ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
              }"
              alt=""
            />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>
              ${
                news.description == null || news.description == ""
                  ? "내용없음"
                  : news.description.length > 200
                  ? news.description.substring(0, 200) + "..."
                  : news.description
              }
            </p>
            <div>${news.rights || "no source"}  ${moment(
        news.published_date
      ).fromNow()}</div>
        </div>
        </div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};
getLatestNews();
