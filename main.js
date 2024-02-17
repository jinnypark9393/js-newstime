const API_KEY = "a8e8910b7aa0462dac26cc5a997a65bc"
let newsList = [] // 다른 함수에서 사용하기 위해 전역변수 선언
let searchIcon = document.getElementById("search-icon")
let showSearchIcon = false;

const menus = document.querySelectorAll(".menus button")
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)))

// 네비게이션 바
const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
}

const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
}

const getLatestNews = async () => {
    // JS 내장함수 활용해 URL 인스턴스 생성
    let url = new URL(
        `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
        )
    console.log("URL", url)

    // fetch 함수가 데이터를 받을 때까지 대기: await (안쓰면 데이터 출력 안되고 pending 상태가 됨)
    // await을 포함하려면 비동기 함수 표현을 넣어야함: async
    const response = await fetch(url);
    const data = await response.json() // response를 json형태로 변환
    newsList = data.articles

    // console.log("response: ", response);
    console.log("news: ", newsList);
    render()
}

// 카테고리 별 뉴스 가져오기
// 1. 버튼들에 click 이벤트 추가
// 2. 카테고리별 뉴스 가져오기
// 3. 카테고리에 해당하는 뉴스 보여주기
const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    console.log("category: ", category)
    const url = new URL(
        // API KEY는 맨 끝에(바뀌지 않는 값)
        `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
        );
    const response = await fetch(url);
    const data = await response.json()
    newsList = data.articles

    render()
}

function addSearchBar() {
    let inputArea = document.getElementById("input-area")
    if (inputArea.style.display == "flex") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "flex";
    }
}

// 뉴스 리스트 그려주는 함수
const render = () => {
    const newsHTML = newsList.map(news =>  `<div class="row news">
    <div class="col-lg-4">
        <img class="news-img-size" src="${news.urlToImage}">
    </div>
    <div class="col-lg-8">
        <h2 class="news-title">${news.title}</h2>
        <p class="news-content">
            ${news.description}
        </p>
        <div class="news-info">
            ${news.source.name} | ${news.publishedAt}
        </div>
    </div>
  </div>`).join(''); // array를 string으로 변경(','를 안보이게)
    document.getElementById("news-section").innerHTML = newsHTML;
}

getLatestNews()