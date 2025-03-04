import "./styles.css";
import img1 from "./imgs/field.jpg";
import img2 from "./imgs/lake.jpg";
import img3 from "./imgs/road.jpg";
import img4 from "./imgs/road2.jpg";
import createimageCarousel from "./imageCarousel.js";


const app = (function() {
    const imageCarousel = document.querySelector(".image-carousel");
    const imageCarouselFrame = document.querySelector(".container");
    const slideBtnsDiv = document.querySelector(".slide-btns");

    function hideImage() {
        for (let i = 0; i < imageCarousel.children.length; i += 1) {
            const image = imageCarousel.children[i];
            if (image.classList.contains("showing")) {
                image.classList.remove("showing");
                return i;
            }
        }
    };

    function showImage(index) {
        const image = imageCarousel.children[index];
        image.classList.add("showing");
    };

    function changeIndex(index, forward) {
        const change = (forward === true) ? 1 : -1;
        const maxIndex = imageCarousel.children.length - 1;
        const minIndex = 0;

        index += change;
        if (index < minIndex) {
            index = maxIndex;
        } else if (index > maxIndex) {
            index = minIndex;
        }
        return index;
    };

    function changeImage(forward=true) {
        let imageIndex = hideImage();
        imageIndex = changeIndex(imageIndex, forward);
        showImage(imageIndex);
        changeSelectedBtn(imageIndex);
    };

    function createSlideBtn(id) {
        const btn = document.createElement("div");
        btn.classList.add("slide-btn");
        btn.dataset.id = id;
        return btn;
    };

    function populateSlideBtns() {
        for (let i = 0; i < imageCarousel.children.length; i += 1) {
            const btn = createSlideBtn(i);
            if (i === 0) {
                btn.classList.add("selected");
            }
            slideBtnsDiv.appendChild(btn);
        };
    };

    function changeSelectedBtn(id) {
        id = String(id);
        for (let btn of slideBtnsDiv.children) {
            if (btn.dataset.id === id) {
                btn.classList.add("selected");
            } else {
                btn.classList.remove("selected");
            }
        }
    };

    function selectImage(element) {
        const id = element.dataset.id;
        hideImage();
        showImage(id);
        changeSelectedBtn(id);
    };

    imageCarouselFrame.addEventListener("click", function(event) {
        if (event.target.matches(".next-btn")) {
            changeImage(true);
        } else if (event.target.matches(".prev-btn")) {
            changeImage(false);
        }
    });

    slideBtnsDiv.addEventListener("click", function(event) {
        if (event.target.matches(".slide-btn")) {
            selectImage(event.target);
        }
    });

    populateSlideBtns();

    function imageLoop() {
        changeImage(true);
        setTimeout(imageLoop, 2000);
    };

    // imageLoop();

    let images = [
        img1, img2, img3, img4
    ]
    const carousel = createimageCarousel(images, 1, "showing", "selected");
    const main = document.querySelector(".main")
    main.appendChild(carousel.docNode);

})();