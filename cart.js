let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

let cartContainer = document.getElementById("cart-items");
let totalDisplay = document.getElementById("cart-total");

function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function renderCart(){

  cartContainer.innerHTML = "";

  let total = 0;

  if(cartItems.length === 0){
    cartContainer.innerHTML = "<p>No items in cart</p>";
    totalDisplay.innerText = 0;
    return;
  }

  cartItems.forEach(function(item, index){

    let qty = item.qty || 1;

total += parseInt(item.price) * qty;

    let div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>$${item.price}</p>

      <div class="qty-controls">
        <button onclick="decreaseQty(${index})">-</button>
        <span>${item.qty}</span>
        <button onclick="increaseQty(${index})">+</button>
      </div>

      <button onclick="removeItem(${index})">Remove</button>
    `;

    cartContainer.appendChild(div);

  });

  totalDisplay.innerText = total;

}

function increaseQty(index){
  cartItems[index].qty += 1;
  saveCart();
  renderCart();
}

function decreaseQty(index){
  if(cartItems[index].qty > 1){
    cartItems[index].qty -= 1;
  }else{
    cartItems.splice(index, 1);
  }
  saveCart();
  renderCart();
}

function removeItem(index){
  cartItems.splice(index, 1);
  saveCart();
  renderCart();
}

renderCart();

function clearCart(){
  cartItems = [];
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
}

function checkout(){
  window.location.href = "checkout.html";
   if(cartItems.length === 0){
    alert("Cart is empty!");
    return;
}

  alert("Order placed successfully!");
  cartItems = [];
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
}