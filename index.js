console.log("index.js is connected");
let appdata = null
const section = document.querySelector(".package-grid");
const header = document.querySelector(".tagline");
const copyBtn = document.querySelector("#ip-btn");
const ip = document.querySelector(".IP");
const tabBtns = document.querySelectorAll(".tab-btn");
const modal = document.querySelector("#package-modal");
const closeModalBtn = document.querySelector("#close-modal");
const buyModalBtn = document.querySelector("#modal-buy-btn")
let ipNow = ip.textContent;


async function checkFetch(){
    try{
        const respond = await fetch("./data.json")
        if (respond.ok === true){
            const result =await respond.json()
            console.log(result)
            appdata = result
            renderPackages(appdata.data.filter(item => item.category.name === "Ranks"));
        
        }else{console.log("the respond faild")}
    }catch (error){
        console.log("there's an error",error)
    }
}
checkFetch()

function renderPackages(itemArray) {
    section.innerHTML = "";

    for (let i = 0; i < itemArray.length; i++) {
        let article = document.createElement("article");
        article.classList.add("package-card");

        let names = document.createElement("h2");
        names.classList.add("package-name");
        names.textContent = itemArray[i].name;

        let images = document.createElement("img");
        images.src = itemArray[i].image;

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
        article.appendChild(images);
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
            document.querySelector("#modal-img").src = itemArray[i].image;
            document.querySelector("#modal-title").textContent = itemArray[i].name;
            document.querySelector("#modal-desc").innerHTML = itemArray[i].description;
            document.querySelector("#modal-buy-btn").textContent = itemArray[i].price + "$";
            
            modal.showModal();
            buyModalBtn.textContent = itemArray[i].price + "$"
        });
    }
}


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


tabBtns.forEach(btn => {
    btn.addEventListener("click", function() {
        tabBtns.forEach(remove => remove.classList.remove("active"));
        btn.classList.add("active");

        let btncate = btn.dataset.category;
        const filterd = appdata.data.filter(item => item.category.name === btncate);
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
