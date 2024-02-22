const API_KEY = "a8e8910b7aa0462dac26cc5a997a65bc"
let newsList = [] // 다른 함수에서 사용하기 위해 전역변수 선언
let searchIcon = document.getElementById("search-icon")
let showSearchIcon = false;
// URL 전역변수로 빼기
let url = new URL(`https://240224-assignment.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`)
let totalResults = 0
let page = 1
const pageSize = 10 // 고정값
const groupSize = 5 // 고정값

const menus = document.querySelectorAll(".menus button")
const sideMenus = document.querySelectorAll(".side-menus button")
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)))
sideMenus.forEach(sideMenus => sideMenus.addEventListener("click", (event) => getNewsByCategory(event)))

// 네비게이션 바
const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
}

const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
}

const getNews = async () => {
    try {
        // URL 끝에 쿼리 세팅 (URL 호출 전에 세팅해야함)
        url.searchParams.set("page", page) // => &page=page
        url.searchParams.set("pageSize", pageSize)

        // 에러 검사하고자 하는 대상 코드 삽입
        const response = await fetch(url);
        const data = await response.json() // response를 json형태로 변환

        if (response.status === 200) {
            if (data.articles.length === 0) {
                throw new Error("No result for this search.")
            }
            newsList = data.articles
            totalResults = data.totalResults
            render()
            paginationRender()
        } else {
            throw new Error(data.message)
        }
    } catch (error) {
        // console.log("error: ", error)
        let errorMessage = error.message
        errorRender(errorMessage)
    }
    
}

const getLatestNews = async () => {
    // JS 내장함수 활용해 URL 인스턴스 생성
    url = new URL(`https://240224-assignment.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`)
    // console.log("URL", url)

    // fetch 함수가 데이터를 받을 때까지 대기: await (안쓰면 데이터 출력 안되고 pending 상태가 됨)
    // await을 포함하려면 비동기 함수 표현을 넣어야함: async
    
    // console.log("response: ", response);
    // console.log("news: ", newsList);

    getNews()
}

// 카테고리 별 뉴스 가져오기
// 1. 버튼들에 click 이벤트 추가
// 2. 카테고리별 뉴스 가져오기
// 3. 카테고리에 해당하는 뉴스 보여주기
const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    // console.log("category: ", category)
    // 전역변수 url을 재정의
    url = new URL(
        // API KEY는 맨 끝에(바뀌지 않는 값)
        `https://240224-assignment.netlify.app/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
        );
    
    getNews()
}

function addSearchBar() {
    let inputArea = document.getElementById("input-area")
    if (inputArea.style.display == "flex") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "flex";
    }
}

const getNewsByKeyword = async () => {
    const keyword = document.getElementById("search-input").value
    // console.log("keyword", keyword)

    url = new URL(
        // API KEY는 맨 끝에(바뀌지 않는 값)
        `https://240224-assignment.netlify.app/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
        );
    
    getNews()
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

const errorRender = (errorMessage) => {
    const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
    </div>`
    document.getElementById("news-section").innerHTML = errorHTML;
}

const paginationRender = () => {
    // totalResult
    // page
    // pageSize
    // groupSize

    // totalPages: 총 페이지 수 = 총 데이터 수 / 페이지 사이즈(10)
    const totalPages = Math.ceil(totalResults / pageSize)
    // pageGroup: 현재 페이지를 그룹 사이즈(5)로 나눈 것 (예: page=13 이면 13/5=2.6의 반올림=3)
    let pageGroup = Math.ceil(page / groupSize)
    
    // lastPage: 페이지 그룹의 마지막 페이지
    // 마지막 페이지 그룹이 그룹 사이즈보다 클 경우? lastPage = totalPage
    let lastPage = pageGroup * groupSize
    if (lastPage > totalPages || lastPage < groupSize) {
        lastPage = totalPages
    }
    // firstPage: 페이지 그룹의 첫번째 페이지
    // firstPage가 0보다 작을 경우 1: 아닐 경우 원래 수식
    let firstPage = lastPage - (groupSize - 1)<=0? 1: lastPage - (groupSize - 1);

    // 1페이지에서는 Previous 버튼 삭제 	
    let paginationHTML = `
    <li class="page-item" style="${page === 1 ? "display: none;" : ""}" onclick="moveToPage(1)" href="#js-bottom"><a class="page-link btn-page-move" href="#">&lt;&lt;</a></li>
    <li class="page-item" style="${page === 1 ? "display: none;" : ""}" onclick="moveToPage(${page-1})" href="#js-bottom"><a class="page-link btn-page-move">&lt;</a></li>
    `
    for (let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `
        <li class="page-item ${i === page ? "active" : ""}"><a class="page-link" onclick="moveToPage(${i})">${i}</a></li>
        `
    }

    // 마지막 페이지에서는 Next 버튼 삭제
    paginationHTML += `
    <li class="page-item" style="${page === totalPages ? "display: none;" : ""}" onclick="moveToPage(${page+1})" href="#js-bottom"><a class="page-link btn-page-move">&gt;</a></li>
    <li class="page-item" style="${page === totalPages ? "display: none;" : ""}" onclick="moveToPage(${totalPages})" href="#js-bottom"><a class="page-link btn-page-move">&gt;&gt;</a></li>
    `
    document.querySelector(".pagination").innerHTML = paginationHTML
} 

const moveToPage = (pageNum) => {
    console.log("pageNum:", pageNum)
    page = pageNum;
    getNews()
}

getLatestNews()
