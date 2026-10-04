
console.log("index.js is connected");
const packages = [
    { id: 1, name: "VIP", price: 4.99, category: "Ranks",icon: "images/VIP.svg"},
    { id: 2, name: "MVP", price: 11.99, category: "Ranks",icon: "images/MVP.svg" },
    { id: 3, name: "Legend", price: 24.99, category: "Ranks",icon: "images/LEGEND.svg" },
    { id: 4, name: "Elite", price: 29.99, category: 'ranks',icon: "images/ELITE.svg"}
  ];
const section = document.querySelector(".package-grid")
const copyBtn = document.querySelector("#ip-btn")
const ip = document.querySelector(".IP")
let ipNow = ip.textContent
for (let i = 0; i < packages.length;i++){
    let article = document.createElement("article")
    article.classList.add("package-card")
    let names = document.createElement("h2")
    let icons = document.createElement("img")
    icons.src = packages[i].icon
    names.classList.add("package-name")
    names.textContent = packages[i].name
    let prices = document.createElement("p")
    prices.classList.add("package-price")
    prices.textContent = packages[i].price + "$"
    let btns = document.createElement("button")
    btns.classList.add("buy-button")
    btns.textContent = packages[i].price + "$"
    section.appendChild(article)
    article.appendChild(names)
    article.appendChild(icons)
    article.appendChild(btns)
    btns.addEventListener("click",function(e){
        if (e.target.classList.contains("buy-button")) {
            e.target.textContent = "loading..";
            setTimeout(() => {
                e.target.textContent = packages[i].price + "$"
            }, 1500);
          }
    })
}

copyBtn.addEventListener("click",function(){
    navigator.clipboard.writeText(ipNow)
    ip.textContent = "copied!"
})
