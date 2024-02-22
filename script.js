const APT_KEY = "3458d4bb705d428295269fe64ff576b0";
let newsList = [];
const menus = document.querySelectorAll(".menu-item-bt");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

const getLatestNews = async () => {
  const url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${APT_KEY}`
    `https://tiny-melba-6e7595.netlify.app/top-headlines?country=kr`
  );
  // https://tiny-melba-6e7595.netlify.app
  const response = await fetch(url);
  const data = await response.json();

  newsList = data.articles;
  render();

  console.log("ddd", newsList);
};

const getNewsByCategory = async (event) => {
  const catefory = event.target.textContent.toLowerCase();
  console.log(catefory);
  const url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&category=${catefory}&apiKey=${APT_KEY}`
    `https://tiny-melba-6e7595.netlify.app/top-headlines?category=${catefory}&country=kr`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("ddddd", data);
  newsList = data.articles;
  render();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  const url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${APT_KEY}`
    `https://tiny-melba-6e7595.netlify.app/top-headlines?q=${keyword}&country=kr`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("sdfsafsdafssdfsadf", data);
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

// menu
const menu = document.querySelector(".menus");
const menuClose = document.querySelector(".close");
const openMenu = document.querySelector(".m-bt");
const backgorundLayout = document.querySelector(".background");

openMenu.addEventListener("click", () => {
  menu.style = "left:0";
  backgorundLayout.style = "display:block";
});
menuClose.addEventListener("click", () => {
  menu.style = "left:-60%";
  backgorundLayout.style = "display:none";
});

window.addEventListener("resize", () => {
  let screenWidth = window.innerWidth;
  if (screenWidth > 992) {
    menu.style = "translateX(0%)";
    backgorundLayout.style = "display:none";
  } else {
    menu.style = "translateX(-60%)";
  }
});

// search
let inputArea = document.querySelector(".input-area");

const openSearchBox = () => {
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};
