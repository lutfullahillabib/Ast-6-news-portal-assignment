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
        <a onclick = loadCatagory('${catagory.category_id}') class="nav-link" aria-current="page" href="#">${catagory.category_name ? catagory.category_name : 'Name Not Found'}</a>
        `
        ul.appendChild(li);
    });
}

// load & show category
const loadCatagory = async (categoryId) => {
    // console.log(categoryId);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data.data);
        showCatagory(data.data);
    }
    catch (error) {
        console.log(error);
    }
}

const showCatagory = show => {
    console.log(show);

    const showCategory = document.getElementById('show-category');
    showCategory.innerHTML = '';

    show.forEach(showSingleCategory => {
        console.log(showSingleCategory);
        const showCategoryDiv = document.createElement('div');
        showCategoryDiv.classList.add('row', 'mb-3', 'border', 'border-3', 'rounded-4');
        showCategoryDiv.innerHTML = `
        <div class="col-md-4 p-0">
        <img src="${showSingleCategory.thumbnail_url ? showSingleCategory.thumbnail_url : 'No Img Found'}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${showSingleCategory.title ? showSingleCategory.title : 'No Title Found'}</h5>
                <p class="card-text">${showSingleCategory.details ? showSingleCategory.details.slice(0, 150) : 'No Details Found'}...</p>
                
            </div >


    <div class="d-flex  align-items-center justify-content-between pt-5 pb-2">

        <div class="d-flex align-items-center justify-content-center gap-2">
            <img class="rounded-circle" style="width: 50px" src="${showSingleCategory.author.img ? showSingleCategory.author.img : 'No Img Found'}" alt="">

                <p class="m-0">${showSingleCategory.author.name ? showSingleCategory.author.name : "Author not found"}
                </p>
        </div>

        <div class="d-flex align-items-center justify-content-center gap-2">
            <i class="fa-regular fa-eye"></i>

            <p class="m-0">${showSingleCategory.total_view ? showSingleCategory.total_view : "Not Available"}
            </p>
        </div>

        <button type="button" class="btn btn-primary rounded px-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <i class="fa-sharp fa-solid fa-arrow-right"></i>
        </button>

    </div>
                    
        </div >
    `
        showCategory.appendChild(showCategoryDiv);
    });

}

loadNews();