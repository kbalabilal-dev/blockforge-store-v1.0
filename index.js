console.log("index.js is connected");
let selectedPackageId = null;
let currentUsername = localStorage.getItem('mc_username') || null;
let appdata = null
const section = document.querySelector(".package-grid");
const header = document.querySelector(".tagline");
const copyBtn = document.querySelector("#ip-btn");
const ip = document.querySelector(".IP");
const tabBtns = document.querySelectorAll(".tab-btn");
const loginModal = document.querySelector("#login-modal")
const closeLoginBtn = document.querySelector("#close-login")
const modal = document.querySelector("#package-modal");
const closeModalBtn = document.querySelector("#close-modal");
const buyModalBtn = document.querySelector("#modal-buy-btn")
const loginForm = document.querySelector("#login-form");
const usernameInput = document.querySelector("#username-input");
const loginContent = document.querySelector(".login-modal-content")
const loginError = document.createElement("p")
loginError.classList.add("login-erorr")
loginContent.appendChild(loginError)


if (currentUsername) {
    usernameInput.value = currentUsername;
}
let ipNow = ip.textContent;




async function checkFetch(){
    try{
        const respond = await fetch("https://headless.tebex.io/api/accounts/14s8d-f1ca42c72668b958cc37af87a9340635307e4cf6/packages")
        if (respond.ok === true){
            const result =await respond.json()
            appdata = result
            for (let i = 0;i < imagesrc.length; i++){
                appdata.data[i].image = imagesrc[i]
            }
            console.log(appdata)
            renderPackages(appdata.data.filter(item => item.category.name === "Ranks"));
        
        }else{
            section.innerHTML = "<p class='error-msg'>Failed to load packages. Please try again later.</p>";
        }
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
        console.log(itemArray[i].image)

        let btnContainer = document.createElement("div")
        btnContainer.classList.add("card-actions")

        let infoBtns = document.createElement("button")
        infoBtns.classList.add("info-button")
        infoBtns.textContent = "i"

        let buyBtn = document.createElement("button");
        buyBtn.classList.add("buy-button");
        buyBtn.textContent = itemArray[i].base_price + "$";

        btnContainer.appendChild(infoBtns)
        btnContainer.appendChild(buyBtn)

        article.appendChild(names);
        article.appendChild(images);
        article.appendChild(btnContainer);
        section.appendChild(article);

        buyBtn.addEventListener("click", function(e) {
            if (e.target.classList.contains("buy-button")) {
                openLogin()
                selectedPackageId = itemArray[i].id
                e.target.textContent = "loading..";
                setTimeout(() => {
                    e.target.textContent = itemArray[i].base_price + "$";
                }, 1500);
            }
        });
        infoBtns.addEventListener("click", function() {
            selectedPackageId = itemArray[i].id;
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
closeLoginBtn.addEventListener("click",() => {
    loginModal.close()
    loginError.textContent = ""
    loginError.classList.remove("show");
})

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

loginModal.addEventListener("click", function(e) {
    const dialogDimensions = loginModal.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        loginModal.close();
        loginError.textContent = ""
        loginError.classList.remove("show");
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
    openLogin()

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
loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const enteredUsername = usernameInput.value.trim();
    const mcRegex = /^[a-zA-Z0-9_]{3,16}$/;
    
    if (!mcRegex.test(enteredUsername)) {
        loginError.textContent = "Please enter a valid username";
        
        loginError.classList.remove("show");
        
        void loginError.offsetWidth;
        
        loginError.classList.add("show");
        return;
    }

    currentUsername = enteredUsername;
    localStorage.setItem("mc_username", currentUsername);
    
    loginError.classList.remove("show"); 
    loginModal.close();

    console.log(`Basket Payload -> Username: ${currentUsername} | Package ID: ${selectedPackageId}`);
});

function openLogin() {
    loginModal.close()
    modal.close();
    loginModal.showModal()

    
}

header.textContent += " v1.1.0";