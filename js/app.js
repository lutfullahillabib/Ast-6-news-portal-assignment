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
    console.log(news);
    const ul = document.getElementById('ul');
    news.forEach(catagory => {
        // console.log(catagory);
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.innerHTML = `
        <a onclick = loadCatagory('${catagory.category_id}') class="nav-link" aria-current="page" href="#">${catagory.category_name ? catagory.category_name : 'Name Not Found'}</a>
        `
        ul.appendChild(li);

    });
}


// load category
const loadCatagory = async (categoryId) => {
    toggleSpinner(true);
    // console.log(categoryId);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data.data);

        // console.log(data.data.length);

        // console.log(categoryId);

        showCatagory(data.data, categoryId);
    }
    catch (error) {
        console.log(error);
    }
}


// show category
const showCatagory = (show, catId) => {
    console.log(show, catId);

    const showCategory = document.getElementById('show-category');
    showCategory.innerHTML = '';

    show.forEach(showSingleCategory => {
        console.log(showSingleCategory);
        const showCategoryDiv = document.createElement('div');
        showCategoryDiv.classList.add('row', 'mb-3', 'border', 'border-3', 'rounded-4', 'bg-white');
        showCategoryDiv.innerHTML = `
        <div class="col-md-4 p-0">
        <img src="${showSingleCategory.thumbnail_url ? showSingleCategory.thumbnail_url : 'No Img Found'}" class="img-fluid w-full rounded-start" alt="...">
        </div>
        <div class="col-md-8 py-3">
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

        <button onclick = loadModal('${showSingleCategory._id}') type="button" class="btn btn-primary rounded px-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <i class="fa-sharp fa-solid fa-arrow-right"></i>
        </button>
        

    </div>
                    
        </div >
    `
        showCategory.appendChild(showCategoryDiv);

    });

    toggleSpinner(false);



    // $-items found for category ${category}

    const newsLength = document.getElementById("news-number");
    newsLength.innerText = show.length;
    // console.log(show.length);

    // const newsArr = [];
    // for (let i = 0; i > 0; i++) {
    //     const name = newsArr[i].newsLength;
    //     const span = document.createElement("span");
    //     span.innerHTML = `
    //         <p>${newsArr}</p>
    //     `;
    //     newsLength.appendChild(name);
    // }

    //// again loading all-categories for span innterText
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

    //// Now, again display from all-categories for span innterText
    const displayNews = news => {
        console.log(news);

        // convert to int the categoryId from string..
        const CatNumId = parseInt(catId);
        console.log(CatNumId);

        //category_name in span
        const categoryName = document.getElementById("categoryName");
        categoryName.innerText = news[CatNumId - 1].category_name;
    }

    loadNews();
    ////
}

//spinner
const toggleSpinner = (isLoading) => {
    const loaderSpinner = document.getElementById('spinner')
    if (isLoading) {
        loaderSpinner.classList.remove('d-none')
    }
    else {
        loaderSpinner.classList.add('d-none')
    }
}


//load Modal
const loadModal = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data.data[0]);
        displayModal(data.data[0]);
    }
    catch (error) {
        console.log(error);
    }
}

//show Modal
const displayModal = modal => {
    console.log(modal);

    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = modal.title ? modal.title : "No Title found";

    const modalAll = document.getElementById('modal');
    modalAll.textContent = '';

    modalAll.innerHTML = `
    
        <img class="img-fluid" src="${modal.image_url ? modal.image_url : 'No Img'}" alt="">
        <h5>Author Name: ${modal.author.name ? modal.author.name : 'No Name Found'}</h5>
        <p><strong>Published Date:</strong> ${modal.author.published_date ? modal.author.published_date : 'No Date Found'}</p>
        <p><strong>Details:</strong> ${modal.details ? modal.details : 'No Deatils Found'}</p>
        <p><strong>Rating:</strong> ${modal.rating.number ? modal.rating.number : 'Not Found'}</p>
        <p><strong>Views:</strong> ${modal.total_view ? modal.total_view : 'Not Found'}</p>
    
    `
}


loadNews();

