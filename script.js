let buttons = document.querySelectorAll(".product-card button");

let cartCountDisplay = document.getElementById("cart-count");

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount(){
  let totalQty = 0;

  cartItems.forEach(item => {
    totalQty += item.qty;
  });

  cartCountDisplay.innerText = totalQty;
}

updateCartCount();

buttons.forEach(function(button){

  button.addEventListener("click", function(){

    let card = button.parentElement;

    let name = card.querySelector("h3").innerText;

    let priceText = card.querySelector("p").innerText;

    let price = parseInt(priceText.replace("$", ""));

    let existingItem = cartItems.find(item => item.name === name);

    if(existingItem){
      existingItem.qty += 1;
    }else{
      cartItems.push({
  name: name,
  price: Number(price),
  qty: 1
});
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));

    updateCartCount();

    alert("Added to cart!");

  });

});


// Search System

let searchInput = document.getElementById("search-input");

let products = document.querySelectorAll(".product-card");

searchInput.addEventListener("keyup", function(){

  let searchValue = searchInput.value.toLowerCase();

  products.forEach(function(product){

    let productName = product.querySelector("h3").innerText.toLowerCase();

    if(productName.includes(searchValue)){
      product.style.display = "inline-block";

    }else{
      product.style.display = "none";
    }

  });

});

// Dark Mode

let darkBtn = document.getElementById("dark-mode-btn");

darkBtn.addEventListener("click", function(){
  document.body.classList.toggle("dark-mode");

  if(document.body.classList.contains("dark-mode")){
    darkBtn.innerHTML = "☀️";

  }else{
    darkBtn.innerHTML = "🌙";

  }

});

// Mobile Menu

let menuToggle = document.querySelector(".menu-toggle");
let navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function(){
  navLinks.classList.toggle("active");

});

// Product Modal

let productCards = document.querySelectorAll(".product-card");
let modal = document.getElementById("product-modal");
let modalImg = document.getElementById("modal-img");
let modalTitle = document.getElementById("modal-title");
let modalPrice = document.getElementById("modal-price");
let closeBtn = document.querySelector(".close-btn");

productCards.forEach(function(card){

  let image = card.querySelector("img");
  image.addEventListener("click", function(){

    let imgSrc = image.src;
    let title = card.querySelector("h3").innerText;
    let priceText = card.querySelector("p").innerText;

let price = parseInt(priceText.replace("$", ""));

    modal.style.display = "flex";
    modalWishlist.innerHTML = "🤍";
    modalImg.src = imgSrc;
    modalTitle.innerText = title;
    modalPrice.innerText = price;
  });

});

// Close Button

closeBtn.addEventListener("click", function(){
  modal.style.display = "none";

});

// Outside Click Close

window.addEventListener("click", function(e){

  if(e.target === modal){
    modal.style.display = "none";
  }

});


let wishlistButtons = document.querySelectorAll(".wishlist");

wishlistButtons.forEach(function(button){

  button.addEventListener("click", function(e){

    e.stopPropagation(); // prevents modal from opening
    button.classList.toggle("active");

    if(button.classList.contains("active")){
      button.innerHTML = "❤️";

    }else{
      button.innerHTML = "🤍";
    }
  });

});