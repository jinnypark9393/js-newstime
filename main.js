const API_KEY = "a8e8910b7aa0462dac26cc5a997a65bc"
let news = [] // 다른 함수에서 사용하기 위해 전역변수 선언

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
}

getLatestNews()
for (let i = 0; i < 20; i++) {
    console.log("after getLatestNews", i);
}