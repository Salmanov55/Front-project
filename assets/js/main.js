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