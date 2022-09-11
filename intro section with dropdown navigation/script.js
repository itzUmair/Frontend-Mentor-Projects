const featureContainer = document.querySelector(".dropdown-container1")
const companyContainer = document.querySelector(".dropdown-container2")
const dropdownArrow = document.querySelectorAll(".dropdown-arrow")
const mobileNavBtn = document.querySelector("#mobile-nav-toggle")
const mobileNav = document.querySelector(".primary-nav")

const dropdownFunction = (e) => {
    if (e.target.id === "features") {
        featureContainer.classList.toggle("active")
        dropdownArrow[0].classList.toggle("active")
    } else if (e.target.id === "company"){
        companyContainer.classList.toggle("active")
        dropdownArrow[1].classList.toggle("active")
    } else {
        featureContainer.classList.remove("active")
        companyContainer.classList.remove("active")
        dropdownArrow[0].classList.remove("active")
        dropdownArrow[1].classList.remove("active")
    }
}

function mobileNavToggle(){
    mobileNavBtn.classList.toggle("active")
    mobileNav.classList.toggle("active")
}

// const mobileNavToggle = (e) => {
//     if (e.target.id === "mobile-nav-toggle"){
//         mobileNav.classList.toggle("active")
//     }
// }

window.addEventListener("click", dropdownFunction)