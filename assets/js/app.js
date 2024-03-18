const toggleCheckbox = document.querySelector('.toggle-checkbox');
const searchToggle = document.querySelector('.searchclick');
const searchIcon = document.querySelector('.fa-magnifying-glass');

searchIcon.addEventListener('click',function(){
    if (searchToggle.style.display === 'none') {
        searchToggle.style.display = 'block';
    } else {
        searchToggle.style.display = 'none';
    }
})


toggleCheckbox.addEventListener('change',function(){
    if (this.checked) {
        document.body.classList.add('body');
    } else {
        document.body.classList.remove('body');
    }
})

// header scroll

const header = document.getElementById('header');

// function to handle scroll event

function handlescroll(){
    if (window.scrollY > 0) {
        header.classList.add('scrolled')
    } else {
        header.classList.remove('scrolled')
    }
}

// attach the scroll event listener

Window.addEventListener('scroll',handlescroll());

//auto type words

document.addEventListener('DOMContentLoaded', function() {
    const options = {
        strings: ['CWS', 'Coder', 'Youtuber', 'Blogger'],
        typeSpeed: 150,
        backSpeed: 50,
        backDelay: 3000,
        loop: true,
    };

    const multiTextElement = document.querySelector('.malti-text');
    let currentTextIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let timeout;

    function type() {
        const fullText = options.strings[currentTextIndex];
        currentText = isDeleting ? fullText.substring(0, currentText.length - 1) : fullText.substring(0, currentText.length + 1);
        multiTextElement.textContent = currentText;
        let typeSpeed = isDeleting ? options.typeSpeed / 2 : options.typeSpeed;

        if (!isDeleting && currentText === fullText) {
            typeSpeed = options.backDelay;
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % options.strings.length;
        }

        timeout = setTimeout(type, typeSpeed);
    }

    type();

    // Clear the timeout on document unload
    document.addEventListener('unload', function() {
        clearTimeout(timeout);
    });
});


// hotcards scroll

const cardWrapper = document.querySelector('.hotcards');
const cardWrapperChildren = Array.from(cardWrapper.children);
const widthToScroll = cardWrapper.children[0].offsetWidth;
const arrowPrev = document.querySelector('.leftbtn');
const arrowNext = document.querySelector('.rightbtn');
const cardBounding = cardWrapper.getBoundingClientRect();
const column = Math.floor(cardWrapper.offsetWidth / (widthToScroll + 24));
let currScroll = 0;
let initPos = 0;
let clicked = false;

cardWrapperChildren.slice(-column).reverse().forEach(item => {
    cardWrapper.insertAdjacentHTML('afterbegin',item);
});

cardWrapperChildren.slice(0,column).forEach(item => {
    cardWrapper.insertAdjacentHTML('beforeend',item);
});

const cardImageAndLink = cardWrapper.querySelectorAll('.hcard a, .hcard img');
cardImageAndLink.forEach(item => {
    item.setAttribute('draggable',false)
});

cardWrapper.classList.add('no-smooth');
cardWrapper.scrollLeft = cardWrapper.offsetWidth
cardWrapper.classList.remove('no-smooth');

arrowPrev.addEventListener('click', function(){
    cardWrapper.scrollLeft -= widthToScroll
});

arrowNext.addEventListener('click', function(){
    cardWrapper.scrollLeft += widthToScroll
});

// auto scroll every 3seconds
let autoScroll;

cardWrapper.addEventListener('scroll', function(){
    if (cardWrapper.scrollLeft === 0) {
        cardWrapper.classList.add('no-smooth');
        cardWrapper.scrollLeft = cardWrapper.scrollWidth - (2*cardWrapper.offsetWidth)
        cardWrapper.classList.remove('no-smooth');
    } else if(cardWrapper.scrollLeft === cardWrapper.scrollWidth - cardWrapper.offsetWidth){
        cardWrapper.classList.add('no-smooth');
        cardWrapper.scrollLeft = cardWrapper.offsetWidth
        cardWrapper.classList.remove('no-smooth');
    }
    if(autoScroll) {
        clearTimeout(autoScroll)
    }
    autoScroll = setTimeout(() => {
        cardWrapper.classList.remove('no-smooth')
        cardWrapper.scrollLeft += widthToScroll
    },3000)
});