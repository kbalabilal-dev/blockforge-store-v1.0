console.log("index.js is connected");

let packages = [
    { id: 1, name: "VIP", price: 4.99, category: "Ranks", icon: "images/VIP.svg" },
    { id: 2, name: "MVP", price: 11.99, category: "Ranks", icon: "images/MVP.svg" },
    { id: 3, name: "Legend", price: 24.99, category: "Ranks", icon: "images/LEGEND.svg" },
    { id: 4, name: "Elite", price: 29.99, category: "Ranks", icon: "images/ELITE.svg" },
    { id: 5, name: "Common Key x5", price: 0.99, category: "Keys", icon: "images/common.png" },
    { id: 6, name: "Rare Key x5", price: 1.99, category: "Keys", icon: "images/rare.png" },
    { id: 7, name: "Prime Key x5", price: 3.99, category: "Keys", icon: "images/prime.png" },
    { id: 8, name: "crimson Key x3", price: 4.99, category: "Keys", icon: "images/crimson.png" },
    { id: 9, name: "Elite Key x1", price: 9.99, category: "Keys", icon: "images/ELITE.png" }
];

const section = document.querySelector(".package-grid");
const header = document.querySelector(".tagline");
const copyBtn = document.querySelector("#ip-btn");
const ip = document.querySelector(".IP");
const tabBtns = document.querySelectorAll(".tab-btn");
let ipNow = ip.textContent;

function renderPackages(itemArray) {
    section.innerHTML = "";

    for (let i = 0; i < itemArray.length; i++) {
        let article = document.createElement("article");
        article.classList.add("package-card");

        let names = document.createElement("h2");
        names.classList.add("package-name");
        names.textContent = itemArray[i].name;

        let icons = document.createElement("img");
        icons.src = itemArray[i].icon;

        let btnContainer = document.createElement("div")
        btnContainer.classList.add("card-actions")

        let infoBtns = document.createElement("button")
        infoBtns.classList.add("info-button")
        infoBtns.textContent = "i"

        let btns = document.createElement("button");
        btns.classList.add("buy-button");
        btns.textContent = itemArray[i].price + "$";

        btnContainer.appendChild(infoBtns)
        btnContainer.appendChild(btns)

        article.appendChild(names);
        article.appendChild(icons);
        article.appendChild(btnContainer);
        section.appendChild(article);

        btns.addEventListener("click", function(e) {
            if (e.target.classList.contains("buy-button")) {
                e.target.textContent = "loading..";
                setTimeout(() => {
                    e.target.textContent = itemArray[i].price + "$";
                }, 1500);
            }
        });
    }
}

renderPackages(packages.filter(item => item.category === "Ranks"));

tabBtns.forEach(btn => {
    btn.addEventListener("click", function() {
        tabBtns.forEach(remove => remove.classList.remove("active"));
        btn.classList.add("active");

        let btncate = btn.dataset.category;
        const filterd = packages.filter(item => item.category === btncate);
        renderPackages(filterd);
    });
});

copyBtn.addEventListener("click", function() {
    navigator.clipboard.writeText(ipNow);
    ip.textContent = "copied!";
    setTimeout(() => {
        ip.textContent = ipNow;
    }, 2000);
});

header.textContent += " v1.0.3";


