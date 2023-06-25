// 페이징 9분~

const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";
// 공유자원
const store = {
    currentPage: 1,
};

// JSON 형태의 응답 값(ajax.response)을 객체로 변환
function getData(url) {
    ajax.open("GET", url, false);
    ajax.send();

    return JSON.parse(ajax.response);
}

function newsFeed() {
    const newsFeed = getData(NEWS_URL);
    const newsList = [];

    newsList.push('<ul>')
    
    for (let i = store.currentPage - 1; i < 10; i++) {
        const div = document.createElement("div");
    
        newsList.push(`
        <li>
            <a href="#/show/${newsFeed[i]
            .id}"> ${newsFeed[i]
            .title} (${newsFeed[i]
            .comments_count})
            </a>
        </li>
        `);
    }

    newsList.push('</ul>');
    newsList.push(`
        <div>
            <a href="#/page/${store.currentPage - 1}">이전 페이지</a>
            <a href="#/page/${store.currentPage + 1}">다음 페이지</a>
        </div>
    `);

    container.innerHTML = newsList.join('');
}

function newsDetail() {
    const id = location
        .hash
        .substring(1);

    const newsContent = getData(CONTENT_URL.replace("@id", id));
    const title = document.createElement("h1");

    container.innerHTML = `
    <h1>
    {newsContent.title}
    </h1>

    <div>
    <a href="#">목록으로</a>
    </div>
    `;
}

function router() {
    const routePath = location.hash;

    if (routePath === '') {
        newsFeed();
    } else if (routePath.indexOf('#/page/') >= 0){
        store.currentPage += 2;
        newsFeed();
    } else {
        newsDetail();
    }
}

window.addEventListener("hashchange", router);

router();