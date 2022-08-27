const submitBtn = document.querySelector(".submit");
const frontFace = document.getElementById("front");
const backFace = document.getElementById("back");
const ratingValue = document.getElementById("selected")

const ratingBtn = document.getElementsByClassName("rating-btn");
var ratingSelected = false;

for (var i = 0; i < ratingBtn.length; i++) {
    ratingSelected = true
    ratingBtn[i].addEventListener("click", function() {

        var current = document.getElementsByClassName("active");

        if (current.length > 0) {
        current[0].className = current[0].className.replace(" active", "");
        }

        this.className += " active";
    });
  }

var rate = "0"
function rating(value) {
    rate = value
    if(ratingSelected === true){
        submitBtn.className += " activeBtn";
    }
}
   

function submit(){
    ratingValue.textContent = rate
}


submitBtn.addEventListener('click', ()=> {
    frontFace.style.animation = "rotateY 2s forwards";
    backFace.style.animation = "rotateY2 2s forwards";
})

