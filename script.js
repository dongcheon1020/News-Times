const APT_KEY = "3458d4bb705d428295269fe64ff576b0";
let newsList = [];
const getLatestNews = async () => {
  const url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${APT_KEY}`
    `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
  );
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
            <div>${news.source.name || "no source"} * ${moment(
        news.publishedAt
      ).fromNow()}</div>
          </div>
        </div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};
getLatestNews();
