document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(function (menuItem) {
        const menuLink = menuItem.querySelector(".menu-link");
        const submenu = menuItem.querySelector(".submenu");
        const megamenu = menuItem.querySelector(".mega-menu");
        const arrow = menuItem.querySelector(".arrow");

        menuLink.addEventListener("click", function (e) {
            e.preventDefault();

            menuItems.forEach(function (item) {
                const otherSubmenu = item.querySelector(".submenu");
                const otherMegamenu = item.querySelector(".mega-menu");
                const otherArrow = item.querySelector(".arrow");

                if (item !== menuItem) {
                    if (otherSubmenu) {
                        otherSubmenu.style.display = "none";
                    }
                    if (otherMegamenu) {
                        otherMegamenu.style.display = "none";
                    }
                    if (otherArrow) {
                        otherArrow.style.transform = "rotate(0deg)";
                    }
                }
            });

            if (submenu && submenu.style.display === "block") {
                submenu.style.display = "none";
            } else if (submenu) {
                submenu.style.display = "block";
            }

            if (megamenu && megamenu.style.display === "block") {
                megamenu.style.display = "none";
            } else if (megamenu) {
                megamenu.style.display = "block";
            }

            if (arrow) {
                arrow.style.transform =
                    arrow.style.transform === "rotate(180deg)"
                        ? "rotate(0deg)"
                        : "rotate(180deg)";
            }
        });

        document.addEventListener("click", function (event) {
            if (!menuItem.contains(event.target)) {
                if (submenu) {
                    submenu.style.display = "none";
                }
                if (megamenu) {
                    megamenu.style.display = "none";
                }
                if (arrow) {
                    arrow.style.transform = "rotate(0deg)";
                }
            }
        });
    });
});

// slider start

const slides = document.querySelectorAll('.slider-container');
let currentSlide = 0;
let isDragging = false;
let startPositionX;
let endPositionX;

function showSlide(index) {
    slides[currentSlide].classList.add('hidden');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.remove('hidden');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function handleDragStart(event) {
    isDragging = true;
    startPositionX = event.clientX;
}

function handleDragEnd(event) {
    if (isDragging) {
        endPositionX = event.clientX;
        const deltaX = startPositionX - endPositionX;

        if (deltaX > 50) {
            nextSlide();
        } else if (deltaX < -50) {
            showSlide(currentSlide - 1);
        }

        isDragging = false;
    }
}

slides.forEach((slide) => {
    slide.addEventListener('dragstart', handleDragStart);
    slide.addEventListener('dragend', handleDragEnd);
});

setInterval(nextSlide, 3000);

showSlide(0);
// slider end

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