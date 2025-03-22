'use strict';

// * СКРОЛЛ ПО ССЫЛКЕ * //
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        let href = this.getAttribute('href').substring(1);
        const scrollTarget = document.getElementById(href);
        window.scrollBy({
            top: scrollTarget.getBoundingClientRect().top,
            behavior: 'smooth'
        });
    });
});

// * СЛАЙДЕР * //
const slides = document.querySelectorAll('.image-text-container');
let currentSlide = 0;
const slideInterval = 4000;

function nextSlide() {
    slides[currentSlide].style.display = "none";
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.display = "block";
}

setInterval(nextSlide, slideInterval);
slides.forEach(slide => slide.addEventListener("click", nextSlide));
slides.forEach((slide, index) => slide.style.display = index === 0 ? "block" : "none");

// * ТАЙМЕР СКИДКИ * //
const mS_IN_A_DAY = 24 * 60 * 60 * 1000;
const endTime = Date.now() + 7 * mS_IN_A_DAY;

function updateTimer() {
    const timeDiff = endTime - Date.now();
    if (timeDiff <= 0) {
        document.getElementById("timer").innerHTML = "Скидка закончилась!";
        return;
    }
    const days = Math.floor(timeDiff / mS_IN_A_DAY);
    const hours = Math.floor((timeDiff % mS_IN_A_DAY) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML =   `${days}д ${hours}ч ${minutes}м ${seconds}с`;
}

setInterval(updateTimer, 1000);
updateTimer();

// * ВАЛИДАЦИЯ ФОРМЫ * //
document.getElementById('knopka').addEventListener('click', function (e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const sogl = document.getElementById('sogl');
    
    const wrongName = document.getElementById('wrongname');
    const wrongNumber = document.getElementById('wronnumber');
    const netGalochki = document.getElementById('netgalochki');

    let isValid = true;

    wrongName.textContent = '';
    wrongNumber.textContent = '';
    netGalochki.textContent = '';

    name.classList.remove('error-input');
    phone.classList.remove('error-input');

    if (!name.value.trim()) {
        wrongName.textContent = 'Введите имя!';
        name.classList.add('error-input');
        isValid = false;
    } else if (/\d/.test(name.value)) {
        wrongName.textContent = 'Имя не может содержать цифры!';
        name.classList.add('error-input');
        isValid = false;
    }

    const phonePattern = /^[0-9]{7,15}$/;
    if (!phone.value.trim()) {
        wrongNumber.textContent = 'Введите номер телефона!';
        phone.classList.add('error-input');
        isValid = false;
    } else if (!phonePattern.test(phone.value)) {
        wrongNumber.textContent = 'Некорректный номер!';
        phone.classList.add('error-input');
        isValid = false;
    }
    if (!sogl.checked) {
        netGalochki.textContent = 'Необходимо согласие!';
        isValid = false;
    }

    if (isValid) {
        alert('Форма успешно отправлена!');
    }
});