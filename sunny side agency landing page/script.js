const mobileNavToggle = document.getElementsByClassName("mobile-nav-toggle");
const mobileNav = document.getElementsByClassName("nav-menu");
const imageContainer = document.getElementsByClassName("image-container");

mobileNavToggle[0].addEventListener("click", ()=>{
    mobileNav[0].classList.toggle("active")
})

function scrollVH() {
    window.scroll({
        top: 760,
        behavior: "smooth"
    })
}