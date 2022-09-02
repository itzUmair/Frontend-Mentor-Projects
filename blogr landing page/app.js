const dropdownBtn = document.getElementsByClassName("dropdown");
const dropdownMenu = document.getElementsByClassName("dropdown-container");
const dropdownIcon = document.getElementsByClassName("arrow");
const mobileMenu = document.getElementsByClassName("mobile-nav-toggle");
const mobileNav = document.getElementsByClassName("primary-navigation");
const openIcon = document.getElementsByClassName("open-icon");
const closeIcon = document.getElementsByClassName("close-icon");
const productDD = document.getElementsByClassName("productDD-menu");
const companyDD = document.getElementsByClassName("companyDD-menu");
const connectDD = document.getElementsByClassName("connectDD-menu");

const btn = (event)=> {
    if (event.target.id ==="productDD"){
        if (!productDD[0].classList.contains("active")){
            productDD[0].classList.add("active");
            dropdownIcon[0].classList.add("active");
            dropdownIcon[1].classList.add("active");
        } else {
            productDD[0].classList.remove("active");
            dropdownIcon[0].classList.remove("active");
            dropdownIcon[1].classList.remove("active");
        }
    } else {
    productDD[0].classList.remove("active");
    dropdownIcon[0].classList.remove("active");
    dropdownIcon[1].classList.remove("active");
   }
    if (event.target.id ==="companyDD"){
        if (!companyDD[0].classList.contains("active")){
            companyDD[0].classList.add("active");
            dropdownIcon[2].classList.add("active");
            dropdownIcon[3].classList.add("active");
        } else {
            companyDD[0].classList.remove("active");
            dropdownIcon[2].classList.remove("active");
            dropdownIcon[3].classList.remove("active");
        }
    } else {
    companyDD[0].classList.remove("active");
    dropdownIcon[2].classList.remove("active");
    dropdownIcon[3].classList.remove("active");
   }
    if (event.target.id ==="connectDD"){
        if (!connectDD[0].classList.contains("active")){
            connectDD[0].classList.add("active");
            dropdownIcon[4].classList.add("active");
            dropdownIcon[5].classList.add("active");
        } else {
            connectDD[0].classList.remove("active");
            dropdownIcon[4].classList.remove("active");
            dropdownIcon[5].classList.remove("active");
        }
    } else {
    connectDD[0].classList.remove("active");
    dropdownIcon[4].classList.remove("active");
    dropdownIcon[5].classList.remove("active");
   }
}
window.addEventListener("click", btn)

mobileMenu[0].addEventListener("click", () => {
    var display = mobileMenu[0].getAttribute("data-display");
    if(display === "false") {
        mobileNav[0].classList.add("active");
        mobileMenu[0].setAttribute("data-display", true);
        document.body.style.overflowY = "hidden";
    }
    else {
        mobileNav[0].classList.remove("active");
        mobileMenu[0].setAttribute("data-display", false);
        document.body.style.overflowY = "auto"
    }
})