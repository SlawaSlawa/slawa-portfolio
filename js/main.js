'use strict';

// BURGER
const burgerBtn = document.querySelector('.burger-container');
const nav = document.querySelector('.nav');

burgerBtn.addEventListener('click',
    (event) => {
        burgerBtn.classList.toggle('burger-change');
        nav.classList.toggle('nav-active');
    });

// /// BURGER

// BTN-UP
const btnUp = document.getElementById('btnUp');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    const elemForBtnUp = document.getElementById('about');
    const coord = elemForBtnUp.getBoundingClientRect();

    if (scrollTop >= coord.top) {
        btnUp.style.display = 'block';
    } else {
        btnUp.style.display = '';
    }
});
// ///BTN-UP

// MODAL
const btnSend = document.getElementById('btnSend');
const modal = document.getElementById('modal');
const modalClosedBtn = document.getElementById('modalClosedBtn');

btnSend.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

modal.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList == 'modal') {
        modal.style.display = '';
        document.body.style.overflow = '';
    }
});

modalClosedBtn.addEventListener('click', () => {
    modal.style.display = '';
    document.body.style.overflow = '';
});
// ///MODAL

// RENDER PORTFOLIO
let countCard = 6;
let data = '';

const btnMore = document.getElementById('btnMore');
const portfolioItemsWrap = document.getElementById('portfolioItemsWrap');

const request = new XMLHttpRequest();
request.open('GET', './js/db.json', true);
request.addEventListener('readystatechange', function () {
    if ((request.readyState == 4) && (request.status == 200)) {
        portfolioItemsWrap.textContent = '';
        data = request.responseText;
        renderPortfolioItem(JSON.parse(data));

        btnMore.addEventListener('click', btnMoreEvent);
    }
});
request.send();

function btnMoreEvent() {
    console.log('click: ');
    portfolioItemsWrap.textContent = '';
    countCard += countCard;
    renderPortfolioItem(JSON.parse(data));
}

function renderPortfolioItem(data) {
    let count = 0;
    data.forEach((card) => {
        count++;
        if (countCard > data.length) {
            btnMore.removeEventListener('click', btnMoreEvent);
            btnMore.style.opacity = '0.6';
        }
        if (countCard < count) {
            return;
        } else {
            const portfolioItemElem =
                `
            <div class="portfolio__item">
                <a href="${card.link}" class="portfolio__item-link"
                    target="_blank">

                    <div class="portfolio__item-img">
                        <img src="${card.img}" alt="${card.alt}">

                        <div class="portfolio__overlay">
                            <p class="portfolio__overlay-desc">
                                ${card["overlay-text"]}
                            </p>
                        </div>
                    </div>

                    <span class="portfolio__item-desc">
                        ${card.desc}
                    </span>

                </a>

            </div>
            <!-- /.portfolio__item -->
        `;
            portfolioItemsWrap.insertAdjacentHTML('beforeend', portfolioItemElem);
        }

    });
}
// ///RENDER PORTFOLIO

