const mobileNavToggle = document.getElementById("mobile-menu-toggle");
const mobileNav = document.getElementsByClassName("nav-menu");
const creation = document.getElementsByClassName("creation-catalog");

mobileNavToggle.addEventListener("click", ()=>{
    mobileNav[0].classList.toggle("active");
    mobileNavToggle.classList.toggle("active")
})

const catalogImagesDesktop = [
    "media/desktop/image-deep-earth.jpg",
    "media/desktop/image-night-arcade.jpg",
    "media/desktop/image-soccer-team.jpg",
    "media/desktop/image-grid.jpg",
    "media/desktop/image-from-above.jpg",
    "media/desktop/image-pocket-borealis.jpg",
    "media/desktop/image-curiosity.jpg",
    "media/desktop/image-fisheye.jpg",

]
const catalogImagesMobile = [
    "media/mobile/image-deep-earth.jpg",
    "media/mobile/image-night-arcade.jpg",
    "media/mobile/image-soccer-team.jpg",
    "media/mobile/image-grid.jpg",
    "media/mobile/image-from-above.jpg",
    "media/mobile/image-pocket-borealis.jpg",
    "media/mobile/image-curiosity.jpg",
    "media/mobile/image-fisheye.jpg",
]

const catalogImagesNames = [
    "deep earth",
    "night arcade",
    "soccer team vr",
    "the grid",
    "from up above vr",
    "pocket borealis",
    "the curiosity",
    "make it fisheye"
]

function generateCatalog (images) {
    let i = 0;
    creation[0].innerHTML = " "
    images.forEach(image => {
        const cover = document.createElement("div")
        cover.innerHTML = `
            <div>
                <img src="${image}">
                <h3 class="catalog-name">${catalogImagesNames[i]}</h3>
            </div>
        `
        i++
        creation[0].appendChild(cover)
    }); 
}

function viewport(x) {
    if (x.matches) {
        generateCatalog(catalogImagesMobile)
    } else {
        generateCatalog(catalogImagesDesktop)
    }
}

let x = window.matchMedia("(max-width: 900px)")
viewport(x)
x.addListener(viewport) 