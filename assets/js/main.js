const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slider-container');
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let currentIndex = 0;

slides.forEach((slide, index) => {
    slide.addEventListener('dragstart', (e) => e.preventDefault());
    slide.addEventListener('mousedown', dragStart);
    slide.addEventListener('touchstart', dragStart);
    slide.addEventListener('mouseup', dragEnd);
    slide.addEventListener('touchend', dragEnd);
    slide.addEventListener('mousemove', drag);
    slide.addEventListener('touchmove', drag);

    function dragStart(e) {
        currentIndex = index;
        isDragging = true;
        startPosition = getPositionX(e);
        prevTranslate = currentTranslate;
    }

    function dragEnd() {
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;
        if (movedBy < -100 && currentIndex < slides.length - 1) {
            currentIndex += 1;
        }
        if (movedBy > 100 && currentIndex > 0) {
            currentIndex -= 1;
        }
        setPositionByIndex();
    }

    function drag(e) {
        if (isDragging) {
            const currentPosition = getPositionX(e);
            currentTranslate = prevTranslate + currentPosition - startPosition;
            updateSliderPosition();
        }
    }

    function getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }

    function updateSliderPosition() {
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active-slide');
            } else {
                slide.classList.remove('active-slide');
            }
        });
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
        currentTranslate = currentIndex * -window.innerWidth;
        updateSliderPosition();
    }
});

slides[0].classList.add('active-slide');


const targetDate = new Date("2023-11-01");

function updateClock() {
    const now = new Date();
    const timeDifference = targetDate - now;
    if (timeDifference <= 0) {
        clearInterval(intervalID);
        return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateClock();

const intervalID = setInterval(updateClock, 1000);


const productLinks = document.querySelectorAll('.products a');

let previousLink = null;

productLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        if (previousLink !== null) {
            previousLink.style.color = '';
        }

        link.style.color = 'black';

        previousLink = link;
    });
});