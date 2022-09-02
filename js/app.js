const loadNews = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
}

const displayNews = news => {
    // console.log(news);
    const ul = document.getElementById('ul');
    news.forEach(catagory => {
        console.log(catagory);
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.innerHTML = `
        <a class="nav-link" aria-current="page" href="#">${catagory.category_name}</a>
        `
        ul.appendChild(li);
    });
}

loadNews();