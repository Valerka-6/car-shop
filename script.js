const cars = [{
        title: "Volvo XC90",
        transmission: "Автомат",
        tags: ["Кредит", "Лизинг"],
        price: 20000,
        img1: "./img/volvo_XC90.jpg",
        img2: "./img/volvo_XC90_1.jpg",
        img3: "./img/volvo_XC90_2.jpg",
        year: 2018,
        engine: "2,0 бензин",
    },
    {
        title: "BMW X1",
        transmission: "Автомат",
        tags: ["Лизинг"],
        price: 13700,
        img1: "./img/BMW_X1.jpg",
        img2: "./img/BMW_X1_1.jpg",
        img3: "./img/BMW_X1_2.jpg",
        year: 2011,
        engine: "2,0 бензин",
    },
    {
        title: "Chevrolet Malibu",
        transmission: "Автомат",
        tags: ["Кредит", "Лизинг"],
        price: 15200,
        img1: "./img/Chevrolet_Malibu.jpg",
        img2: "./img/Chevrolet_Malibu_1.jpg",
        img3: "./img/Chevrolet_Malibu_2.jpg",
        year: 2019,
        engine: "1,5 бензин",
    },
    {
        title: "Mazda CX-5",
        transmission: "Автомат",
        tags: ["Лизинг"],
        price: 14000,
        img1: "./img/Mazda_CX-5.jpg",
        img2: "./img/Mazda_CX-5_1.jpg",
        img3: "./img/Mazda_CX-5_2.jpg",
        year: 2013,
        engine: "2,2 дизель",
    },
    {
        title: "Opel Insignia",
        transmission: "Механика",
        tags: ["Кредит", "Лизинг"],
        price: 8900,
        img1: "./img/Opel_Insignia.jpg",
        img2: "./img/Opel_Insignia_1.jpg",
        img3: "./img/Opel_Insignia_2.jpg",
        year: 2010,
        engine: "1,6 бензин",
    },
    {
        title: "Skoda Karoq",
        transmission: "Автомат",
        tags: ["Лизинг"],
        price: 45700,
        img1: "./img/Skoda_Karoq.jpg",
        img2: "./img/Skoda_Karoq_1.jpg",
        img3: "./img/Skoda_Karoq_2.jpg",
        year: 2020,
        engine: "Автомат",
    },
    {
        title: "Toyota RAV4",
        transmission: "Механика",
        tags: ["Лизинг"],
        price: 17000,
        img1: "./img/Toyota_RAV4.jpg",
        img2: "./img/Toyota_RAV4_1.jpg",
        img3: "./img/Toyota_RAV4_2.jpg",
        year: 2013,
        engine: "2,0 дизель",
    },
    {
        title: "Volkswagen Tiguan",
        transmission: "Автомат",
        tags: ["Кредит", "Лизинг"],
        price: 23600,
        img1: "./img/Volkswagen_Tiguan.jpg",
        img2: "./img/Volkswagen_Tiguan_1.jpg",
        img3: "./img/Volkswagen_Tiguan_2.jpg",
        year: 2018,
        engine: "1.4 бензин",
    },
    {
        title: "Audi A5",
        transmission: "Автомат",
        tags: ["Кредит", "Лизинг"],
        price: 21000,
        img1: "./img/Audi_A5.jpg",
        img2: "./img/Audi_A5_1.jpg",
        img3: "./img/Audi_A5_2.jpg",
        year: 2009,
        engine: "3,0 дизель",
    },
];

let currentState = [...cars];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";
    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });
    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));


function prepareShopItem(shopItem) {
    const { title, transmission, tags, price, img1, img2, img3, year, engine } = shopItem;

    const item = itemTemplate.content.cloneNode(true);


    item.querySelector("h1").textContent = title;
    item.querySelector(".year").textContent = `${year}г.в`;
    item.querySelector(".engine").textContent = engine;
    item.querySelector(".transmission").textContent = transmission;
    item.querySelector(".price").textContent = `${price}$`;
    item.querySelector(".img1").src = img1;
    item.querySelector(".img2").src = img2;
    item.querySelector(".img3").src = img3;

    const tagsHolder = item.querySelector(".tags");
    tags.forEach((tag) => {
        const element = document.createElement("span");
        element.textContent = tag;
        element.classList.add("tag");
        tagsHolder.append(element);
    });
    addSlider(item);

    return item;
};
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();
    currentState = cars.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );
    currentState.sort((a, b) => sortByAlphabet(a, b));
    renderItems(currentState);
    sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");
sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
        case "expensive":
            {
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case "year":
            {
                currentState.sort((a, b) => a.year - b.year);
                break;
            }
        case "alphabet":
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }
    renderItems(currentState);
});


function addSlider(item) {
    // Получаем элементы слайдера
    const slider = item.querySelector('.slider');
    const prevButton = item.querySelector('.prev-button');
    const nextButton = item.querySelector('.next-button');
    const slides = Array.from(slider.querySelectorAll('img'));
    const slideCount = slides.length;
    let slideIndex = 0;

    // Устанавливаем обработчики событий для кнопок
    prevButton.addEventListener('click', showPreviousSlide);
    nextButton.addEventListener('click', showNextSlide);

    // Функция для показа предыдущего слайда
    function showPreviousSlide() {
        slideIndex = (slideIndex - 1 + slideCount) % slideCount;
        updateSlider();
    }

    // Функция для показа следующего слайда
    function showNextSlide() {
        slideIndex = (slideIndex + 1) % slideCount;
        updateSlider();
    }

    // Функция для обновления отображения слайдера
    function updateSlider() {
        slides.forEach((slide, index) => {
            if (index === slideIndex) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
    }

    // Инициализация слайдера
    updateSlider();
}