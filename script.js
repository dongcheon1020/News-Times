const APT_KEY = "3458d4bb705d428295269fe64ff576b0";
let newsList = [];
const menus = document.querySelectorAll(".menu-item-bt");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);
let url = new URL(
  // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${APT_KEY}`
  `https://tiny-melba-6e7595.netlify.app/top-headlines?country=kr`
);
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
  try {
    url.searchParams.set("page", page);
    url.searchParams.set("pageSize", pageSize);
    const response = await fetch(url);

    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (e) {
    errorRender(e.message);
  }
};

const getLatestNews = async () => {
  page = 1;
  url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${APT_KEY}`
    `https://tiny-melba-6e7595.netlify.app/top-headlines?country=kr`
  );
  getNews();
};

const getNewsByCategory = async (event) => {
  page = 1;
  const catefory = event.target.textContent.toLowerCase();

  url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&category=${catefory}&apiKey=${APT_KEY}`
    `https://tiny-melba-6e7595.netlify.app/top-headlines?category=${catefory}&country=kr`
  );
  getNews();
};

const getNewsByKeyword = async () => {
  page = 1;
  const keyword = document.getElementById("search-input").value;

  url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${APT_KEY}`
    `https://tiny-melba-6e7595.netlify.app/top-headlines?q=${keyword}&country=kr`
  );
  getNews();
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `

      <article class="news">
      <div class="news-img">
        <img
          src="${
            news.urlToImage ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
          }"
          alt=""
        />
      </div>
      <section class="news-captions">
        <h2 class="news-title">
        ${news.title}
        </h2>
        <p class="news-description">
        ${
          news.description == null || news.description == ""
            ? "내용없음.."
            : news.description.length > 100
            ? news.description.substring(0, 100) + "..."
            : news.description
        }
        </p>
        <cite class="rights-date">${news.author || "no source"} - ${moment(
        news.publishedAt
      ).fromNow()}</cite>
      </section>
    </article>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (em) => {
  const errorHTML = `
  
    <div class=" alert-danger" role="alert">
    <img class="errorimg" src="exclamationmark.triangle.fill 1.svg" alt="error" />
<span class="errormessage">${em}</span>
  
</div>
`;
  document.getElementById("news-board").innerHTML = errorHTML;
};

const paginationRender = () => {
  const totalPages = Math.ceil(totalResults / pageSize);
  // pageGroup
  const pageGroup = Math.ceil(page / groupSize);
  // lastPage
  let lastPage = pageGroup * groupSize;
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  // firstPage
  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);
  let paginationHTML = `  
  <li class="page-item ${
    page <= firstPage ? "disabled" : " "
  } " onclick="moveToPage(${firstPage})"><a class="page-link" href="#">&lt&lt;</a></li>
  <li class="page-item ${
    page <= firstPage ? "disabled" : " "
  } " onclick="moveToPage(${
    page <= firstPage ? page : page - 1
  })"><a class="page-link" href="#">&lt;</a></li>
    <li class="page-items">
      <ul class="pagination-items">
      </ul>
    </li>
  `;

  let paginationItemsHTML = ``;
  for (let i = firstPage; i <= lastPage; i++) {
    paginationItemsHTML += `
    <li class="page-item ${
      i === page ? "active" : ""
    }" onclick="moveToPage(${i})" ><a class="page-link" href="#">${i}</a></li>
    `;
  }

  paginationHTML += `
  <li class="page-item ${
    page >= lastPage ? "disabled" : " "
  } " onclick="moveToPage(${
    page >= lastPage ? page : page + 1
  })"><a class="page-link" href="#">&gt;</a></li>
  <li class="page-item ${
    page >= lastPage ? "disabled" : " "
  } " onclick="moveToPage(${lastPage})"><a class="page-link" href="#">&gt&gt;</a></li>
  `;

  document.querySelector(".pagination").innerHTML = paginationHTML;
  document.querySelector(".pagination-items").innerHTML = paginationItemsHTML;
};

const moveToPage = (pageNum) => {
  page = pageNum;
  getNews();
};

getLatestNews();

const textInput = document.getElementById("search-input");
textInput.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    getNewsByKeyword();
  }
});
textInput.addEventListener("click", () => {
  textInput.value = "";
});

// menu
const menu = document.querySelector(".menus");
const menuClose = document.querySelector(".close");
const openMenu = document.querySelector(".m-bt");
const backgorundLayout = document.querySelector(".background");

menus.forEach((e) => {
  e.addEventListener("click", () => {
    e.classList.add("active");
    menus.forEach((i) => {
      if (i !== e) {
        i.classList.remove("active");
      }
    });
  });
});

openMenu.addEventListener("click", () => {
  menu.style = "display:block";
});
menuClose.addEventListener("click", () => {
  menu.style = "display:none";
});
menus.forEach((e) => {
  e.addEventListener("click", () => {
    let screenWidth = window.innerWidth;
    if (screenWidth < 980) {
      menu.style = "display:none";
    }
  });
});

window.addEventListener("resize", () => {
  let screenWidth = window.innerWidth;
  if (screenWidth > 980) {
    menu.style = "display:flex";
    menu.style = "background-color:#fff";
  }
});

// search
let inputArea = document.querySelector(".input-area");

// const openSearchBox = () => {
//   if (inputArea.style.display === "inline") {
//     inputArea.style.display = "none";
//   } else {
//     inputArea.style.display = "inline";
//   }
// };
