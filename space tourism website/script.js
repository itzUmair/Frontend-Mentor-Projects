const mobileNavToggle = document.getElementById("mobile-nav-toggle");
const mobileNav = document.querySelector(".primary-nav");
const NavOpt = document.querySelector(".nav-menu");
const exploreBtn = document.querySelector(".explore-btn");
const main = document.querySelector(".main");
const home = document.querySelector(".home");
const destination = document.querySelector(".destination");
const crew = document.querySelector(".crew");
const technology = document.querySelector(".technology");
const homeBtn = document.querySelector("#home");
const destinationBtn = document.querySelector("#destination");
const crewBtn = document.querySelector("#crew");
const technologyBtn = document.querySelector("#technology");

const nav = [
    "home", "destination", "crew", "technology"
]

// mobile navigation toggle
mobileNavToggle.addEventListener("click", () => {
    if (mobileNav.classList.contains("active")) {
        animateBtn("default")
        mobileNav.classList.remove("active")
    } else {
        animateBtn("open")
        mobileNav.classList.add("active")
        document.body.setAttribute("data-stick", "true")
        window.onscroll = () => {
            mobileNav.classList.remove("active")
            animateBtn("default")
        };
    }
})

// mobile navigation button animation
function animateBtn(value) {
    const navBtnTop = document.querySelector(".top-bar");
    const navBtnMiddle = document.querySelector(".middle-bar");
    const navBtnBottom = document.querySelector(".bottom-bar");
    if (value === "open") {
        navBtnTop.style.animation = "btnAnimationTop 0.5s forwards";
        navBtnMiddle.style.animation = "btnAnimationMiddle 0.5s forwards";
        navBtnBottom.style.animation = "btnAnimationBottom 0.5s forwards";
    } else {
        navBtnTop.style.animation = "btnAnimationTopBack 0.5s forwards";
        navBtnMiddle.style.animation = "btnAnimationMiddleBack 0.5s forwards";
        navBtnBottom.style.animation = "btnAnimationBottomBack 0.5s forwards";
    }
}

async function getData(value1, value2, value3) {
    let resp = await fetch("./data.json");
    let respData = await resp.json()
    if (value1 >= 0 && value1 <= 3 && value2 >= 0 && value2 <= 3){
        renderPlanetData(respData, value1)
        renderCrewData(respData, value2)
        let viewport = window.matchMedia("(max-width: 959px)")
        renderTechData(respData, value3, viewport)
    } else {
        renderPlanetData(respData, 0)
        renderCrewData(respData, 0)
        let viewport = window.matchMedia("(max-width: 959px)")
        renderTechData(respData, 0, viewport)
    }
}

function renderPlanetData(data, planet) {
    let destinationData = data.destinations
    destination.innerHTML = `
    <h5 class="heading-5 title"><span>01</span>pick your destination</h5>
    <div class="destination-left">
        <img src="${destinationData[planet].images.webp}" alt="">
    </div>
    <div class="destination-right">
        <div class="planet-select">
            <ul class="planet-nav">
                <li value="0" class="planetOpt">moon</li>
                <li value="1" class="planetOpt">mars</li>
                <li value="2" class="planetOpt">europia</li>
                <li value="3" class="planetOpt">titan</li>
            </ul>
        </div>
        <h2 class="heading-2">
            ${destinationData[planet].name}
        </h2>
        <p class="para">
            ${destinationData[planet].description}
        </p>
        <div class="travel-data">
            <div>
                <h6 class="sub-heading-2">avg. distance</h5>
                <h4 class="sub-heading-1">${destinationData[planet].distance}</h4>
            </div>
            <div>
                <h6 class="sub-heading-2">est. travel time</h5>
                <h4 class="sub-heading-1">${destinationData[planet].travel}</h4>
            </div>
        </div>
    </div>`
    const navPlanet = document.querySelector(".planet-nav")
    navPlanet.children[planet].classList.add("active")
}

function renderCrewData(data, person) {
    let crewData = data.crew
    crew.innerHTML = `
    <h5 class="heading-5 title"><span>02</span>meet your crew</h5>
    <div class="crew-left">
        <h4 class="heading-4">${crewData[person].role}</h4>
        <h3 class="heading-3">${crewData[person].name}</h3>
        <p class="para">${crewData[person].bio}</p>
    </div>
    <div class="crew-right">
        <img src="${crewData[person].images.webp}" alt="">
    </div>
    <div class="crew-navigation">
        <ul class="crewNav">
            <li value="0" class="crewOpt"></li>
            <li value="1" class="crewOpt"></li>
            <li value="2" class="crewOpt"></li>
            <li value="3" class="crewOpt"></li>
        </ul>
    </div>`
    const crewNav = document.querySelector(".crewNav")
    crewNav.children[person].classList.add("active")
}

function renderTechData (data, tech, viewport) {
    let techData = data.technology
    let image;
    if(viewport.matches) {
        image = techData[tech].images.landscape
    } else {
        image = techData[tech].images.portrait
    }
    technology.innerHTML = `
    <h5 class="heading-5 title"><span>03</span>space launch 101</h5>
    <div class="technology-left">
        <div class="technology-navigation">
            <ul class="techNav">
                <li value="0" class="techOpt">1</li>
                <li value="1" class="techOpt">2</li>
                <li value="2" class="techOpt">3</li>
            </ul>
        </div>
        <div class="tech-data">
            <h6 class="heading-6">the terminology...</h6>
            <h3 class="heading-3">${techData[tech].name}</h3>
            <p class="para">${techData[tech].description}</p>
        </div>
    </div>
    <div class="technology-right">
        <img src="${image}" alt="">
    </div>`
    const techNav = document.querySelector(".techNav")
    techNav.children[tech].classList.add("active")
}

let planetNumber = 0
let crewNumber = 0
let techNumber = 0

function getEvent(e) {
    if (e.target.classList.contains("navOpt")){
        const opt = NavOpt.getElementsByTagName("li");
        for(let i=0; i < 4; i++){
            opt[i].classList.remove("active")
        }
        e.target.classList.add("active")
    }
    if (e.target.classList.contains("planetOpt")) {
        planetNumber = e.target.value
        getData(planetNumber, crewNumber, techNumber)
    } else if(e.target.classList.contains("crewOpt")){
        crewNumber = e.target.value
        getData(planetNumber, crewNumber, techNumber)
    } else if(e.target.classList.contains("techOpt")) {
        techNumber = e.target.value
        getData(planetNumber, crewNumber, techNumber)
    }
    
    if (e.target.id === "home") {
        home.classList.add("active");
        destination.classList.remove("active")
        crew.classList.remove("active")
        technology.classList.remove("active")
        document.body.setAttribute("data-tab", "home")
    } else if (e.target.id === "destination" || e.target.classList.contains("explore-btn")){
        home.classList.remove("active");
        destination.classList.add("active")
        crew.classList.remove("active")
        technology.classList.remove("active")
        destinationBtn.classList.add("active")
        homeBtn.classList.remove("active")
        document.body.setAttribute("data-tab", "destination")
    } else if (e.target.id === "crew") {
        home.classList.remove("active");
        destination.classList.remove("active")
        crew.classList.add("active")
        technology.classList.remove("active")
        document.body.setAttribute("data-tab", "crew")
    } else if (e.target.id === "technology") {
        home.classList.remove("active");
        destination.classList.remove("active")
        crew.classList.remove("active")
        technology.classList.add("active")
        document.body.setAttribute("data-tab", "technology")
    }
}

getData()

window.addEventListener("click", getEvent)