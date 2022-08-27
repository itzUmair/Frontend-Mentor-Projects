const holderName = document.getElementById("name");
const cn = document.getElementById("cn");
const expMonth = document.getElementById("exp-month");
const expYear = document.getElementById("exp-year");
const cvc = document.getElementById("cvc");
const cnDisplay = document.getElementById("card-number");
const holderNameDisplay = document.getElementById("holder-name");
const errorCN = document.getElementsByClassName("error-cn");
const errorDM = document.getElementsByClassName("error-dm");
const errorCVC = document.getElementsByClassName("error-cvc");
const errorName = document.getElementsByClassName("error-name");
const errorCard = document.getElementsByClassName("error-card");
const errorFormat = document.getElementsByClassName("error-dm-format");
const errorInvalidMonth = document.getElementsByClassName("error-dm-format-invalid");
const monthDisplay = document.getElementById("month");
const yearDisplay = document.getElementById("year");
const cvcDisplay = document.getElementById("cvcDisplay");
const thankyou = document.getElementById("thankyou");
const form = document.getElementById("form-container");
const mainForm = document.getElementsByClassName("form");
const formInputs = document.getElementsByClassName("form-input");
const cardContainer = document.getElementsByClassName("card-container");

function checkData(number) {
    return /[a-zA-Z]/.test(number)
}

function cardDisappear(viewport) {
    if (viewport.matches) {
        if (window.outerHeight < 500) {
            cardContainer[0].style.animation = "translateUP 0s forwards"
        }else {
            cardContainer[0].style.animation = "translateDOWN 0s forwards"
        }
    }
}

function validateForm() {
    var checks = 0
    if (userName === ""){
        errorName[0].classList.add("active")
        checks += 1
}
    else {
        errorName[0].classList.remove("active")
        checks -= 1
    }
    if (cardNumber === ""){
        errorCard[0].classList.add("active")
        checks += 1
    }
    else {
        errorCard[0].classList.remove("active")
        checks -= 1
    }
    if (expY === ""){
        errorDM[0].classList.add("active")
        checks += 1
    }
    else {
        errorDM[0].classList.remove("active")
        checks -= 1
    }
    if (expM === ""){
        errorDM[0].classList.add("active")
        checks += 1
    }
    else {
        errorDM[0].classList.remove("active")
        checks -= 1
    }
    if (cvcNumber === ""){
        errorCVC[0].classList.add("active")
        checks += 1
    }
    else {
        errorCVC[0].classList.remove("active")
        checks -= 1
    }
    return checks
}

function handleForm(event){
    event.preventDefault()
    setInterval(validateForm, 200)
    check = validateForm()
    if (check === -5) {
        form.style.animation = "rotateY180 0.5s forwards";
        thankyou.style.animation = "rotateY360 0.5s forwards";
    }
}    

mainForm[0].addEventListener('submit', handleForm);

function updateCreds() {
    var x = window.matchMedia("(max-width: 720px)");
    cardDisappear(x)
    userName = holderName.value;
    cardNumber = cn.value;
    cardNumber = cardNumber.replace(/\s+/g, '')
    expM = expMonth.value;
    expY = expYear.value;
    if (checkData(expM) || checkData(expY)) {
        errorFormat[0].classList.add("active");
    }
    else if(expM > 12) {
        errorInvalidMonth[0].classList.add("active")
    }
    else {
        errorFormat[0].classList.remove("active");
        errorInvalidMonth[0].classList.remove("active")
    }
    expM = expM.replace(/\D+/g, '')
    expY = expY.replace(/\D+/g, '')

    cvcNumber = cvc.value;

    if (checkData(cvcNumber)) {
        errorFormat[1].classList.add("active");
    }
    else {
        errorFormat[1].classList.remove("active");
    }

    if(expY.length > 2) {
        expY = expY.slice(expY.length-2, expY.length)
    }

    if(checkData(cardNumber)){
        errorCN[0].classList.add("active") 
    }
    else {
        errorCN[0].classList.remove("active") 
    }
    
    cardDisplay = cardNumber.substring(0, 4) + " " + cardNumber.substring(4, 8) + " " + cardNumber.substring(8, 12) + " " + cardNumber.substring(12, 16);
    if (userName === ""){
        holderNameDisplay.textContent = "jane appleseed";
    }
    else {
        holderNameDisplay.textContent = userName;
    }
    if (cardNumber === ""){
        cnDisplay.textContent = "0000 0000 0000 0000";
    }
    else {
        cnDisplay.textContent = cardDisplay;
    }
    if (expM === ""){
        monthDisplay.textContent = "00";
    }
    else {
        monthDisplay.textContent = expM
    }
    if (expY === ""){
        yearDisplay.textContent = "00";
    }
    else {
        yearDisplay.textContent = expY
    }
    if (cvcNumber === ""){
        cvcDisplay.textContent = "000";
    }
    else {
        cvcDisplay.textContent = cvcNumber
    }
}
setInterval(updateCreds, 100)

document.addEventListener("DOMContentLoaded", function() {
    var elements = document.getElementsByTagName("INPUT");
    for (var i = 0; i < elements.length; i++) {
        elements[i].oninvalid = function(e) {
            e.target.setCustomValidity("");
            if (!e.target.validity.valid) {
                e.target.setCustomValidity(" ");
            }
        };
        elements[i].oninput = function(e) {
            e.target.setCustomValidity("");
        };
    }
})

function rotateY360() {
    thankyou.style.animation = "rotateY180 0.5s forwards";
    form.style.animation = "rotateY0 0.5s forwards";
}
