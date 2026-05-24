document.addEventListener("DOMContentLoaded", function () {

  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  let totalDisplay = document.getElementById("checkout-total");

  let form = document.getElementById("checkout-form");

  // FIX TOTAL CALCULATION
  let total = 0;

  cartItems.forEach(item => {

    let price = Number(item.price) || 0;

    let qty = Number(item.qty) || 1;

    total += price * qty;

  });

  // SHOW TOTAL
  if(totalDisplay){
  totalDisplay.innerText = total;
}

  // PAYMENT UI
  let paymentInputs = document.querySelectorAll("input[name='payment']");

  let mobileBox = document.getElementById("mobile-payment-box");

  paymentInputs.forEach(input => {

    input.addEventListener("change", function(){

      if(this.value === "bkash" || this.value === "nagad"){

        mobileBox.style.display = "block";

      } else {

        mobileBox.style.display = "none";

      }

    });

  });

  // FORM SUBMIT
  form.addEventListener("submit", function(e){

    e.preventDefault();

    let name = form.querySelectorAll("input")[0].value;

    let phone = form.querySelectorAll("input")[1].value;

    let email = form.querySelectorAll("input")[2].value;

    let address = form.querySelector("textarea").value;

    let paymentMethod =
      document.querySelector("input[name='payment']:checked").value;

    let paymentNumber =
      document.querySelector("#mobile-payment-box input").value;

    let order = {

      customer: {
        name,
        phone,
        email,
        address
      },

      payment: {
        method: paymentMethod,
        number: paymentNumber
      },

      items: cartItems,

      total: total,

      date: new Date().toLocaleString()

    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.removeItem("cart");

    alert("Order placed successfully!");

    window.location.href = "success.html";

  });

});