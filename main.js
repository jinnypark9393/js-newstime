const API_KEY = "a8e8910b7aa0462dac26cc5a997a65bc"
const gentLatestNews = () => {
    // JS 내장함수 활용해 URL 인스턴스 생성
    const url = new URL(
        `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
        )
    const response = fetch(url)
}

gentLatestNews()