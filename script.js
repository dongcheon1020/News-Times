const APT_KEY = "3458d4bb705d428295269fe64ff576b0";
let news = [];
const getLatestNews = async () => {
  const url = new URL(
    `https://https://dongcheon1020.github.io/News-Times/top-headlines?country=us&apiKey=${APT_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log("ddd", news);
};
getLatestNews();
