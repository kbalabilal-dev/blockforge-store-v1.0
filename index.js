console.log("index.js is connected");

const section = document.querySelector(".package-grid");
const header = document.querySelector(".tagline");
const copyBtn = document.querySelector("#ip-btn");
const ip = document.querySelector(".IP");
const tabBtns = document.querySelectorAll(".tab-btn");
const modal = document.querySelector("#package-modal");
const closeModalBtn = document.querySelector("#close-modal");
const buyModalBtn = document.querySelector("#modal-buy-btn")
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
        infoBtns.addEventListener("click", function() {
            document.querySelector("#modal-img").src = itemArray[i].icon;
            document.querySelector("#modal-title").textContent = itemArray[i].name;
            document.querySelector("#modal-desc").innerHTML = itemArray[i].description;
            document.querySelector("#modal-buy-btn").textContent = itemArray[i].price + "$";
            
            modal.showModal();
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
closeModalBtn.addEventListener("click", function() {
    modal.close();
});
modal.addEventListener("click", function(e) {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        modal.close();
    }
});

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

buyModalBtn.addEventListener("click",e => {
    const priceModal = buyModalBtn.textContent
    buyModalBtn.textContent = "loading.."
    setTimeout(() => {
        buyModalBtn.textContent = priceModal
    }, 1500);
    
})
copyBtn.addEventListener("click", function() {
    navigator.clipboard.writeText(ipNow);
    ip.textContent = "copied!";
    setTimeout(() => {
        ip.textContent = ipNow;
    }, 2000);
});

header.textContent += " v1.0.4";


