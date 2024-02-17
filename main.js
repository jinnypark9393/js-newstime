const API_KEY = "a8e8910b7aa0462dac26cc5a997a65bc"
let news = [] // 다른 함수에서 사용하기 위해 전역변수 선언
let searchIcon = document.getElementById("search-icon")
let showSearchIcon = false;

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
    news = data.articles

    // console.log("response: ", response);
    console.log("news: ", news);
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
function render() {
    let newsResultHTML ="";
    for (let i = 0; i < news.length; i++) {
        newsResultHTML += `<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src="${news[i].urlToImage}">
        </div>
        <div class="col-lg-8">
            <h2 class="news-title">${news[i].title}</h2>
            <p class="news-content">
                ${news[i].description}
            </p>
            <div class="news-info">
                ${news[i].source.name} | ${news[i].publishedAt}
            </div>
        </div>
    </div>`
    }
    document.getElementById("news-section").innerHTML = newsResultHTML
}

getLatestNews()