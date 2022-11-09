const tabScroll = document.querySelectorAll(".tabScroll");
const tabs = document.querySelectorAll(".tab");
const faqContainer = document.querySelectorAll(".questionContainer");
const question = document.querySelectorAll(".question");
const answer = document.querySelectorAll(".answer");
const navButton = document.querySelector(".navButton");
const navMenu = document.querySelector(".navMenu");
const logo = document.querySelector('.logo');

function changeTab(e) {
    tabScroll.forEach(tab => {
        if (tab.dataset.value === e.target.dataset.value) {
            removeAllActive()
            tab.classList.add("active")
            switchTab(tab.dataset.value)
        }
    })
}

function switchTab(tabRequired) {
    tabs.forEach(tab => {
        console.log(tab.classList)
        if (tab.dataset.tab === tabRequired){
            removeAllTab()
            tab.classList.add("active")
        }
    })
}

function removeAllActive() {
    tabScroll.forEach(tab => tab.classList.remove("active"))
}


function removeAllTab() {
    tabs.forEach(tab => tab.classList.remove("active"))
}

function accordion() {
    faqContainer.forEach(faq => {
        faq.addEventListener('click', () => faq.classList.toggle("active"))
    })
}
accordion()

function navToggle() {
    navButton.addEventListener('click', () => {
        navMenu.classList.toggle('active')
        navButton.classList.toggle('open')
        if (navButton.classList.contains('open')) {
            logo.style.filter = 'invert(96%) sepia(83%) saturate(0%) hue-rotate(59deg) brightness(113%) contrast(101%)'
            document.body.style.overflowY = 'hidden'
        } else {
            logo.style.removeProperty('filter') 
            document.body.style.overflowY = 'auto'
        }
    })
}
navToggle()

window.addEventListener("click",(e) => changeTab(e))