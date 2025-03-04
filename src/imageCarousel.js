import Carousel from "./carousel.js";


function imageCarousel(images, id, imageShowClass, slideBtnSelectClass) {
    const frame = document.createElement("div");
    frame.classList.add(`image-carousel-container-${id}`);
    const imageCarousel = document.createElement("div");
    imageCarousel.classList.add("image-carousel");


    let createNextBtn = function() {
        const btn = document.createElement("button");
        btn.classList.add("next-btn");
        btn.innerHTML = "&#10509;";
        btn.type = "button";
        return btn;
    };

    let createPrevBtn = function() {
        const btn = document.createElement("button");
        btn.classList.add("prev-btn");
        btn.innerHTML = "&#10508;";
        btn.type = "button";
        return btn;
    };

    let createImageItem = function(url, index) {
        const imgDiv = document.createElement("div");
        imgDiv.classList.add(`image-item-${id}`);
        imgDiv.dataset.id = index;

        const img = document.createElement("img");
        img.src = url;
        imgDiv.appendChild(img);
        
        return imgDiv;
    };

    let populateCarousel = function() {
        for (let i = 0; i < images.length; i += 1) {
            const url = images[i];
            const imageItem = createImageItem(url, i);
            imageCarousel.appendChild(imageItem);
        }
    };

    let createSlideBtn = function(index) {
        const div = document.createElement("div");
        div.classList.add(`slide-btn-${id}`);
        div.dataset.id = index;
        return div;
    };

    let createSlideBtnsSection = function() {
        const slideBtnsDiv = document.createElement("div");
        slideBtnsDiv.classList.add(`slide-btns-${id}`);

        for (let i = 0; i < images.length; i += 1) {
            const slideBtn = createSlideBtn(i);
            slideBtnsDiv.appendChild(slideBtn);
        }

        return slideBtnsDiv;
    };

    frame.appendChild(createPrevBtn());
    frame.appendChild(createNextBtn());
    frame.appendChild(imageCarousel);
    populateCarousel();
    frame.appendChild(createSlideBtnsSection());

    return new Carousel(frame, id, imageShowClass, slideBtnSelectClass);
};


export default imageCarousel;