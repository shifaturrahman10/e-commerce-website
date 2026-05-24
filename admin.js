if(localStorage.getItem("adminLoggedIn") !== "true"){
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function(){

  let orders = JSON.parse(localStorage.getItem("orders") || "[]");

  let totalOrders = document.getElementById("total-orders");
  let totalRevenue = document.getElementById("total-revenue");
  let productsSold = document.getElementById("products-sold");

  let recentOrdersContainer = document.getElementById("recent-orders-container");

  totalOrders.innerText = orders.length;

  let revenue = 0;
  let sold = 0;

  orders.forEach(order => {

    revenue += order.total;

    order.items.forEach(item => {
      sold += item.qty;
    });

  });

  totalRevenue.innerText = revenue;
  productsSold.innerText = sold;

  // recent orders
  orders.slice().reverse().forEach(order => {

    let div = document.createElement("div");

    div.classList.add("recent-order");

    div.innerHTML = `
      <p><b>${order.customer.name}</b></p>
      <p>$${order.total}</p>
      <hr>
    `;

    recentOrdersContainer.appendChild(div);

  });

});

let logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", function(){

  localStorage.removeItem("adminLoggedIn");

  window.location.href = "login.html";

});