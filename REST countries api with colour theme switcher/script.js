const icons = document.querySelectorAll(".icon");
const stylesheet = document.styleSheets[1];
const cardContainer  = document.querySelector(".cardContainer");
const dropdownContainer = document.querySelector(".dropdownContainer");
const filterDisplay = document.querySelector(".filterDisplay");
const removeFilterBtn = document.querySelector(".removeFilter");
const search = document.querySelector(".search");
const enter = document.querySelector(".enter");
const searchErrorDisplay = document.querySelector(".searchErrorDisplay");
const countryDetails = document.querySelector(".countryDetails");
const themeSwitcher = document.querySelector(".themeSwitcher");
let defaultMode = localStorage.getItem("defaultMode")

// REST countries API URL

const APIURL = "https://restcountries.com/v3.1/";

// Getting data from REST countries API

async function getData(param, type) {
    let URL;
    if (param.name) {
        URL = APIURL + `name/${param.name}`;
    } else if (param.region) {
        URL = APIURL + `region/${param.region}`;
    } else {
        URL = APIURL + `all`
    };
    const resp = await fetch(URL);
    if (resp.status !== 404) {
        const respData = await resp.json();
        if (type === "overview") {
            renderData(respData, param.region);
            // let lang =[Object.values(respData[21].languages)][0].values();
            // for (let i of lang){console.log(i)}
        } else {
            renderCountryDetails(respData);
        };
    } else {
        searchErrorDisplay.style.display = "flex";
    }
}

getData({
    "name" : null,
    "region" : null
}, "overview");

// Rendering country cards

function renderData (data, region) {
    cardContainer.innerHTML = ""
    if (region) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].region === region) {
                const card = document.createElement("div");
                card.classList.add("card");
                card.tabIndex = "0";
                card.setAttribute("data-country", data[i].name.common);
                card.innerHTML = `
                    <section class="flag">
                        <img src="${data[i].flags.svg}">
                    </section>
                    <section class="overview">
                        <h3>${data[i].name.common}</h3>
                        <p data-type="population"><span>Population:</span> ${data[i].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                        <p data-type="region"><span>Region:</span> ${data[i].region}</p>
                        <p data-type="capital"><span>Capital:</span> ${data[i].capital}</p>
                    </section>
                `
                cardContainer.appendChild(card);
            } 
        }

    }  else {
        for (let i = 0; i < data.length; i++) {
            const card = document.createElement("div");
            card.classList.add("card");
            card.tabIndex = "0";
            card.setAttribute("data-country", data[i].name.common);
            card.innerHTML = `
                <section class="flag">
                    <img src="${data[i].flags.svg}">
                </section>
                <section class="overview">
                    <h3>${data[i].name.common}</h3>
                    <p data-type="population"><span>Population:</span> ${data[i].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                    <p data-type="region"><span>Region:</span> ${data[i].region}</p>
                    <p data-type="capital"><span>Capital:</span> ${data[i].capital}</p>
                </section>
            `
            cardContainer.appendChild(card);
        }
    }
}

// rendering country details

function renderCountryDetails (data) {
    const borders = document.createElement("div");
    let borderCountries = data[0].borders;
    borders.classList.add("borders");
    borders.textContent = "Border Countries:"
    if (borderCountries) {
        borderCountries.forEach(border => {
            const country = document.createElement("a");
            country.classList.add("borderCountry");
            country.textContent = `${border}`;
            country.href = "#";
            borders.appendChild(country);
        })
    } else {
        borders.textContent = ""
    }

    countryDetails.innerHTML = `
    <button class="backBtn"><img src="assets/arrow-back-outline.svg" alt="" class="icon"> back</button>
    <div class="details">
        <div class="flagLarge"><img src="${data[0].flags.svg}"></div>
        <div class="data">
            <div class="dataLeft">
                <h3>${data[0].name.common}</h3>
                <p><span>Native Name:</span> ${data[0].name.nativeName[Object.keys(data[0].name.nativeName)[0]].common}</p>
                <p><span>Population:</span> ${data[0].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                <p><span>Region:</span> ${data[0].region}</p>
                <p><span>Sub Region:</span> ${data[0].subregion}</p>
                <p><span>Capital:</span> ${data[0].capital}</p>
            </div>
            <div class="dataRight">
                <p><span>Top Level Domain:</span> ${data[0].tld[0]}</p>
                <p><span>Currencies:</span> ${data[0].currencies[Object.keys(data[0].currencies)[0]].name}</p>
                <p><span>Languages:</span> ${[Object.entries(data[0].languages)]}</p>
            </div>
        </div>
    </div>
    `
    countryDetails.appendChild(borders);
}

// country detail

function showDetail(value, data) {
    if (value) {
        countryDetails.classList.add("active");
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        cardContainer.style.display = "none";
        getData({
            "name" : data,
            "region" : null
        }, "detail");
        
    } else {
        countryDetails.classList.remove("active");
        countryDetails.innerHTML = "";
        cardContainer.style.display = "flex";
    }
}

// filter sort feature

let filter = false;
function addFilter(e) {
    if (e.target.classList.contains("region")) {
        dropdownContainer.classList.toggle("active");
    } 

    if (e.target.classList.contains("regionOpt")) {
        filter = true;
        getData({
            "name" : null,
            "region" : e.target.dataset.value
        }, "overview");
        filterDisplay.textContent = e.target.dataset.value;
        dropdownContainer.classList.remove("active");
        removeFilterBtn.style.display = "block";
        search.value = ""
    }

    if (e.target.classList.contains("card")) {
        showDetail(true, e.target.getAttribute("data-country"));
    } else if (e.target.classList.contains("backBtn")) {
        showDetail(false);
    }
}

window.addEventListener("click", addFilter);

function removeFilter() {
    filter = false;
    getData({
        "name" : null,
        "region" : null
    }, "overview");
    filterDisplay.textContent = "";
    removeFilterBtn.style.display = "none";
}

// Search feature

search.addEventListener("keydown", (e) => {
    if(e.keyCode === 8) {
        searchErrorDisplay.style.display = "none";
        getData({
            "name" : null,
            "region" : null
        }, "overview");
    } else if (e.keyCode === 13 && filter) {
        filterDisplay.textContent = "";
        removeFilterBtn.style.display = "none";
        getData({
            "name" : search.value,
            "region" : null
        }, "overview");
            
    } else if (e.keyCode === 13) {
        getData({
            "name" : search.value,
            "region" : null
        }, "overview");
    }
})

// Theme changer

const themeSwitcherBtn = (theme) => {
    if (theme === "dark") {
        themeSwitcher.innerHTML = `
        <img src="assets/moon.svg" class="iconFilter">
        dark mode
        `;
    } else {
        themeSwitcher.innerHTML = `
        <img src="assets/moon-outline.svg">
        light mode
        `;
    }
}

if (defaultMode === "dark") {
    document.body.classList.add("darkMode");
    document.body.classList.remove("lightMode");
    icons.forEach(icon => {
        icon.classList.add("iconFilter");
    });
    themeSwitcherBtn("dark");

} else {
    document.body.classList.remove("darkMode");
    document.body.classList.add("lightMode");
    icons.forEach(icon => {
        icon.classList.remove("iconFilter");
    });
    themeSwitcherBtn("light");
}

const enableDarkMode = () => {
    document.body.classList.add("darkMode");
    document.body.classList.remove("lightMode");
    icons.forEach(icon => {
        icon.classList.add("iconFilter");
    });
    localStorage.setItem("defaultMode", "dark");
}

const disableDarkMode = () => {
    document.body.classList.remove("darkMode");
    document.body.classList.add("lightMode");
    icons.forEach(icon => {
        icon.classList.remove("iconFilter");
    });
    localStorage.setItem("defaultMode", "light");
}


themeSwitcher.addEventListener("click", ()=> {
    defaultMode = localStorage.getItem("defaultMode");
    if(defaultMode !== "dark") {
        themeSwitcherBtn("dark");
        enableDarkMode();
    } else {
        themeSwitcherBtn("light");
        disableDarkMode();
    }
});