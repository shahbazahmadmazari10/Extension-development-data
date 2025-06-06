console.log('content.js called! ');

window.addEventListener('DOMContentLoaded', function() {

window.onload = function(){
    var priceTag = document.querySelector("#mainContent > div.vim.d-vi-evo-region > div.vim.x-price-section.mar-t-20 > div > div > div.x-price-primary > span");
            if(priceTag){
             const price = priceTag.textContent.trim(); 
             let price_s = price.replace(/(US|[^\d.])/g, "");
             let N_price = parseFloat(price_s);
             var I_price = 100+parseInt(N_price);
             price_s = `${I_price}`;
             if((I_price)<150){          
                 console.log("if is loaded");
                 chrome.runtime.sendMessage({type: "green",Price :price_s});
             }
             else{ 
                 console.log("else is loaded");
                 chrome.runtime.sendMessage({type: "red",Price : price_s});
             }
             N_price += 100;
             let div_price =document.querySelector("#mainContent > div.vim.d-vi-evo-region > div.vim.x-price-section.mar-t-20 > div > div > div.x-price-primary")        
          const newPrice = document.createElement("p");
          newPrice.textContent = `US $${N_price}`;
          newPrice.style.color = "green";
          newPrice.style.backgroundColor = "yellow";
          div_price.appendChild(newPrice);
         }   
 }
})

alert("content.js is successfully injucted !");
