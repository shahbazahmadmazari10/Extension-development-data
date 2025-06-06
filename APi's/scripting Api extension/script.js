console.log('Script.js called! ');

window.addEventListener('DOMContentLoaded', function() {

window.onload = function(){
    if (url.includes("https://www.ebay.com/itm/")) {
        const priceEle = document.querySelector("#mainContent > div.vim.d-vi-evo-region > div.vim.x-price-section.mar-t-20 > div > div > div > span");
    if (priceEle) {
        const price = priceEle.textContent.trim(); 
        let priceString = price.replace(/(US|[^\d.])/g, "");
        let newPrice = parseFloat(priceString) + 100;
        const division = document.querySelector("#mainContent > div.vim.d-vi-evo-region > div.vim.x-price-section.mar-t-20 > div > div > div");
        const updatedPrice = document.createElement("p");
        updatedPrice.textContent = `US $${newPrice}`;
        updatedPrice.style.color = "green";
        division.appendChild(updatedPrice);}}
        
}
})
alert("Script.js is successfully injucted !");
