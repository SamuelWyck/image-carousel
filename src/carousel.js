

function Carousel(
    element,
    id,
    imageShowingClassName, 
    slideBtnSelectedClassName
) {

    this.suffix = id;
    this.docNode = element;
    this.carouselElement = element.children[2];
    this.slideBtnsElement = element.lastChild;
    this.imageShowClass = imageShowingClassName;
    this.slideBtnSelectClass = slideBtnSelectedClassName;


    this.hideImage = function() {
        for (let i = 0; i < this.carouselElement.children.length; i += 1) {
            const image = this.carouselElement.children[i];
            if (image.classList.contains(this.imageShowClass)) {
                image.classList.remove(this.imageShowClass);
                return i;
            }
        }
    };

    this.showImage = function(index) {
        index = Number(index);
        const image = this.carouselElement.children[index];
        image.classList.add(this.imageShowClass);
    };

    this.changeIndex = function(index, forward) {
        const change = (forward === true) ? 1 : -1;
        const maxIndex = this.carouselElement.children.length - 1;
        const minIndex = 0;

        index += change;
        if (index < minIndex) {
            index = maxIndex;
        } else if (index > maxIndex) {
            index = minIndex;
        }
        return index;
    };

    this.changeImage = function(forward) {
        let imageIndex = this.hideImage();
        imageIndex = this.changeIndex(imageIndex, forward);
        this.showImage(imageIndex);
        this.changeSlideBtnSelected(imageIndex);
    };

    this.changeSlideBtnSelected = function(id) {
        id = String(id);
        for (let btn of this.slideBtnsElement.children) {
            if (btn.dataset.id === id) {
                btn.classList.add(this.slideBtnSelectClass);
            } else {
                btn.classList.remove(this.slideBtnSelectClass);
            }
        }
    }

    this.selectImage = function(element) {
        const id = element.dataset.id;
        this.hideImage();
        this.showImage(id);
        this.changeSlideBtnSelected(id);
    };

    this.btnLogic = function() {
        const changeImage = this.changeImage.bind(this);

        this.docNode.addEventListener("click", function(event) {
            if (event.target.matches(".next-btn")) {
                changeImage(true);
            } else if (event.target.matches(".prev-btn")) {
                changeImage(false);
            }
        });
    };

    this.slideLogic = function() {
        const suffix = this.suffix;
        const selectImage = this.selectImage.bind(this);

        this.slideBtnsElement.addEventListener("click", function(event) {
            if (event.target.matches(`.slide-btn-${suffix}`)) {
                selectImage(event.target);
            }
        });
    };

    this.showImage(0);
    this.changeSlideBtnSelected(0);
    this.btnLogic();
    this.slideLogic();
};

export default Carousel;